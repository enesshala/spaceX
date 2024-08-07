import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { Rocket } from "../interfaces/rocket"; // Your Rocket interface

const fetchRocket = async (id: string): Promise<Rocket> => {
  const response = await fetch(`https://api.spacexdata.com/v4/rockets/${id}`);
  if (!response.ok) {
    throw new Error("Failed to fetch rocket details: " + response.statusText);
  }
  return response.json();
};

export const useRocket = (id: string): UseQueryResult<Rocket, Error> => {
  return useQuery<Rocket, Error>({
    queryKey: ["rocket", id],
    queryFn: () => fetchRocket(id),
  });
};
