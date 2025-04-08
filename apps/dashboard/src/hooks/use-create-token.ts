import { CreateTokenDto } from '@kir-mail/api-generated';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { TokenClient } from '../config/api.config';

export function useCreateToken() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreateTokenDto) => {
      const response = await TokenClient.tokenControllerCreateToken(data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tokens'] });
    },
  });
}
