import prisma from '../lib/prisma.js';

export async function createBarbershop(userId, data) {
    const barbershop = await prisma.barbershop.create({
        data: {
            name: data.name,
            ownerId: userId,
        },
    });

    return barbershop;
}