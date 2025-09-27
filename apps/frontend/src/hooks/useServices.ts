// src/hooks/useServices.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { serviceApi, Service } from "@/lib/api";

export const useServices = () => {
  return useQuery({
    queryKey: ["services"],
    queryFn: serviceApi.getAll,
  });
};

export const useCreateService = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: serviceApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["services"] });
    },
  });
};
