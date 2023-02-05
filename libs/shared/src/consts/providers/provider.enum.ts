/* eslint-disable @typescript-eslint/naming-convention */

import { ChannelTypeEnum } from '../..';
import { ILimitsDto } from '../../dto';

export enum CredentialsKeyEnum {
  ApiKey = 'apiKey',
  User = 'user',
  SecretKey = 'secretKey',
  Domain = 'domain',
  Password = 'password',
  Host = 'host',
  Port = 'port',
  Secure = 'secure',
  Region = 'region',
  AccountSid = 'accountSid',
  MessageProfileId = 'messageProfileId',
  Token = 'token',
  From = 'from',
  SenderName = 'senderName',
  ApplicationId = 'applicationId',
  ClientId = 'clientId',
  ProjectName = 'projectName',
  ServiceAccount = 'serviceAccount',
  BaseUrl = 'baseUrl',
  WebhookUrl = 'webhookUrl',
}

export enum EmailProviderIdEnum {
  EmailJS = 'emailjs',
  Mailgun = 'mailgun',
  Mailjet = 'mailjet',
  Mandrill = 'mandrill',
  CustomSMTP = 'nodemailer',
  Postmark = 'postmark',
  SendGrid = 'sendgrid',
  Sendinblue = 'sendinblue',
  SES = 'ses',
  NetCore = 'netcore',
  Infobip = 'infobip-email',
  MailerSend = 'mailersend',
  Clickatell = 'clickatell',
  Outlook365 = 'outlook365',
  Novu = 'novu-email',
}

export enum SmsProviderIdEnum {
  Nexmo = 'nexmo',
  Plivo = 'plivo',
  Sms77 = 'sms77',
  SNS = 'sns',
  Telnyx = 'telnyx',
  Twilio = 'twilio',
  Gupshup = 'gupshup',
  Firetext = 'firetext',
  Infobip = 'infobip-sms',
  BurstSms = 'burst-sms',
  Clickatell = 'clickatell',
}

export enum ChatProviderIdEnum {
  Slack = 'slack',
  Discord = 'discord',
  MsTeams = 'msteams',
}

export enum PushProviderIdEnum {
  FCM = 'fcm',
  APNS = 'apns',
  EXPO = 'expo',
}

export enum InAppProviderIdEnum {
  Novu = 'novu',
}

type _ChannelNLimit = {
  channel: ChannelTypeEnum;
  limits: ILimitsDto;
};

export const NOVU_START_PROVIDERS = new Map<string, _ChannelNLimit>([
  [EmailProviderIdEnum.Novu, { channel: ChannelTypeEnum.EMAIL, limits: { softLimit: 175, hardLimit: 200 } }],
]);
