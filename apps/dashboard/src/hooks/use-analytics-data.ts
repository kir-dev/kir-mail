import { GatewayApi } from '@kir-mail/api-generated';
import { useQuery } from '@tanstack/react-query';

import { authenticatedAxios } from '../config/axios.config';

const gatewayApi = new GatewayApi(undefined, '', authenticatedAxios);

export function useAnalyticsData() {
  return useQuery({
    queryKey: ['analytics-data'],
    queryFn: async () => {
      const response = await gatewayApi.gatewayControllerGetData();
      return response.data;
    },
  });
}
