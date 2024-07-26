import * as dotenv from 'dotenv';
import * as env from 'env-var';

dotenv.config();

export const PORT = env.get('PORT').required().asPortNumber();
export const REDIS_HOST = env.get('REDIS_HOST').required().asString();
export const REDIS_PORT = env.get('REDIS_PORT').required().asPortNumber();
export const MAIL_HOST = env.get('MAIL_HOST').required().asString();
export const MAIL_PORT = env.get('MAIL_PORT').required().asPortNumber();
export const MAIL_USER = env.get('MAIL_USER').required().asString();
export const MAIL_PASS = env.get('MAIL_PASS').required().asString();
