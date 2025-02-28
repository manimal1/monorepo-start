import { Service } from 'fastify-decorators';

@Service()
export class HealthCheckService {
  constructor() {}

  /**
   * Handles ready check call
   * @returns True or False depending on DB readiness
   */
  public async handleReadyEvent(): Promise<boolean> {
    return true;
  }
}
