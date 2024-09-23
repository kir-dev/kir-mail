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
export const MAIL_FROM = env.get('MAIL_FROM').required().asString();
export const DISABLE_EMAILS = env.get('DISABLE_EMAILS').default('false').asBool();

export const QUEUE_IDS = env.get('QUEUE_IDS').required().asArray();
export const MAX_MESSAGES_PER_INTERVAL = env.get('MAX_MESSAGES_PER_INTERVAL').required().asInt();
export const INTERVAL = env.get('INTERVAL').required().asInt();
export const CONSUMER_NAME = env.get('CONSUMER_NAME').required().asString();
