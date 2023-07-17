import { plainToInstance } from 'class-transformer';

import { type Offer, OfferEntity } from '../core/offer';

import { transformerMap, type TransformerName } from './transformers/map';

import type { GetTransformedOffers } from './transformers/base';

export type ProviderName = TransformerName;

export function getTransformedOffer({
  provider,
  providerResponse,
}: {
  provider: ProviderName;
  providerResponse: unknown;
}): Array<Offer> {
  const getTransformedOffersFn = <GetTransformedOffers>transformerMap.get(provider);
  const transformedOffers = getTransformedOffersFn(providerResponse);

  return plainToInstance(OfferEntity, transformedOffers);
}
