import { useQuery } from "@tanstack/react-query";
import {
  BranchesApi,
  CitiesFilterApi,
  StateFilterApi,
} from "@/api/branches";

export const useStates = () => {
  return useQuery({
    queryKey: ["states"],
    queryFn: StateFilterApi,
    staleTime: 5 * 60 * 1000,
    select: (data) => {
      const states = data?.data || [];
      return states.map((state) => ({
        id: state.id,
        state: state.state,
        cities: state.cities || [],
      }));
    },
  });
};

export const useCities = (state) => {
  return useQuery({
    queryKey: ["cities", state],
    queryFn: () => CitiesFilterApi(state),
    staleTime: 5 * 60 * 1000,
    enabled: !!state,
    select: (data) => data?.data || [],
  });
};

export const useBranches = (filters = {}) => {
  return useQuery({
    queryKey: ["branches", filters],
    queryFn: () => BranchesApi(filters),
    staleTime: 60 * 1000,
    select: (data) => data?.data || [],
  });
};
