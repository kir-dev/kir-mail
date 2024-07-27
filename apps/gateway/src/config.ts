import * as env from 'env-var';

export const PORT = env.get('PORT').required().asPortNumber();
export const REDIS_HOST = env.get('REDIS_HOST').required().asString();
export const REDIS_PORT = env.get('REDIS_PORT').required().asPortNumber();

export const FRONTEND_URL = env.get('FRONTEND_URL').required().asString();
export const JWT_SECRET = env.get('JWT_SECRET').required().asString();
export const AUTHSCH_CLIENT_ID = env.get('AUTHSCH_CLIENT_ID').required().asString();
export const AUTHSCH_CLIENT_SECRET = env.get('AUTHSCH_CLIENT_SECRET').required().asString();
export const AUTHSCH_AUTHORIZED_GROUPS = env.get('AUTHSCH_AUTHORIZED_GROUPS').required().asArray();

export const QUEUE_IDS = env.get('QUEUE_IDS').default('').asArray();
