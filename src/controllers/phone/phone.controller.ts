import { Body, Controller, Get, Post, Delete, Param, ParseIntPipe, BadRequestException} from "@nestjs/common";
import { PhoneService } from "../../services/phone.service";
import { IPhoneDto } from "../../dto/phone.dto";
import { Phone } from "../../entities/phone.entity";

@Controller("phone")
export class PhoneController {
	constructor(
		private readonly _phonService: PhoneService,
	) {}

	@Get()
	public async getAll(): Promise<IPhoneDto[]> {
		const items = await this._phonService.getAll();
		return items;
	}

	@Post()
	public async create(@Body() model: IPhoneDto) {
		const createDtoModel = this.createDtoModel(model)
		const item = await this._phonService.create(await createDtoModel);
		return item;
	}

	@Delete(":id")
	public async delete(@Param("id", ParseIntPipe) id: number): Promise<void> {
		const item = await this._phonService.findOneByOptions({where: {id}})
		if (!item) {
			throw new BadRequestException('This phone was not found')
		}
		await this._phonService.removeByEntity(item)
	}

	private async createDtoModel(model: Phone): Promise<IPhoneDto> {
		return {
			id: model.id,
			img: model.img,
			name: model.name,
			memory: model.memory,
			color: model.color,
			price: model.price,
			createdDate: new Date(),
		};
	}
}
