import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { Rocket } from "../interfaces/rocket";

const fetchRockets = async (): Promise<Rocket[]> => {
  const response = await fetch("https://api.spacexdata.com/v4/rockets");
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

export const useRockets = (): UseQueryResult<Rocket[], Error> => {
  return useQuery<Rocket[], Error>({
    queryKey: ["rockets"],
    queryFn: fetchRockets,
  });
};

// queryKey: ['rockets'],
// queryFn: fetchRockets,
