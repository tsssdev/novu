import { Inject, Injectable } from '@nestjs/common';
import { IntegrationEntity, IntegrationRepository, DalException } from '@novu/dal';
import { ChannelTypeEnum, NOVU_START_PROVIDERS } from '@novu/shared';
import { AnalyticsService } from '@novu/application-generic';

import { CreateIntegrationCommand } from './create-integration.command';
import { ApiException } from '../../../shared/exceptions/api.exception';
import { DeactivateSimilarChannelIntegrations } from '../deactivate-integration/deactivate-integration.usecase';
import { encryptCredentials } from '../../../shared/services/encryption';
import { CheckIntegrationCommand } from '../check-integration/check-integration.command';
import { CheckIntegration } from '../check-integration/check-integration.usecase';
import { ANALYTICS_SERVICE } from '../../../shared/shared.module';
import { CacheKeyPrefixEnum, InvalidateCacheService } from '../../../shared/services/cache';
@Injectable()
export class CreateIntegration {
  @Inject()
  private checkIntegration: CheckIntegration;
  constructor(
    private invalidateCache: InvalidateCacheService,
    private integrationRepository: IntegrationRepository,
    private deactivateSimilarChannelIntegrations: DeactivateSimilarChannelIntegrations,
    @Inject(ANALYTICS_SERVICE) private analyticsService: AnalyticsService
  ) {}

  async execute(command: CreateIntegrationCommand): Promise<IntegrationEntity> {
    let response: IntegrationEntity;

    this.analyticsService.track('Create Integration - [Integrations]', command.userId, {
      providerId: command.providerId,
      channel: command.channel,
      _organization: command.organizationId,
    });
    if (NOVU_START_PROVIDERS.has(command.providerId)) {
      command.limits = NOVU_START_PROVIDERS.get(command.providerId).limits;
    }
    try {
      if (command.check) {
        await this.checkIntegration.execute(
          CheckIntegrationCommand.create({
            environmentId: command.environmentId,
            organizationId: command.organizationId,
            providerId: command.providerId,
            channel: command.channel,
            credentials: command.credentials,
          })
        );
      }

      await this.invalidateCache.clearCache({
        storeKeyPrefix: [CacheKeyPrefixEnum.INTEGRATION],
        credentials: {
          environmentId: command.environmentId,
        },
      });

      response = await this.integrationRepository.create({
        _environmentId: command.environmentId,
        _organizationId: command.organizationId,
        providerId: command.providerId,
        channel: command.channel,
        credentials: encryptCredentials(command.credentials),
        limits: command.limits,
        active: command.active,
      });

      if (command.active && ![ChannelTypeEnum.CHAT, ChannelTypeEnum.PUSH].includes(command.channel)) {
        await this.deactivateSimilarChannelIntegrations.execute({
          environmentId: command.environmentId,
          organizationId: command.organizationId,
          integrationId: response._id,
          channel: command.channel,
        });
      }
    } catch (e) {
      if (e instanceof DalException) {
        throw new ApiException(e.message);
      }
      throw e;
    }

    return response;
  }
}
