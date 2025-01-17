import { ActorTypeEnum, ChannelCTATypeEnum, StepTypeEnum, TemplateVariableTypeEnum } from './channel.enum';

import { EmailBlockTypeEnum, TextAlignEnum } from '../../types';

export type MessageTemplateContentType = 'editor' | 'customHtml';

export interface IEmailBlock {
  type: EmailBlockTypeEnum;
  content: string;
  url?: string;
  styles?: {
    textAlign?: TextAlignEnum;
  };
}

export class ITemplateVariable {
  type: TemplateVariableTypeEnum;
  name: string;
  required: boolean;
  defaultValue?: string | boolean;
}

export interface IMessageTemplate {
  _id?: string;
  subject?: string;
  name?: string;
  type: StepTypeEnum;
  contentType?: MessageTemplateContentType;
  content: string | IEmailBlock[];
  variables?: ITemplateVariable[];
  cta?: {
    type: ChannelCTATypeEnum;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data: any;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    action?: any;
  };
  _feedId?: string;
  active?: boolean;
  preheader?: string;
  actor?: {
    type: ActorTypeEnum;
    data: string | null;
  };
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export const TemplateSystemVariables = ['subscriber', 'step', 'branding', 'preheader'];

// eslint-disable-next-line @typescript-eslint/naming-convention
export const SystemVariablesWithTypes = {
  subscriber: {
    firstName: 'string',
    lastName: 'string',
    email: 'string',
    phone: 'string',
    avatar: 'string',
    subscriberId: 'string',
  },
  step: {
    digest: 'boolean',
    events: 'array',
    total_count: 'number',
  },
  branding: {
    logo: 'string',
    color: 'string',
  },
};
