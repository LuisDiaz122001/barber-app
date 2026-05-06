import prisma from '../lib/prisma.js';

export async function createService(userId, data) {
    // Buscar barbería del usuario
    const barbershop = await prisma.barbershop.findUnique({
        where: {
            ownerId: userId
        },
    });

    if (!barbershop) {
        throw new Error('No tienes barbería');
    }

    const service = await prisma.service.create({
        data: {
            name: data.name,
            price: data.price,
            duration: data.duration,
            barbershopId: barbershop.id,
        },
    });

    return service;
}