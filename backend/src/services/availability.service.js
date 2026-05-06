import prisma from '../lib/prisma.js';

const START_HOUR = 9;
const END_HOUR = 18;
const SLOT_MINUTES = 30;

function generateSlots(date) {
    const slots = [];

    const start = new Date(date);
    start.setHours(START_HOUR, 0, 0, 0);

    const end = new Date(date);
    end.setHours(END_HOUR, 0, 0, 0);

    while (start < end) {
        slots.push(new Date(start));
        start.setMinutes(start.getMinutes() + SLOT_MINUTES);
    }

    return slots;
}

function overlaps(slotStart, slotEnd, appointmentStart, appointmentEnd) {
    return slotStart < appointmentEnd && slotEnd > appointmentStart;
}

export async function getBarberAvailability(barberId, date) {
    const targetDate = new Date(date);

    if (Number.isNaN(targetDate.getTime())) {
        throw new Error('Fecha inválida');
    }

    // inicio y fin del día
    const dayStart = new Date(targetDate);
    dayStart.setHours(0, 0, 0, 0);

    const dayEnd = new Date(targetDate);
    dayEnd.setHours(23, 59, 59, 999);

    // traer citas del barbero
    const appointments = await prisma.appointment.findMany({
        where: {
            barberId,
            status: {
                in: ['PENDING', 'CONFIRMED'],
            },
            date: {
                gte: dayStart,
                lte: dayEnd,
            },
        },
        select: {
            date: true,
            service: {
                select: {
                    duration: true,
                },
            },
        },
    });

    // generar slots base
    const slots = generateSlots(targetDate);

    const availableSlots = slots.filter((slot) => {
        const slotStart = slot;
        const slotEnd = new Date(slot.getTime() + SLOT_MINUTES * 60000);

        const isBlocked = appointments.some((a) => {
            const appointmentStart = new Date(a.date);
            const appointmentEnd = new Date(
                appointmentStart.getTime() + a.service.duration * 60000
            );

            return overlaps(slotStart, slotEnd, appointmentStart, appointmentEnd);
        });

        return !isBlocked;
    });

    return availableSlots.map((d) => {
        return d.toLocaleTimeString('es-CO', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false,
        });
    });
}