import { Module, CacheModule } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { AppService } from './app.service';
import { CountriesModule } from './countries/countries.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import * as redisStore from "cache-manager-redis-store";
import { RateLimiterModule } from 'nestjs-rate-limiter'
import { CalculatorModule } from './calculator/calculator.module';


@Module({
  imports: [ConfigModule.forRoot(),
    DatabaseModule,
    CountriesModule,
    AuthModule,

    ThrottlerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        ttl: configService.get('TTL'),
        limit: configService.get('LIMIT'),
      })
    }),
    CacheModule.register({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        ttl: configService.get('TTL'),
        limit: configService.get('LIMIT'),
      }),
      isGlobal: true,
      store: redisStore,
      url: 'redis://redis:6379'
    }),
    RateLimiterModule,
    CalculatorModule
  ],
  controllers: [],
  providers: [AppService,
    {
    provide: APP_GUARD,
    useClass: ThrottlerGuard
  }],
})
export class AppModule {
}
