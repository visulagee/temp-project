import { IsBoolean, IsString, MaxLength, IsOptional, IsNotEmpty } from 'class-validator';

export type Offer = {
  name: string;
  slug: string;
  description: string;
  requirements: string;
  thumbnail: string;
  isDesktop: boolean;
  isAndroid: boolean;
  isIos: boolean;
  offerUrlTemplate: string;
  providerName: string;
  externalOfferId?: string;
};

export class OfferEntity implements Offer {
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  declare name: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  declare slug: string;

  @IsString()
  @IsNotEmpty()
  declare description: string;

  @IsString()
  @IsNotEmpty()
  declare requirements: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  declare thumbnail: string;

  @IsBoolean()
  declare isDesktop: boolean;

  @IsBoolean()
  declare isAndroid: boolean;

  @IsBoolean()
  declare isIos: boolean;

  @IsString()
  @MaxLength(255)
  declare offerUrlTemplate: string;

  @IsString()
  @MaxLength(255)
  @IsOptional()
  declare providerName: string;

  @IsString()
  @MaxLength(255)
  @IsOptional()
  declare externalOfferId: string;
}
