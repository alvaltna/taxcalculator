import { IsNotEmpty, IsString, Length, IsDecimal, Validate } from 'class-validator';
import { IsPositiveValue } from 'src/validation/ispositive.validation';

export class AddCountryDto {

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