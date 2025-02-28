import { Controller, GET, Inject } from 'fastify-decorators';

import { HealthCheckService } from '~/services/health-check.service';

@Controller({ route: '' })
export class HealthCheckController {
  @Inject(HealthCheckService)
  private readonly healthCheckService!: HealthCheckService;

  @GET({ url: '/healthy', options: {} })
  public async receiveHealthCheckEvent() {
    return { code: 200, body: { alive: true } };
  }

  @GET({ url: '/ready', options: {} })
  public async receiveReadyEvent() {
    return this.healthCheckService.handleReadyEvent();
  }
}
