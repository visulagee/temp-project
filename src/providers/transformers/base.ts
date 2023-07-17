import { type Offer } from '../../core/offer';

export type GetTransformedOffers = (incomingPayload: unknown) => Array<Offer>;
