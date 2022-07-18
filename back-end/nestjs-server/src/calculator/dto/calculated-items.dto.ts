import { IsNotEmpty } from 'class-validator';
import { AddCountryDto } from 'src/countries/dto/add-country.dto';

export class CalculatedItemsDto {

    country: AddCountryDto
    @IsNotEmpty()
    items: {id: string, name: string, priceGross: number, priceNet: number} []
  }