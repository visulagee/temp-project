import 'reflect-metadata';

import { expect, describe, it, vi } from 'vitest';

import { TransformProviderOffers } from '../src/transformer';

import { validOffer, invalidOffer } from './fixture-offer1';

describe('Provider: Offer1', () => {
  it('should return transformed offer', () => {
    const transformedOffers = TransformProviderOffers.transform('offer1', validOffer).getOffers();
    expect(transformedOffers).toEqual([
      {
        name: 'MyGym - iOS',
        slug: '19524555-mygym-ios',
        description: 'Play and reach level 23 within 14 days.',
        requirements: 'Play and reach level 23 within 14 days.',
        thumbnail: 'https://some.url',
        isDesktop: false,
        isAndroid: false,
        isIos: true,
        offerUrlTemplate: 'https://some.url',
        providerName: 'offer1',
        externalOfferId: '19524555',
      },
    ]);
  });

  it('should ignore invalid offers', () => {
    const transformedOffers = TransformProviderOffers.transform('offer1', invalidOffer).getOffers({
      warn: vi.fn(),
    });
    expect(transformedOffers).toEqual([]);
  });

  it('should log a warn for invalid offers', () => {
    const mockWarn = vi.fn();
    TransformProviderOffers.transform('offer1', invalidOffer).getOffers({
      warn: mockWarn,
    });

    expect(mockWarn).toBeCalledWith(
      expect.stringContaining(
        'property requirements has failed the following constraints: isNotEmpty'
      )
    );
  });

  it('should return empty offer list when malformed input is passed', () => {
    const transformedOffers = TransformProviderOffers.transform('offer1', {}).getOffers({
      warn: vi.fn(),
    });

    expect(transformedOffers).toEqual([]);
  });
});
