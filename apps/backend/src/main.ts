import path from 'path';

import { addAliases } from 'module-alias';

// Make sure aliasing works after transpilation
addAliases({
  '~': path.resolve(__dirname),
});

// Now load module-alias
import 'module-alias/register';

import { logger } from '~/setup/logger.setup';

async function main(): Promise<void> {
  await import('reflect-metadata');
  const { bootstrap } = await import('~/setup/bootstrap');

  bootstrap().catch((err: Error) => {
    logger.info(err);
  });
}

main();
