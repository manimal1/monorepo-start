import { Firestore } from 'firebase-admin/firestore';
import { FastifyInstance } from 'fastify';

declare module 'fastify' {
  interface FastifyInstance {
    firestore: Firestore;
  }
}
