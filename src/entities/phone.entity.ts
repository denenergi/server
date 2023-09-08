import { Column, Entity } from "typeorm";
import { BaseCreatedUpdated } from "./base/base-created-updated.entity";

@Entity()
export class Phone extends BaseCreatedUpdated {
	@Column({ nullable: false, type: "character varying" })
	img: string;

	@Column({ nullable: false, length: 200, type: "character varying" })
	name: string;

	@Column({ nullable: false })
	memory: number;

	@Column({ nullable: false, length: 50, type: "character varying" })
	color: string;

	@Column({ nullable: false })
	price: number;
}

