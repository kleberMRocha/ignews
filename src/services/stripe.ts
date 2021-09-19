import { version as ignewsVersion } from '../../package.json';
import String from 'stripe';

export const stripe = new String(process.env.STRIPE_API_KEY, {
  apiVersion: '2020-08-27',
  appInfo: {
    name: 'ignews',
    version: ignewsVersion,
  },
});

