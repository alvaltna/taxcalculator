import { Inject, Injectable, CACHE_MANAGER, OnApplicationBootstrap } from '@nestjs/common';
import { Cache } from "cache-manager";
import { CountriesService } from './countries/countries.service';

@Injectable()
export class AppService implements OnApplicationBootstrap{

  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache,
  private countriesService: CountriesService
  ) {}

  onApplicationBootstrap() {
  // Initialize database with data
    this.countriesService.seed()
  }

  async addToCache(key: string, item: string) {
    await this.cacheManager.set(key, item);
  }

  async getFromCache(key: string) {
    const value = await this.cacheManager.get(key);
    return value;
  }
}
