import * as argon2 from "argon2";
import { BadRequestException, Injectable } from '@nestjs/common';
import { PersonService } from '../services/person.service';
import { JwtService } from "@nestjs/jwt";
import { IPersonInfoDto } from "../dto/person.dto";

@Injectable()
export class AuthService {
    constructor(
        private personService: PersonService,
        private jwtService: JwtService
    ) { }

    async validateUser(email: string, password: string): Promise<any> {
        const user = await this.personService.findOne(email);
        if (!user) {
            throw new BadRequestException('User not found!')
        }
        const passwordIsMatch = await argon2.verify(user.password, password);

        if (user && passwordIsMatch) {
            return user;
        }

        throw new BadRequestException('User or password are incorrect!')
    }


    async login(user: IPersonInfoDto) {
        const { id, email, firstName, lastName, age } = user;
        return {
            id,
            email,
            firstName,
            lastName,
            age,
            token: this.jwtService.sign({email: email, firstName: firstName, lastName: lastName}),
        };
    }
}
