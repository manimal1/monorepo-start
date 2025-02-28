import { FastifyReply, FastifyRequest } from 'fastify';
import { Controller, GET } from 'fastify-decorators';

import { GetAllUsersSchema } from '~/schema/users.schema';
// import { UserService } from '~/services/users.service';

@Controller({ route: 'api' })
export class UserController {
  // Below is the setup if we use our own DB with Prisma instead of Firebase
  // @Inject(UserService)
  // private readonly userService!: UserService;

  // @GET({ url: '/users', options: { schema: GetAllUsersSchema } })
  // async getUsers() {
  //   return await this.userService.getAllUsers();
  // }

  @GET({ url: '/users', options: { schema: GetAllUsersSchema } })
  async getUsers(request: FastifyRequest, reply: FastifyReply) {
    const db = request.server.firestore; // Access Firestore instance
    const snapshot = await db.collection('users').get();

    const users = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    reply.send(users);
  }
}
