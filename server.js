import express from 'express';
import cors from 'cors';

import authRoutes from './src/routes/auth.routes.js';
import barbershopRoutes from './src/routes/barbershop.routes.js';
import serviceRoutes from './src/routes/service.routes.js';
import barberRoutes from './src/routes/barber.routes.js';
import appointmentRoutes from './src/routes/appointment.routes.js';
import availabilityRoutes from './routes/availability.routes.js';

const app = express();

app.use(cors());
app.use(express.json());

// RUTAS
app.use('/auth', authRoutes);
app.use('/barbershops', barbershopRoutes);
app.use('/services', serviceRoutes);
app.use('/barbers', barberRoutes);
app.use('/appointments', appointmentRoutes);
app.use('/availability', availabilityRoutes);

// SERVER
app.listen(3000, () => {
    console.log('Servidor corriendo en http://localhost:3000');
});