import { CreateTokenDto } from '@kir-mail/api-generated';
import { useMutation } from '@tanstack/react-query';

import { TokenClient } from '../config/api.config';

export function useCreateToken() {
  return useMutation({
    mutationFn: async (data: CreateTokenDto) => {
      const response = await TokenClient.tokenControllerCreateToken(data);
      return response.data;
    },
  });
}
