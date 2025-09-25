# Charlie's Detailing

A simple car detailing booking app built with **NestJS** and **PostgreSQL**, allowing customers to create accounts, register their cars, view services, and book detailing appointments.

---

## Table of Contents

- [Features](#features)
- [Technologies](#technologies)
- [Installation](#installation)
- [Database Setup](#database-setup)
- [Running the App](#running-the-app)
- [API Endpoints](#api-endpoints)
- [Folder Structure](#folder-structure)
- [License](#license)

---

## Features

- User registration and management (admin & customers)
- Register multiple cars with categories (Saloon, Midsize, SUV, Lorry, Van)
- View available detailing services
- Book appointments for specific cars and services
- Manage booking status (pending, confirmed, completed, cancelled)

---

## Technologies

- [NestJS](https://nestjs.com/) – backend framework
- [TypeORM](https://typeorm.io/) – ORM for database interaction
- [PostgreSQL](https://www.postgresql.org/) – relational database
- [Node.js](https://nodejs.org/) – runtime environment

---

## Installation

1. Clone the repository:

```bash
git clone <your-repo-url>
cd charlies-detailing
```

2. Install dependencies:

```bash
npm install
```

---

## Database Setup

1. Create a PostgreSQL database:

```sql
CREATE DATABASE charlies_detailing;
```

2. Configure your `.env` (optional) or `app.module.ts` with DB credentials:

```ts
host: 'localhost';
port: 5432;
username: 'frank_dev';
password: 'francodosha';
database: 'charlies_detailing';
```

3. Ensure your `TypeOrmModule` has:

```ts
synchronize: true;
```

> This will automatically create tables for Users, Cars, Services, and Bookings.

---

## Running the App

```bash
npm run start
```

The server will run at `http://localhost:3000/` by default.

---

## API Endpoints

### Users

- `POST /users` – create a new user
- `GET /users` – list all users
- `GET /users/:id` – get a user by ID
- `PUT /users/:id` – update user
- `DELETE /users/:id` – delete user

### Cars

- `POST /cars` – register a new car for a user
- `GET /cars` – list all cars
- `GET /cars/:id` – get car details
- `PUT /cars/:id` – update car
- `DELETE /cars/:id` – delete car

### Services

- `POST /services` – create a detailing service
- `GET /services` – list all services

### Bookings

- `POST /bookings` – create a new booking
- `GET /bookings` – list all bookings
- `PUT /bookings/:id` – update booking status
- `DELETE /bookings/:id` – cancel a booking

---

## Folder Structure

```
src/
├── app.module.ts
├── user/
│   ├── user.controller.ts
│   ├── user.module.ts
│   ├── user.service.ts
│   └── user.entity.ts
├── car/
│   ├── car.controller.ts
│   ├── car.module.ts
│   ├── car.service.ts
│   └── car.entity.ts
├── service/
│   ├── service.controller.ts
│   ├── service.module.ts
│   ├── service.service.ts
│   └── service.entity.ts
├── booking/
│   ├── booking.controller.ts
│   ├── booking.module.ts
│   ├── booking.service.ts
│   └── booking.entity.ts
```

---

## License

This project is licensed under the MIT License.
