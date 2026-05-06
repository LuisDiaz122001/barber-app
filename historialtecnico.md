# Historial Técnico

## [2026-05-06 09:15] - Registro inicial del historial técnico

### Qué se hizo
Se creó la bitácora técnica estructurada para documentar fases, problemas y soluciones del proyecto.

### Problema
No existía un registro histórico con fecha y hora preciso para referencia futura.

### Solución
Se definió un formato de entradas cronológicas con timestamp y se creó este archivo `historialtecnico.md`.

### Aprendizaje
Tener documentación técnica actualizada evita repetir diagnósticos y facilita la transferencia de contexto.

---

## [2026-05-06 09:14] - Implementación del sistema de disponibilidad

### Qué se hizo
Se definió el endpoint `GET /barbers/:id/availability` y se implementó la lógica para calcular horarios libres.

### Problema
Era necesario devolver espacios de tiempo libres para un barbero sin solapar con citas existentes.

### Solución
Se consultaron citas activas del barbero y se calculó la disponibilidad con base en los intervalos existentes.

### Aprendizaje
La disponibilidad es una consulta dependiente de datos existentes y debe aplicarse sobre el mismo marco temporal para evitar inconsistencias.

---

## [2026-05-06 09:13] - Separación de backend y frontend

### Qué se hizo
Se reorganizó el proyecto en carpetas separadas `/backend` y `/frontend`, con sus propios `package.json`.

### Problema
El código estaba mezclado en una única estructura y las rutas/imports fallaban tras la reorganización.

### Solución
Se movió todo el backend a `/backend`, se creó un frontend Vue + Vite en `/frontend`, y se corrigieron imports relativos en `backend/server.js` y rutas de backend.

### Aprendizaje
La separación de capas mejora el manejo de dependencias y obliga a mantener rutas e imports claros.

---

## [2026-05-06 09:12] - Implementación de validación de traslapes

### Qué se hizo
Se reforzó `createAppointment` para comparar rangos completos de tiempos y evitar traslapes entre citas.

### Problema
La validación inicial no distinguía correctamente intervalos solapados y permitía doble booking.

### Solución
Se aplicó la condición `start < existingEnd && end > existingStart` usando `service.duration` para calcular `existingEnd`.

### Aprendizaje
Las validaciones de solapamiento deben basarse en intervalos completos, no solo en puntos de inicio.

---

## [2026-05-06 09:11] - Problema de citas solapadas

### Qué se hizo
Se diagnosticó el bug que permitía crear más de una cita en el mismo rango horario.

### Problema
Aunque la lógica parecía correcta, citas con `date` muy cercanas se permitían debido a datos o condiciones concurrentes.

### Solución
Se identificó el error en la lógica de datos y se preparó una corrección robusta con validaciones adicionales y transacción.

### Aprendizaje
Los bugs de solapamiento pueden deberse tanto a la lógica como a condiciones de carrera en el acceso concurrente a la base de datos.

---

## [2026-05-06 09:10] - Implementación de createAppointment

### Qué se hizo
Se desarrolló la función `createAppointment` en `backend/src/appointment/appointment.service.js`.

### Problema
Era necesario crear citas y validar que no se interfieran con otras reservas del mismo barbero.

### Solución
Se implementó cálculo de `start` y `end` usando la duración del servicio y se compararon los intervalos con citas existentes.

### Aprendizaje
Construir la lógica de reservas desde el comienzo con intervalos completos evita errores en etapas posteriores.

---

## [2026-05-06 09:09] - Creación del backend y configuración de Prisma

### Qué se hizo
Se levantó la API con Node.js, Express y Prisma; se modelaron `Appointment`, `Barber`, `Service` y entidades relacionadas.

### Problema
El proyecto carecía de una base sólida para manejar datos y relaciones de citas y servicios.

### Solución
Se configuró Prisma con PostgreSQL, se definieron los modelos y se creó el cliente Prisma en `backend/src/lib/prisma.js`.

### Aprendizaje
Contar con un esquema bien definido en Prisma desde el inicio facilita el desarrollo de la API y el control de datos.

---

## Errores comunes ya resueltos

- imports sin extensión `.js` en backend con `type: module`
- rutas mal configuradas tras reorganizar en `/backend/src`
- carpetas mal nombradas (`service` vs `services`)
- endpoints no registrados en `server.js`
- validación de solapamiento que solo comparaba fecha de inicio
- transacciones sin protección contra race conditions en reservas concurrentes
- CORS demasiado amplio y sin configuración de origen específico

---

## Estado actual

- Backend separado en `/backend` con Express y Prisma.
- Frontend separado en `/frontend` con Vue + Vite.
- JWT implementado para autenticación.
- Gestión de barberos, servicios y citas.
- Validación de solapamiento robusta en `createAppointment`.
- Endpoint de disponibilidad definido.

---

## Próximos pasos

- Agregar testing automático para backend y frontend.
- Documentar API con OpenAPI/Swagger.
- Mejorar la UI de frontend para reserva y administración.
- Normalizar zonas horarias en la API y el frontend.
- Añadir validación de esquema compartida entre backend y frontend.
