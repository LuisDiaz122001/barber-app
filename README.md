# Barber SaaS Appointment Manager

Una aplicación SaaS para barberías que gestiona barberos, servicios, citas y disponibilidad de horarios.

## Descripción

Este proyecto ofrece una API backend y una interfaz frontend separadas para administrar citas de barberías. Está diseñado para dueños de barberías y administradores que necesitan:

- gestionar barberos y servicios
- permitir a clientes reservar citas
- evitar horarios solapados entre citas
- consultar disponibilidad de horarios libres

## Tecnologías

- Backend: Node.js, Express, Prisma, PostgreSQL
- Frontend: Vue 3, Vite
- Autenticación: JWT
- CORS habilitado para frontend en `localhost:5173`

## Estructura del proyecto

- `/backend` - API y lógica del servidor
- `/frontend` - aplicación cliente Vue

## Instalación

1. Clonar el repositorio:

```bash
git clone <URL_DEL_REPO>
cd barber-app
```

2. Instalar dependencias del backend:

```bash
cd backend
npm install
```

3. Instalar dependencias del frontend:

```bash
cd ../frontend
npm install
```

4. Configurar variables de entorno:

- `/backend/.env` con la URL de la base de datos PostgreSQL
- `/frontend/.env` con `VITE_API_URL=http://localhost:3000`

## Ejecución

### Backend

```bash
cd backend
npm run dev
```

El backend quedará escuchando en `http://localhost:3000`.

### Frontend

```bash
cd frontend
npm run dev
```

El frontend se ejecutará en `http://localhost:5173`.

## Endpoints principales

- `POST /auth/register` - registrar usuario
- `POST /auth/login` - iniciar sesión
- `GET /auth/profile` - perfil del usuario autenticado
- `GET /barbers` - listar barberos
- `GET /barbers/:id/availability` - obtener disponibilidad del barbero
- `GET /services` - listar servicios
- `POST /appointments` - crear una cita
- `GET /appointments` - listar citas

## Ejemplo de uso

### Crear una cita

```http
POST /appointments
Content-Type: application/json
Authorization: Bearer <TOKEN>

{
  "barberId": 1,
  "serviceId": 2,
  "date": "2026-05-10T15:00:00.000Z"
}
```

### Respuesta exitosa

```json
{
  "id": 10,
  "date": "2026-05-10T15:00:00.000Z",
  "clientId": 5,
  "barberId": 1,
  "serviceId": 2,
  "status": "PENDING"
}
```

### Consultar disponibilidad

```http
GET /barbers/1/availability
```

### Respuesta de disponibilidad

```json
[
  "2026-05-10T14:00:00.000Z",
  "2026-05-10T16:00:00.000Z"
]
```

## Estado del proyecto

- En desarrollo
- Backend funcional con validación de solapamiento de citas
- Frontend básico configurado para consumir la API

## Próximas mejoras

- agregar interfaz de usuario completa para reservas y autenticación
- mejorar manejo de errores y validaciones en frontend
- agregar tests automáticos para backend y frontend
- desplegar a producción con contenedores o servicios cloud
