import type { BuilderFieldOperator } from './builder.types';

export enum FilterPartTypeEnum {
  PAYLOAD = 'payload',
  SUBSCRIBER = 'subscriber',
  WEBHOOK = 'webhook',
  IS_ONLINE = 'isOnline',
  IS_ONLINE_IN_LAST = 'isOnlineInLast',
}

export interface IBaseFilterPart {
  on: FilterPartTypeEnum;
}

export interface IBaseFieldFilterPart extends IBaseFilterPart {
  field: string;
  value: string;
  operator: BuilderFieldOperator;
}

export interface IFieldFilterPart extends IBaseFieldFilterPart {
  on: FilterPartTypeEnum.SUBSCRIBER | FilterPartTypeEnum.PAYLOAD;
}

export interface IWebhookFilterPart extends IBaseFieldFilterPart {
  on: FilterPartTypeEnum.WEBHOOK;
  webhookUrl: string;
}

export interface IRealtimeOnlineFilterPart extends IBaseFilterPart {
  on: FilterPartTypeEnum.IS_ONLINE;
  value: boolean;
}

export interface IOnlineInLastFilterPart extends IBaseFilterPart {
  on: FilterPartTypeEnum.IS_ONLINE_IN_LAST;
  timeOperator: 'minutes' | 'hours' | 'days';
  value: number;
}

export type FilterParts = IFieldFilterPart | IWebhookFilterPart | IRealtimeOnlineFilterPart | IOnlineInLastFilterPart;
