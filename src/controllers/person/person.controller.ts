import * as argon2 from "argon2";
import { Body, Controller, Post, Get, Req, ParseIntPipe, Param, BadRequestException } from "@nestjs/common";
import { PersonService } from "../../services/person.service";
import { IPersonDto } from "../../dto/person.dto";
import { Person } from "../../entities/person.entity";
import { JwtService } from "@nestjs/jwt";

@Controller("person")
export class PersonController {
	constructor(
		private readonly _personService: PersonService,
		private readonly jwtService: JwtService
	) {}

	@Get()
	public async getAll(): Promise<IPersonDto[]> {
		const items = await this._personService.getAll();
		return items;
	}

	
	@Get(":id")
	public async getById(@Param("id", ParseIntPipe) id: number): Promise<IPersonDto> {
		const item = await this._personService.findOneByOptions({
			where: {id: id}
		});
		if (!item) {
			throw new Error(`Not found by id: ${id}`);
		}
		const dtoModel = this.createDtoModel(item);
		return dtoModel;
	}

	@Post()
	public async create(@Body() model: IPersonDto) {
		const isExist = await this._personService.findOneByOptions({
			where: {email: model.email}
		});
		if(isExist) {
			throw new BadRequestException('This email already exist!')
		}
		if(model.password.length < 6) {
			throw new BadRequestException('Password must be mor then 6 symbols!')
		}
		const createDtoModel = this.createDtoModel(model)
		const item = await this._personService.create(await createDtoModel);
		const token =  this.jwtService.sign({email: model.email, firstName: model.firstName, lastName: model.lastName})
		return {item, token};
	}

	private async createDtoModel(model: Person): Promise<IPersonDto> {
		return {
			id: model.id,
			firstName: model.firstName,
			lastName: model.lastName,
			age: model.age,
			email: model.email,
			password: await argon2.hash(model.password),
			createdDate: new Date(),
		};
	}
}
