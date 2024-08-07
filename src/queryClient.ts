import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, // usually set to true in production
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});
