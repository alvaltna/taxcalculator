import { Injectable } from '@nestjs/common';
import { CalculateItemsDto } from './dto/calculate-items.dto'
import { CalculatedItemsDto } from './dto/calculated-items.dto'

@Injectable()
export class CalculatorService {

  calculate(calculateItemsList: CalculateItemsDto) {

  let calculatedItemsList = {} as CalculatedItemsDto
  calculatedItemsList.items = []
  calculatedItemsList.country = calculateItemsList.country
  let VAT =  calculateItemsList.country.VAT / 100

  for(var i=0; i < calculateItemsList.items.length; i++) {
    var itemObject = calculateItemsList.items.at(i)
    calculatedItemsList.items.push({id: itemObject.id,
      name:itemObject.name,
      priceGross:itemObject.price,
      priceNet: Math.round(((1 - VAT) * itemObject.price) * 100) / 100})
    }

    return calculatedItemsList
  }
}
