import { Inject } from "@nestjs/common/decorators";
import { DeepPartial, FindManyOptions, FindOneOptions, FindOptionsWhere, Repository } from "typeorm";
import { BaseModel } from "../../entities/base/base-model.entity";

export abstract class BaseService<Entity extends BaseModel> {
	constructor(
		protected readonly _repository: Repository<Entity>
	) {}

	public async getAll(): Promise<Entity[]> {
		const items = await this._repository.find();
		return items;
	}

	public async getById(id: number): Promise<Entity> {
		const item = await this._repository.findOneBy({ id: id } as FindOptionsWhere<Entity>);
		return item;
	}

	public async findByOptions(options: FindManyOptions<Entity>): Promise<Entity[]> {
		const items = await this._repository.find(options);
		return items;
	}

	public async findOneByOptions(options: FindOneOptions<Entity>): Promise<Entity> {
		const item = await this._repository.findOne(options);
		return item;
	}

	public async create(model: Entity): Promise<Entity> {
		model = await this._repository.save(model, { transaction: false });
		return model;
	}

	public async createMany(model: Entity[], transaction: boolean = true): Promise<Entity[]> {
		model = await this._repository.save(model, { transaction: transaction });
		return model;
	}

	public async removeByEntity(item: Entity): Promise<Entity> {
		const result = await this._repository.remove(item);
		return result;
	}

	public async removeById(id: number): Promise<Entity> {
		const result = await this._repository.remove({ id } as Entity);
		return result;
	}

	public async update(model: Entity): Promise<Entity> {
		return await this._repository.save(model, { transaction: false });
	}

	public async updateMany(model: Entity[], transaction: boolean = true): Promise<Entity[]> {
		model = await this._repository.save(model, { transaction: transaction });
		return model;
	}

	public exist(options: FindManyOptions<Entity>): Promise<boolean> {
		return this._repository.exist(options);
	}

	public merge(model: Entity, entityLikes: DeepPartial<Entity>): Entity {
		return this._repository.merge(model, entityLikes);
	}

	public createNewCreatedUpdated(user: string) {
		const date = new Date();
		return {
			createdDate: date,
			createdByUserId: user,
			updatedDate: date,
			updatedByUserId: user
		};
	}
}
