import { Vonage } from '@vonage/server-sdk';
import { Auth } from '@vonage/auth';

export const vonage = new Vonage(
  new Auth({
    apiKey: "34e9569b",
    apiSecret: "SVEXKfcTj8kDGEun"
  })
); 