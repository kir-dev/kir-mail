import { AuthApi } from '@kir-mail/api-generated';
import { useQuery } from '@tanstack/react-query';

import { authenticatedAxios } from '../config/axios.config';

const authApi = new AuthApi(undefined, '', authenticatedAxios);

export function useMe() {
  return useQuery({
    queryKey: ['me'],
    queryFn: async () => {
      const response = await authApi.authControllerMe();
      return response.data;
    },
  });
}
