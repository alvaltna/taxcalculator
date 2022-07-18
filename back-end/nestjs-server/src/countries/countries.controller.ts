import { Body, Controller, Get, Post, Patch, Param,
  Delete, UseGuards,CACHE_MANAGER, Inject, Req } from '@nestjs/common';
import { HttpException, HttpStatus } from "@nestjs/common";
import { Cache } from "cache-manager";
import { ValidationPipe, UsePipes } from '@nestjs/common';
import { CountriesService } from './countries.service';
import { AddCountryDto } from './dto/add-country.dto';
import { UpdateCountryDto } from './dto/update-country.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import {rateLimit} from 'utils-decorators';


@Controller('countries')
export class CountriesController {
  constructor(private countriesService: CountriesService,
    @Inject(CACHE_MANAGER)
    private cacheManager: Cache
    ) {}

  @Get()
  async listAllCountries() {
    return await this.countriesService.listAllCountries();
  }

  @Get(':id')
  async getCountryById(@Param('id') id: number) {
    return await this.countriesService.getCountryById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post('add')
  @rateLimit({
    allowedCalls: 5,
    timeSpanMs: 1000 * 60, // one minute
    keyResolver: (req: any) => req.user.userId,
    exceedHandler: () => {
      throw new HttpException('Rate limit exceeded. Try again in 1 minute.',
       HttpStatus.TOO_MANY_REQUESTS);
    },
  })
  @UsePipes(new ValidationPipe({ transform: true }))
  async addCountry(@Req() req: any, @Body() addCountryDto: AddCountryDto) {
    await this.countriesService.addCountry(addCountryDto);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('update/:id')
  @rateLimit({
    allowedCalls: 5,
    timeSpanMs: 1000 * 60, // one minute
    keyResolver: (req: any) => req.user.userId,
    exceedHandler: () => {
      throw new HttpException('Rate limit exceeded. Try again in 1 minute.',
       HttpStatus.TOO_MANY_REQUESTS);
    },
  })
  @UsePipes(new ValidationPipe({ transform: true }))
  async updateCountry(@Req() req: any, @Param('id') id: number,
  @Body() updateCountryDto: UpdateCountryDto) {
    await this.countriesService.updateCountry(id, updateCountryDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('delete/:id')
  @rateLimit({
    allowedCalls: 5,
    timeSpanMs: 1000 * 60, // one minute
    keyResolver: (req: any) => req.user.userId,
    exceedHandler: () => {
      throw new HttpException('Rate limit exceeded. Try again in 1 minute.',
       HttpStatus.TOO_MANY_REQUESTS);
    },
  })
  async deleteCountry(@Req() req: any, @Param('id') id: number) {
    return await this.countriesService.deleteCountry(id);
  }

}