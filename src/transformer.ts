import 'reflect-metadata';

import { Transform, plainToInstance } from 'class-transformer';
import { validateSync, type ValidationError } from 'class-validator';

import { type Offer } from './core/offer';
import { type ProviderName, getTransformedOffer } from './providers/factory';

type Logger = { warn: (message: string) => void };

export class TransformProviderOffers {
  protected declare provider: ProviderName;

  protected declare providerResponse: string;

  @Transform(({ obj }) => getTransformedOffer(obj))
  private declare offers: Offer[];

  /**
   * Retrieves the transformed and validated offers.
   * @param logger An optional logger object to log validation errors.
   * @returns An array of validated offers.
   */
  getOffers(logger: Logger = console): Offer[] {
    return this.offers.reduce<Array<Offer>>((validOffers, offer) => {
      const validationErrors = validateSync(offer, {
        whitelist: true,
        forbidNonWhitelisted: true,
        forbidUnknownValues: true,
      });

      if (validationErrors.length) {
        this.logErrors(validationErrors, logger);
      } else {
        validOffers.push(offer);
      }

      return validOffers;
    }, []);
  }

  private logErrors(errors: Array<ValidationError>, logger: Logger) {
    errors.forEach((error) => {
      logger.warn(error.toString());
    });
  }

  /**
   * Transforms a provider response into an instance of TransformProviderOffers.
   * @param provider The name of the provider.
   * @param providerResponse The provider response object.
   * @returns An instance of TransformProviderOffers.
   */
  static transform(provider: ProviderName, providerResponse: unknown): TransformProviderOffers {
    return plainToInstance(TransformProviderOffers, {
      provider,
      providerResponse,
      offers: [],
    });
  }
}
