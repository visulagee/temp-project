import slugify from 'slugify';

import type { GetTransformedOffers } from './base';
import type { Offer } from '../../core/offer';

export const PROVIDER_NAME = 'offer2';
export type Provider = typeof PROVIDER_NAME;

type OfferPayload = {
  Offer?: {
    name: string;
    description: string;
    instructions: string;
    icon: string;
    tracking_url: string;
    campaign_id: number;
  };
  OS?: {
    android: boolean;
    ios: boolean;
    web: boolean;
  };
};
type DataPayload = Record<string, OfferPayload>;
type Payload = {
  data?: DataPayload;
};

export const getTransformedOffers: GetTransformedOffers = (incomingPayload) => {
  const payload = <Payload>incomingPayload;

  if (!payload) {
    return [];
  }

  if (!payload.data) {
    return [];
  }

  const [key] = Object.keys(payload.data);
  if (key === undefined) {
    return [];
  }

  const providerOfferPayload = <OfferPayload>payload.data[key];
  const constructedOffer: Offer = {
    name: providerOfferPayload.Offer?.name || '',
    slug: slugify(
      `${providerOfferPayload.Offer?.campaign_id}-${providerOfferPayload.Offer?.name}`,
      {
        lower: true,
      }
    ),
    description: providerOfferPayload.Offer?.description || '',
    requirements: providerOfferPayload.Offer?.instructions || '',
    thumbnail: providerOfferPayload.Offer?.icon || '',
    isDesktop: providerOfferPayload.OS?.web || false,
    isAndroid: providerOfferPayload.OS?.android || false,
    isIos: providerOfferPayload.OS?.ios || false,
    offerUrlTemplate: providerOfferPayload.Offer?.tracking_url || '',
    providerName: PROVIDER_NAME,
    externalOfferId: providerOfferPayload.Offer?.campaign_id.toString() || '',
  };

  return [constructedOffer];
};
