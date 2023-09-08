import { Module } from "@nestjs/common";
import { PhoneService } from "../../services/phone.service";
import { PhoneController } from "./phone.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Phone } from "../../entities/phone.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Phone])],
    providers: [PhoneService],
    controllers: [PhoneController]
})

export class PhoneModule { }