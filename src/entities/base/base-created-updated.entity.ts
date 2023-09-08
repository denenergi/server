import { Column } from "typeorm";
import { BaseModel } from "./base-model.entity";

export abstract class BaseCreatedUpdated extends BaseModel {
	@Column({ nullable: false, type: "timestamptz" })
	createdDate: Date;
}
