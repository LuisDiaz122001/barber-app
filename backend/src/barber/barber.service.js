import prisma from '../lib/prisma.js';
import bcrypt from 'bcrypt';

export async function createBarber(ownerId, data) {
    // 1. verificar barbería del admin
    const barbershop = await prisma.barbershop.findUnique({
        where: {
            ownerId
        },
    });

    if (!barbershop) {
        throw new Error('No tienes barbería');
    }

    // 2. crear usuario barbero
    const hashedPassword = await bcrypt.hash(data.password, 10);

    const user = await prisma.user.create({
        data: {
            name: data.name,
            email: data.email,
            password: hashedPassword,
            role: 'BARBER',
        },
    });

    // 3. crear barber
    const barber = await prisma.barber.create({
        data: {
            userId: user.id,
            barbershopId: barbershop.id,
        },
    });

    return {
        user,
        barber
    };
}