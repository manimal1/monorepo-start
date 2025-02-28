import { Service } from 'fastify-decorators';

import { type IUser } from '~/interfaces/user.interface';
import { prisma } from '~/setup/prisma.setup';

@Service()
export class UserService {
  private readonly prismaClient: any; // eslint-disable-line

  constructor() {
    this.prismaClient = prisma;
  }

  /**
   * Retrieves list of all current users.
   * @returns List of users.
   */
  public async getAllUsers(): Promise<Array<IUser>> {
    return await this.prismaClient.user.findMany();
  }
}
