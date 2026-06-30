import 'dotenv/config';

import { createContainer } from './composition-root/container/container';

function bootstrap() {
  createContainer();
}

bootstrap();
