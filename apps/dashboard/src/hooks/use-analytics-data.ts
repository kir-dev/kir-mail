import { GatewayApi } from '@kir-mail/api-generated';
import { useQuery } from '@tanstack/react-query';

const gatewayApi = new GatewayApi(undefined, 'http://localhost:3000');

export function useAnalyticsData() {
  return useQuery({
    queryKey: ['analytics-data'],
    queryFn: async () => {
      const response = await gatewayApi.gatewayControllerGetData();
      return response.data;
    },
  });
}
