import { useMutation } from '@tanstack/react-query';

import { TokenClient } from '../config/api.config';

export function useDeleteToken() {
  return useMutation({
    mutationFn: async (id: string) => {
      const response = await TokenClient.tokenControllerDeleteToken(id);
      return response.data;
    },
  });
}
