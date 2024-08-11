import { ConfigService } from '@nestjs/config';

import { getRabbitMQConnectionString } from './common';

export interface RabbitMQOptions {
  exchanges: Exchange[];
  uri: string;
  connectionInitOptions: ConnectionInitOptions;
  enableControllerDiscovery: boolean;
}

export interface Exchange {
  name: string;
  type: string;
}

export interface ConnectionInitOptions {
  wait: boolean;
}

export function getRabbitMQOptions(optionSpace: string): {
  useFactory: (config: ConfigService) => Promise<RabbitMQOptions>;
  inject: [typeof ConfigService];
} {
  return {
    useFactory: async (config: ConfigService) => ({
      exchanges: [
        {
          name: config.get<string>(`${optionSpace}.queue`),
          type: 'direct'
        }
      ],
      uri: getRabbitMQConnectionString({
        host: config.get<string>(`${optionSpace}.host`),
        password: config.get<string>(`${optionSpace}.password`),
        user: config.get<string>(`${optionSpace}.user`),
        port: config.get<string>(`${optionSpace}.port`),
      }),
      connectionInitOptions: { wait: false },
      enableControllerDiscovery: true,
    }),
    inject: [ConfigService]
  };
}
