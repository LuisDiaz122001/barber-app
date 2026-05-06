import prisma from '../lib/prisma.js';

const APPOINTMENT_STATUS_ACTIVE = ['PENDING', 'CONFIRMED'];

export async function createAppointment(userId, data) {
    const start = new Date(data.date);

    if (Number.isNaN(start.getTime())) {
        throw new Error('Fecha de cita inválida');
    }

    const barberId = Number(data.barberId);
    const serviceId = Number(data.serviceId);

    if (!Number.isInteger(barberId) || barberId <= 0) {
        throw new Error('Barbero inválido');
    }

    if (!Number.isInteger(serviceId) || serviceId <= 0) {
        throw new Error('Servicio inválido');
    }

    return await prisma.$transaction(async (tx) => {
        await tx.$executeRaw`
            SELECT pg_advisory_xact_lock(${barberId})
        `;

        const service = await tx.service.findUnique({
            where: { id: serviceId },
            select: { duration: true },
        });

        if (!service) {
            throw new Error('Servicio no existe');
        }

        const durationMinutes = Number(service.duration);

        if (!Number.isFinite(durationMinutes) || durationMinutes <= 0) {
            throw new Error('Duración inválida');
        }

        const end = new Date(start.getTime() + durationMinutes * 60000);

        // 🔥 FIX CLAVE: traer SOLO datos necesarios (no depender de relations rotas)
        const existingAppointments = await tx.appointment.findMany({
            where: {
                barberId,
                status: { in: APPOINTMENT_STATUS_ACTIVE },
            },
            select: {
                date: true,
                serviceId: true,
            },
        });

        // 🔥 FIX CLAVE 2: resolver duración de forma segura
        const servicesMap = await tx.service.findMany({
            where: {
                id: {
                    in: existingAppointments.map(a => a.serviceId),
                },
            },
            select: {
                id: true,
                duration: true,
            },
        });

        const durationById = new Map(
            servicesMap.map(s => [s.id, Number(s.duration)])
        );

        const hasConflict = existingAppointments.some((appointment) => {
            const existingStart = new Date(appointment.date);
            const existingDuration = durationById.get(appointment.serviceId);

            if (!Number.isFinite(existingDuration)) {
                throw new Error('Duración inválida en cita existente');
            }

            const existingEnd = new Date(
                existingStart.getTime() + existingDuration * 60000
            );

            return start < existingEnd && end > existingStart;
        });

        if (hasConflict) {
            throw new Error('El barbero ya tiene una cita en ese horario');
        }

        return tx.appointment.create({
            data: {
                date: start,
                clientId: userId,
                barberId,
                serviceId,
                status: 'PENDING',
            },
        });
    });
}