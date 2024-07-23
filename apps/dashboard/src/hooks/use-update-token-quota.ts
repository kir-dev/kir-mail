import { useMutation } from '@tanstack/react-query';

import { TokenClient } from '../config/api.config';

export function useUpdateTokenQuota(id: string) {
  return useMutation({
    mutationFn: async (quota: number) => {
      const response = await TokenClient.tokenControllerUpdateTokenQuota(id, { quota });
      return response.data;
    },
  });
}
