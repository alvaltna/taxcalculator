import { Body, Controller, Post } from '@nestjs/common';
import { CalculatorService } from './calculator.service';
import { ValidationPipe, UsePipes } from '@nestjs/common';
import { CalculateItemsDto } from './dto/calculate-items.dto'

@Controller()
export class CalculatorController {

  constructor(private calculatorService: CalculatorService) {}

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  async calculate(@Body() calculateItemsDto: CalculateItemsDto) {
    
    return this.calculatorService.calculate(calculateItemsDto);
  }
}
