import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { AuthModule } from './auth/auth.module';
import { PropertiesModule } from './properties/properties.module';
import { SheltersModule } from './shelters/shelters.module';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { ScheduleModule } from '@nestjs/schedule';
import { ScrapePropertiesModule } from './scraper/scrape-properties.module';


@Module({
  imports: [
    PropertiesModule,
    SheltersModule,
    GraphQLModule.forRoot({
      debug: false,
      playground: true,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
      introspection: true,
    cors: {
                origin: '*',
                credentials: true
            }
        }),
    ScheduleModule.forRoot(),
    ScrapePropertiesModule,
    TypeOrmModule.forRoot(typeOrmConfig),
    AuthModule,
  ],
})
export class AppModule {
}
