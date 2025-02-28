import { FastifyInstance } from 'fastify';
import { bootstrap } from 'fastify-decorators';

import MultipartLib from '@fastify/multipart';
import FastifyWebsocket from '@fastify/websocket';
import { HealthCheckController } from '~/controllers/health-check.controller';
import { UserController } from '~/controllers/users.controller';
import { logger } from '~/setup/logger.setup';
import { db } from '~/setup/firebase.setup';

export const initializeControllers = (server: FastifyInstance): void => {
  server.decorate('firestore', db);
  server.register(MultipartLib);

  server.addContentTypeParser(
    'application/geo+json',
    { parseAs: 'buffer' },
    (_, payload, done) => {
      done(null, payload); // Pass the raw buffer
    }
  );

  server.register((instance, opts, next) => {
    instance.addHook('onResponse', (request, reply, done) => {
      logger.info(
        `Request ${request.raw.url} finished in ${Math.floor(reply.elapsedTime)}ms`,
        {
          body: request.body,
          query: request.query,
          params: request.params,
          headers: request.headers,
          ip: request.ip,
          host: request.hostname,
          'x-correlation-id': request.headers['x-correlation-id'],
          statusCode: reply.statusCode,
          time: reply.elapsedTime,
        }
      );

      done();
    });

    server.register(FastifyWebsocket);

    server.register(bootstrap, {
      controllers: [HealthCheckController, UserController],
    });

    next();
  });
};
