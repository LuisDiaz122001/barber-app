import { getBarberAvailability } from '../services/availability.service.js';

export async function availabilityController(req, res) {
    try {
        const barberId = Number(req.params.id);
        const { date } = req.query;

        const slots = await getBarberAvailability(barberId, date);

        res.json(slots);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}