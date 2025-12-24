// src/query/useQuery.js
import { useQuery } from "@tanstack/react-query";
import { handleLayoutApi } from "@/api/layout";
import { handleBlogsApi } from "@/api/blogs";
import { 
  BranchesApi, 
  CitiesFilterApi, 
  StateFilterApi,
  LocalitiesFilterApi,
  BranchTypesApi 
} from "@/api/branches";
import { SolutionAPi } from "@/api/solutions";
import { CategoriesApi } from "@/api/categories";

// ✅ Get all states with their cities
export const useStates = () => {
  return useQuery({
    queryKey: ["states"],
    queryFn: StateFilterApi,
    staleTime: 5 * 60 * 1000, // 5 minutes
    select: (data) => {
      const states = data?.data || [];
      return states.map(state => ({
        id: state.id,
        state: state.state,
        cities: state.cities || []
      }));
    }
  });
};

// ✅ Get cities for a specific state
export const useCities = (state) => {
  return useQuery({
    queryKey: ["cities", state],
    queryFn: () => CitiesFilterApi(state),
    staleTime: 5 * 60 * 1000,
    enabled: !!state,
    select: (data) => data?.data || []
  });
};

// ✅ Get localities for a specific city
export const useLocalities = (city) => {
  return useQuery({
    queryKey: ["localities", city],
    queryFn: () => LocalitiesFilterApi(city),
    staleTime: 5 * 60 * 1000,
    enabled: !!city,
    select: (data) => data?.data || []
  });
};

// ✅ Get all branch types
export const useBranchTypes = () => {
  return useQuery({
    queryKey: ["branchTypes"],
    queryFn: BranchTypesApi,
    staleTime: 5 * 60 * 1000,
    select: (data) => data?.data || []
  });
};

// ✅ Get branches with filters
export const useBranches = (filters = {}) => {
  return useQuery({
    queryKey: ["branches", filters],
    queryFn: () => BranchesApi(filters),
    staleTime: 60 * 1000, // 1 minute
    select: (data) => data?.data || []
  });
};

// ✅ Get layout data
export const useLayoutData = () => {
  return useQuery({
    queryKey: ["LayoutData"],
    queryFn: handleLayoutApi,
    staleTime: 60 * 1000,
  });
};
export const useBlogsData = () => {
  return useQuery({
    queryKey: ["BlogsData"],
    queryFn: handleBlogsApi,
    staleTime: 60 * 1000,
  });
};

// ✅ Get solutions with optional type filter
export const useSolution = (type = null) => {
  return useQuery({
    queryKey: ["solutiondata", type],
    queryFn: () => SolutionAPi(type),
    staleTime: 60 * 1000,
    select: (data) => data?.data || []
  });
};

// ✅ Get categories with optional type filter
export const useCategories = (type = null) => {
  return useQuery({
    queryKey: ["categoriesdata", type],
    queryFn: () => CategoriesApi(type),
    staleTime: 60 * 1000,
    select: (data) => data?.data || []
  });
};