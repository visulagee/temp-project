import * as Offer1Transformer from './offer1';
import * as Offer2Transformer from './offer2';

import type { GetTransformedOffers } from './base';

export type TransformerName = Offer1Transformer.Provider | Offer2Transformer.Provider;

const transformers: Array<[TransformerName, GetTransformedOffers]> = [
  [Offer1Transformer.PROVIDER_NAME, Offer1Transformer.getTransformedOffers],
  [Offer2Transformer.PROVIDER_NAME, Offer2Transformer.getTransformedOffers],
];

export const transformerMap: Map<TransformerName, GetTransformedOffers> = new Map(transformers);
