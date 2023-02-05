import { Module } from '@nestjs/common';
import { SharedModule } from '../shared/shared.module';
import { USE_CASES } from './usecases';
import { IntegrationsController } from './integrations.controller';
import { AuthModule } from '../auth/auth.module';
import { ExecutionDetailsModule } from '../execution-details/execution-details.module';

@Module({
  imports: [SharedModule, AuthModule, ExecutionDetailsModule],
  controllers: [IntegrationsController],
  providers: [...USE_CASES],
  exports: [...USE_CASES],
})
export class IntegrationModule {}
