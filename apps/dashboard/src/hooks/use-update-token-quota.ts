import { TokenDto } from '@kir-mail/api-generated';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { TokenClient } from '../config/api.config';

export function useUpdateTokenQuota() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: { id: string; quota: number }) => {
      const response = await TokenClient.tokenControllerUpdateTokenQuota(data.id, { quota: data.quota });
      return response.data;
    },
    onMutate: async (data) => {
      await queryClient.cancelQueries({ queryKey: ['tokens'] });
      const previousTokens = queryClient.getQueryData<TokenDto[]>(['tokens']);
      queryClient.setQueryData(['tokens'], (old: TokenDto[]) =>
        old.map((token) => (token.id === data.id ? { ...token, quota: data.quota } : token))
      );
      return { previousTokens };
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['tokens'] }),
    onError: (error, data, context) => {
      queryClient.setQueryData(['tokens'], context?.previousTokens);
      toast.error('Failed to update quota');
    },
  });
}
