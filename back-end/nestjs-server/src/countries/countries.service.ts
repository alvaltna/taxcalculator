import { Injectable } from '@nestjs/common';
import { HttpException, HttpStatus } from "@nestjs/common";
import { Country } from './country.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateCountryDto } from './dto/update-country.dto';
import { AddCountryDto } from './dto/add-country.dto';

@Injectable()
export class CountriesService {
  constructor(
      @InjectRepository(Country)
      private countryRepository: Repository<Country>
    ) {}

    async seed(): Promise<void> {
      let seedDataCountries = [
        {name: 'Estonia', ISO: 'EE', VAT: 20.00},
        {name: 'Latvia', ISO: 'LV', VAT: 21.00},
        {name: 'Canada', ISO: 'CA', VAT: 13.00},
      ]
      for (let i=0; i < seedDataCountries.length; i++) {
        await Promise.all([
          this.countryRepository.save(seedDataCountries.at(i))
        ]);
      }
    }

    listAllCountries() {
        return this.countryRepository.find();
    }

    async getCountryById(id: number) {

        const country = await this.countryRepository.findOne(
            {where: {id: id}}
        );
        if (country) {
          return country;
        }
        throw new HttpException('Country doesn\'t exist', HttpStatus.NOT_FOUND);
    }

    async addCountry(country: AddCountryDto) {

      if((await this.countryRepository.findOne({ where: {
        name: country.name }}))) {
        throw new HttpException('Country ' + country.name + ' already exists',
        HttpStatus.BAD_REQUEST);
      }
      const newPost = await this.countryRepository.create(country);
      await this.countryRepository.save(newPost);
      return newPost;
    }

    async updateCountry(id: number, country: UpdateCountryDto) {

      const foundCountry = await this.countryRepository.findOne({ where: {
        name: country.name }})
        if(foundCountry && foundCountry.id != id) {
          throw new HttpException('Country ' + country.name + ' already exists',
        HttpStatus.BAD_REQUEST);
        }

      await this.countryRepository.update(id, country);
      const updatedCountry = await this.getCountryById(id);
      if (updatedCountry) {
          return updatedCountry
      }

    }

    async deleteCountry(id: number) {
        const deleteResponse = await this.countryRepository.delete(id);
        if (!deleteResponse.affected) {
          throw new HttpException('Country not found', HttpStatus.NOT_FOUND);
        }
      }

}