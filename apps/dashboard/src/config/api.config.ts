import { TokenApi } from '@kir-mail/api-generated';

import { authenticatedAxios } from './axios.config';

export const TokenClient = new TokenApi(undefined, '', authenticatedAxios);
