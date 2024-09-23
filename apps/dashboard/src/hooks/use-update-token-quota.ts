import { useMutation, useQueryClient } from '@tanstack/react-query';

import { TokenClient } from '../config/api.config';

export function useUpdateTokenQuota(id: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (quota: number) => {
      const response = await TokenClient.tokenControllerUpdateTokenQuota(id, { quota });
      return response.data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['tokens'] }),
  });
}
