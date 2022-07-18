import { Type } from 'class-transformer';
import { IsDecimal, IsNotEmpty, IsString, Validate, ValidateNested } from 'class-validator';
import { AddCountryDto } from 'src/countries/dto/add-country.dto';
import { IsPositiveValue } from 'src/validation/ispositive.validation';

export class CalculateItemsDto {

    @IsNotEmpty()
    country: AddCountryDto

    @IsNotEmpty()
    @ValidateNested()
    @Type(() => ItemDto)
    items: ItemDto[]
  }

export class ItemDto {

  @IsNotEmpty()
  @IsString()
  id: string

  @IsNotEmpty()
  @IsString()
  name:string

  @IsNotEmpty()
  @IsDecimal()
  @Validate(IsPositiveValue)
  price: number

}