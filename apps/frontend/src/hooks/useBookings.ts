// src/hooks/useBookings.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { bookingApi, Booking } from "@/lib/api";

export const useBookings = () => {
  return useQuery({
    queryKey: ["bookings"],
    queryFn: bookingApi.getAll,
  });
};

export const useCreateBooking = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: bookingApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
    },
  });
};
