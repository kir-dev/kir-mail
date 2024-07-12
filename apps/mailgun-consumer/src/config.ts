import * as dotenv from 'dotenv';
import * as env from 'env-var';

dotenv.config();

export const PORT = env.get('PORT').required().asPortNumber();
export const REDIS_HOST = env.get('REDIS_HOST').required().asString();
export const REDIS_PORT = env.get('REDIS_PORT').required().asPortNumber();
