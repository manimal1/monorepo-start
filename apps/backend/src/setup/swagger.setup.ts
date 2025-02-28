import { FastifyInstance } from 'fastify';

import swagger from '@fastify/swagger';
import swaggerUi from '@fastify/swagger-ui';
import { CONFIG } from '~/config';
import { User } from '~/schema/users.schema';

export const initializeSwagger = (server: FastifyInstance): void => {
  server.register(swagger, {
    mode: 'dynamic',
    openapi: {
      openapi: '3.0.0',
      info: {
        title: 'AIsist API',
        version: '1.0.0',
        description: 'API for AIsist',
      },
      servers: [
        {
          url: CONFIG.APP.BASE_PATH,
          description: '',
        },
      ],
    },
    refResolver: {
      buildLocalReference(json, baseUri, fragment, i) {
        // see: https://github.com/fastify/fastify-swagger/blob/1b53e376b4b752481643cf5a5655c284684383c3/lib/mode/dynamic.js#L17
        if (!json.title && json.$id) {
          json.title = json.$id;
        }

        if (!json.$id) {
          return `def-${i}`;
        }

        return `${json.$id}`;
      },
    },
  });

  server.register(swaggerUi, {
    routePrefix: CONFIG.SWAGGER.BASE_PATH,
  });

  server.addSchema(User);
};
