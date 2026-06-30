import type { ContainerOptions } from 'inversify';
import { Container } from 'inversify';

import type { PostgresConfigPort } from '../../application/ports/config/postgres-config.port';
import { postgresEnvConfig } from '../../infrastructure/config/postgres-env.config';
import { INJECT } from './injection-tokens';

export function createContainer(
  options: ContainerOptions = { autobind: true, defaultScope: 'Singleton' },
): Container {
  const container = new Container(options);

  container.bind<PostgresConfigPort>(INJECT.CONFIG.POSTGRES).toConstantValue(postgresEnvConfig());

  return container;
}
