import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { BaseService } from "./base/base.service";
import { Person } from "../entities/person.entity";

export class PersonService extends BaseService<Person> {
	constructor(
		@InjectRepository(Person) repository: Repository<Person>
	) {
		super(repository);
	}

	async findOne(email: string): Promise<Person | undefined> {
		return this._repository.findOne({
			where: {
				email
			}
		});
	  }
}