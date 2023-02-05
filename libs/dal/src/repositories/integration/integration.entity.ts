import { ChannelTypeEnum } from '@novu/shared';

export interface ICredentials {
  apiKey?: string;
  user?: string;
  secretKey?: string;
  domain?: string;
  password?: string;
  host?: string;
  port?: string;
  secure?: boolean;
  region?: string;
  accountSid?: string;
  messageProfileId?: string;
  token?: string;
  from?: string;
  senderName?: string;
  applicationId?: string;
  clientId?: string;
  projectName?: string;
  serviceAccount?: string;
  baseUrl?: string;
  ipPoolName?: string;
}

export interface ILimits {
  softLimit: number;
  hardLimit: number;
}
export class IntegrationEntity {
  _id?: string;

  _environmentId: string;

  _organizationId: string;

  providerId: string;

  channel: ChannelTypeEnum;

  credentials: ICredentials;

  limits?: ILimits;

  active: boolean;

  deleted: boolean;

  deletedAt: string;

  deletedBy: string;
}
