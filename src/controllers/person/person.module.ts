import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Person } from "../../entities/person.entity";
import { PersonService } from "../../services/person.service";
import { PersonController } from "./person.controller";
import { JwtModule } from "@nestjs/jwt";
import { ConfigModule, ConfigService } from "@nestjs/config";

@Module({
    imports: [TypeOrmModule.forFeature([Person]), JwtModule.registerAsync({
        imports: [ConfigModule],
        useFactory: (configService: ConfigService) => ({
            secret: configService.get('JWT_SECRET'),
            signOptions: { expiresIn: "30d" }
        }),
        inject: [ConfigService]
    })],
    providers: [PersonService],
    controllers: [PersonController],
    exports: [PersonService]
})

export class PersonModule { }