# Transform different offer structures into one

## Components

- There are 3 main components.
  1. `Core` - contains the `Main offer structure`. (This structure is validated by decorators from `class-validator`).
  2. `Providers` - contains the logic for transforming each provider's individual offer structure to the main structure.
  3. `Transformer` - expose the API to transform the different offer structures based on the provider and get the transformed offers.

## How to use

```ts
import { TransformProviderOffers } from './transformer';

const offer = {
  // some offer structure
};

/**
 *  @param provider The name of the provider. - You need to add the providers to the providers' folder first.
 * @param providerResponse The provider response object.
 * @returns An instance of TransformProviderOffers.
 */
const transformProvider = TransformProviderOffers.transform('offer1', offer);

/**
 * Retrieves the transformed and validated offers.
 * @param logger An optional logger object to log validation errors.
 * @returns An array of validated offers.
 */
const offers = transformProvider.getOffers();
```

## Adding a new provider.

1. Add the provider transform function into `./providers/transformers`;

   - The prover transform must have the following structure.

```ts
import type { GetTransformedOffers } from './base';
import type { Offer } from '../../core/offer';

export const PROVIDER_NAME = '<Provider name>';
export type Provider = typeof PROVIDER_NAME;

type OfferPayload = {
  // payload structure
};

type Payload = {
  // payload structure
};

/**
 * Function signature must be as follows.
 * type GetTransformedOffers = (incomingPayload: unknown) => Array<Offer>;
 *
 * Represents a function that transforms an incoming payload and returns an array of offers.
 * @param incomingPayload - The payload to be transformed.
 * @returns An array of transformed offers.
 */
export const getTransformedOffers: GetTransformedOffers = (incomingPayload) => {
  /**
   * You can cast the 'incomingPayload' to 'Payload' type here.
   * It is necessary since the type of the 'incomingPayload' is 'unknown'.
   **/
  const payload = <Payload>incomingPayload;

  // Transform logic is here

  return arraysOfOffer;
};
```

2. Add the new provider to the `./providers/transformers/map.ts` as follows.

```ts
import * as ExistingTransformer from './an-existing-provider';

import * as NewTransformer from './newly-added-provider';

import type { GetTransformedOffers } from './base';

/**
 * Add Provider to the TransformerNames
 *
 * This helps type-safety when calling TransformProviderOffers.transform('offer1', offer)
 */
export type TransformerName = ExistingTransformer.Provider | Offer2Transformer.NewTransformer;

const transformers: Array<[TransformerName, GetTransformedOffers]> = [
  [ExistingTransformer.PROVIDER_NAME, ExistingTransformer.getTransformedOffers],

  /**
   * Add the new transformer as follows to this array.
   */
  [NewTransformer.PROVIDER_NAME, NewTransformer.getTransformedOffers],
];

export const transformerMap: Map<TransformerName, GetTransformedOffers> = new Map(transformers);
```

## Running tests

- Please type `npm t` or `npm test` to run tests
- The tests are located in the `./tests/` folder.
