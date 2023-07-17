import slugify from 'slugify';

import type { GetTransformedOffers } from './base';
import type { Offer } from '../../core/offer';

export const PROVIDER_NAME = 'offer1';
export type Provider = typeof PROVIDER_NAME;

type OfferPayload = {
  offer_name?: string;
  offer_desc?: string;
  call_to_action?: string;
  image_url?: string;
  platform?: 'desktop' | 'mobile';
  device?: 'iphone_ipad' | 'any';
  offer_url?: string;
  offer_id?: string;
};

type Payload = {
  response?: {
    offers?: Array<OfferPayload>;
  };
};

export const getTransformedOffers: GetTransformedOffers = (incomingPayload) => {
  const payload = <Payload>incomingPayload;

  if (!payload) {
    return [];
  }

  if (!payload.response) {
    return [];
  }

  if (!payload.response.offers) {
    return [];
  }

  return payload.response.offers.map<Offer>((offer) => ({
    name: offer.offer_name || '',
    slug: slugify(`${offer.offer_id}-${offer.offer_name}`, {
      lower: true,
    }),
    description: offer.offer_desc || '',
    requirements: offer.call_to_action || '',
    thumbnail: offer.image_url || '',
    isDesktop: offer.platform === 'desktop',
    isAndroid: offer.device !== 'iphone_ipad',
    isIos: offer.device === 'iphone_ipad',
    offerUrlTemplate: offer.offer_url || '',
    providerName: PROVIDER_NAME,
    externalOfferId: offer.offer_id,
  }));
};
