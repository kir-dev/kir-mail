import * as dotenv from 'dotenv';
import * as env from 'env-var';

dotenv.config();

type ServiceConfig = {
  host: string;
  port: number;
};

export class ConfigService {
  private readonly envConfig: ServiceConfig & {
    kafkaBroker: string;
  };

  constructor() {
    this.envConfig = {
      host: env.get('HOST').required().asString(),
      port: env.get('PORT').required().asPortNumber(),
      kafkaBroker: env.get('KAFKA_BROKER').required().asString(),
    };
  }

  get<T extends keyof typeof this.envConfig>(key: T): (typeof this.envConfig)[T] {
    return this.envConfig[key];
  }
}
