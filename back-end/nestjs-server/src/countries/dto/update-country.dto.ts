import { IsDecimal, IsNotEmpty, IsString, Length, Validate } from 'class-validator';
import { IsPositiveValue } from 'src/validation/ispositive.validation';

export class UpdateCountryDto {

    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    @Length(2, 2)
    ISO: string;

    @IsNotEmpty()
    @IsDecimal()
    @Validate(IsPositiveValue)
    VAT: number;
  }