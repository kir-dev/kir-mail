import * as dotenv from 'dotenv';
import * as env from 'env-var';
dotenv.config();

export class ConfigService {
  private readonly envConfig: {
    kafkaBroker: string;
  };

  constructor() {
    this.envConfig = {
      kafkaBroker: env.get('KAFKA_BROKER').required().asString(),
    };
  }

  get<T extends keyof typeof this.envConfig>(key: T): (typeof this.envConfig)[T] {
    return this.envConfig[key];
  }
}
