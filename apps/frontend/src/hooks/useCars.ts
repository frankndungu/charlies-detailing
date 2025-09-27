// src/hooks/useCars.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { carApi, Car } from "@/lib/api";

export const useCars = () => {
  return useQuery({
    queryKey: ["cars"],
    queryFn: carApi.getAll,
  });
};

export const useCar = (id: number) => {
  return useQuery({
    queryKey: ["cars", id],
    queryFn: () => carApi.getById(id),
    enabled: !!id,
  });
};

export const useCreateCar = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: carApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cars"] });
    },
  });
};
