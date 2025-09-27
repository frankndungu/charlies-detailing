// src/lib/api.ts
import axios from "axios";

// Create axios instance
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
  },
});

// Types
export interface User {
  id: number;
  name: string;
  email: string;
  role: "admin" | "customer";
  created_at: string;
  updated_at: string;
}

export interface Car {
  id: number;
  make: string;
  model: string;
  year: number;
  license_plate: string;
  category: "Saloon" | "Midsize" | "SUV" | "Lorry" | "Van";
  user: User;
  created_at: string;
  updated_at: string;
}

export interface Service {
  id: number;
  name: string;
  description: string;
  price: number;
  duration: number;
  created_at: string;
  updated_at: string;
}

export interface Booking {
  id: number;
  user: User;
  car: Car;
  service: Service;
  booking_time: string;
  status: "pending" | "confirmed" | "completed" | "cancelled";
  created_at: string;
  updated_at: string;
}

// API Response types
interface ApiResponse<T> {
  message: string;
  data?: T;
}

interface UsersResponse {
  message: string;
  users?: User[];
}

interface CarsResponse {
  message: string;
  cars: Car[];
}

interface ServicesResponse {
  message: string;
  services: Service[];
}

interface BookingsResponse {
  message: string;
  bookings: Booking[];
}

// User API
export const userApi = {
  // Get all users
  getAll: async (): Promise<User[]> => {
    const response = await api.get<User[]>("/users");
    return response.data;
  },

  // Get user by ID
  getById: async (id: number): Promise<User> => {
    const response = await api.get<User>(`/users/${id}`);
    return response.data;
  },

  // Create user
  create: async (userData: {
    name: string;
    email: string;
    password: string;
    role?: "admin" | "customer";
  }): Promise<User> => {
    const response = await api.post<User>("/users", userData);
    return response.data;
  },

  // Update user
  update: async (id: number, userData: Partial<User>): Promise<User> => {
    const response = await api.put<User>(`/users/${id}`, userData);
    return response.data;
  },

  // Delete user
  delete: async (id: number): Promise<void> => {
    await api.delete(`/users/${id}`);
  },
};

// Car API
export const carApi = {
  getAll: async (): Promise<Car[]> => {
    const response = await api.get<CarsResponse>("/cars");
    return response.data.cars;
  },

  getById: async (id: number): Promise<Car> => {
    const response = await api.get<{ message: string; car: Car }>(
      `/cars/${id}`
    );
    return response.data.car;
  },

  create: async (carData: {
    userId: number;
    make: string;
    model: string;
    year: number;
    license_plate: string;
    category: string;
  }): Promise<Car> => {
    const response = await api.post<{ message: string; car: Car }>(
      "/cars",
      carData
    );
    return response.data.car;
  },

  update: async (id: number, carData: Partial<Car>): Promise<Car> => {
    const response = await api.put<{ message: string; car: Car }>(
      `/cars/${id}`,
      carData
    );
    return response.data.car;
  },

  delete: async (id: number): Promise<void> => {
    await api.delete(`/cars/${id}`);
  },
};

// Service API
export const serviceApi = {
  getAll: async (): Promise<Service[]> => {
    const response = await api.get<ServicesResponse>("/services");
    return response.data.services;
  },

  getById: async (id: number): Promise<Service> => {
    const response = await api.get<{ message: string; service: Service }>(
      `/services/${id}`
    );
    return response.data.service;
  },

  create: async (serviceData: {
    name: string;
    description?: string;
    price: number;
    duration: number;
  }): Promise<Service> => {
    const response = await api.post<{ message: string; service: Service }>(
      "/services",
      serviceData
    );
    return response.data.service;
  },

  update: async (
    id: number,
    serviceData: Partial<Service>
  ): Promise<Service> => {
    const response = await api.put<{ message: string; service: Service }>(
      `/services/${id}`,
      serviceData
    );
    return response.data.service;
  },

  delete: async (id: number): Promise<void> => {
    await api.delete(`/services/${id}`);
  },
};

// Booking API
export const bookingApi = {
  getAll: async (): Promise<Booking[]> => {
    const response = await api.get<BookingsResponse>("/bookings");
    return response.data.bookings;
  },

  getById: async (id: number): Promise<Booking> => {
    const response = await api.get<{ message: string; booking: Booking }>(
      `/bookings/${id}`
    );
    return response.data.booking;
  },

  create: async (bookingData: {
    userId: number;
    carId: number;
    serviceId: number;
    booking_time: string;
    status?: string;
  }): Promise<Booking> => {
    const response = await api.post<{ message: string; booking: Booking }>(
      "/bookings",
      bookingData
    );
    return response.data.booking;
  },

  update: async (
    id: number,
    bookingData: Partial<{
      userId: number;
      carId: number;
      serviceId: number;
      booking_time: string;
      status: string;
    }>
  ): Promise<Booking> => {
    const response = await api.put<{ message: string; booking: Booking }>(
      `/bookings/${id}`,
      bookingData
    );
    return response.data.booking;
  },

  delete: async (id: number): Promise<void> => {
    await api.delete(`/bookings/${id}`);
  },
};

export default api;
