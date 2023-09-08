import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Person } from './entities/person.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PersonModule } from './controllers/person/person.module';
import { AuthModule } from './auth/auth.module';
import { Phone } from './entities/phone.entity';
import { PhoneModule } from './controllers/phone/phone.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: "postgres",
        host: configService.get('DB_HOST'),
        port: configService.get('DB_PORT'),
        username: configService.get('DB_USER'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        synchronize: true,
        // entities: [__dirname + 'dist/**/*.entity{.ts,.js}'],
        entities: [Person, Phone],
        autoLoadEntities: true,
        logging: true
      })
    }),
    PersonModule,
    AuthModule,
    PhoneModule
  ],
  providers: [AppService],
  controllers: [AppController],
})
export class AppModule { }
 