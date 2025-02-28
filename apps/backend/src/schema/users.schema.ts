import { FastifySchema } from 'fastify';

export const GetAllUsersSchema: FastifySchema = {
  tags: ['Users'],
  response: {
    200: {
      title: 'GetAllUsersResponse',
      description: 'Returns User[]',
      type: 'array',
      items: { $ref: 'User#' },
    },
  },
};

export const User = {
  $id: 'User',
  title: 'User',
  type: 'object',
  properties: {
    id: { type: 'string' },
    accessRights: {
      type: 'object',
      properties: {
        read: { type: 'boolean' },
        write: { type: 'boolean' },
        chat: { type: 'boolean' },
        modifyUsers: { type: 'boolean' },
        modifySettings: { type: 'boolean' },
      },
    },
    businessID: { type: 'string', nullable: true },
    customerID: { type: 'string', nullable: true },
    email: { type: 'string' },
    firstName: { type: 'string' },
    lastName: { type: 'string' },
    role: { type: 'string', enum: ['owner', 'employee'] },
    type: { type: 'string', enum: ['business', 'customer'] },
  },
  required: [
    'id',
    'accessRights',
    'email',
    'firstName',
    'lastName',
    'role',
    'type',
  ],
};
