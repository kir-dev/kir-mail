import { useMutation, useQueryClient } from '@tanstack/react-query';

import { TokenClient } from '../config/api.config';

export function useDeleteToken() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const response = await TokenClient.tokenControllerDeleteToken(id);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tokens'] });
    },
  });
}
