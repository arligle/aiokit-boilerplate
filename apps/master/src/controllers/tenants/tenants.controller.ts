import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { TenantService } from './tenants.service';

@ApiTags('Tenants')
@Controller({
  path: 'tenants',
  version: '1',
})
export class TenantsController {
  constructor(private readonly tenantsService: TenantService) { }
}
