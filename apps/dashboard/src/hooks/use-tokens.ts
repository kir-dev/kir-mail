import { useQuery } from '@tanstack/react-query';

import { TokenClient } from '../config/api.config';

export function useTokens() {
  return useQuery({
    queryKey: ['tokens'],
    queryFn: async () => {
      const response = await TokenClient.tokenControllerGetTokens();
      return response.data;
    },
  });
}
