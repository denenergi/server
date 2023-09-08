import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { BaseService } from "./base/base.service";
import { Person } from "../entities/person.entity";
import { Phone } from "../entities/phone.entity";

export class PhoneService extends BaseService<Phone> {
	constructor(
		@InjectRepository(Phone) repository: Repository<Phone>
	) {
		super(repository);
	}
}