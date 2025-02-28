import { fastify } from 'fastify';

import cors from '@fastify/cors';
import { ajvFilePlugin } from '@fastify/multipart';
import { CONFIG } from '~/config';
import { initializeControllers } from '~/setup/fastify.setup';
import { logger } from '~/setup/logger.setup';
import { initializeSwagger } from '~/setup/swagger.setup';
// import fastifyPrisma from '@joggr/fastify-prisma';
// import { prisma } from '~/setup/prisma.setup';

export const bootstrap = async (): Promise<void> => {
  const server = fastify({
    ajv: {
      // Adds the file plugin to help @fastify/swagger schema generation
      plugins: [ajvFilePlugin],
    },
  });

  // await server.register(fastifyPrisma, {
  //   client: prisma,
  // });

  // TODO: remove when the actual API is deployed
  server.register(cors, {
    origin: 'http://localhost:3000', // Allow requests from Frontend dev env
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: false,
  });

  initializeSwagger(server);
  initializeControllers(server);

  try {
    await server.listen({
      port: CONFIG.APP.PORT,
      host: '0.0.0.0',
    });
    logger.info(`Server is now listening on port ${CONFIG.APP.PORT}`);
  } catch (err) {
    logger.info('Error starting server:', err);
    process.exit(1);
  }
};
