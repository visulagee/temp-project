import 'reflect-metadata';

import { expect, describe, it, vi } from 'vitest';

import { TransformProviderOffers } from '../src';

import { validOffer, invalidOffer } from './fixture-offer2';

describe('Provider: Offer2', () => {
  it('should return transformed offer', () => {
    const transformedOffers = TransformProviderOffers.transform('offer2', validOffer).getOffers();
    expect(transformedOffers).toEqual([
      {
        name: 'Sofi',
        slug: '15828-sofi',
        description:
          'SoFi is a one-stop shop for your finances, designed to help you Get Your Money Right.',
        requirements:
          'Register with VALID personal information, Make a minimum deposit of $50,Redeem your points! *New Users Only!',
        thumbnail: 'https://some.url',
        isDesktop: true,
        isAndroid: false,
        isIos: true,
        offerUrlTemplate: 'https://some.url',
        providerName: 'offer2',
        externalOfferId: '15828',
      },
    ]);
  });

  it('should ignore invalid offers', () => {
    const transformedOffers = TransformProviderOffers.transform('offer2', invalidOffer).getOffers({
      warn: vi.fn(),
    });
    expect(transformedOffers).toEqual([]);
  });

  it('should log a warn for invalid offers', () => {
    const mockWarn = vi.fn();
    TransformProviderOffers.transform('offer2', invalidOffer).getOffers({
      warn: mockWarn,
    });

    expect(mockWarn).toBeCalledWith(
      expect.stringContaining(
        'property requirements has failed the following constraints: isNotEmpty'
      )
    );
  });

  it('should return empty offer list when malformed input is passed', () => {
    const transformedOffers = TransformProviderOffers.transform('offer2', {}).getOffers({
      warn: vi.fn(),
    });

    expect(transformedOffers).toEqual([]);
  });
});
