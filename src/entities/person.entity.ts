import { Column, Entity } from "typeorm";
import { BaseCreatedUpdated } from "./base/base-created-updated.entity";

@Entity()
export class Person extends BaseCreatedUpdated {
	@Column({ nullable: false, length: 100, type: "character varying" })
	firstName: string;

	@Column({ nullable: false, length: 100, type: "character varying" })
	lastName: string;

	@Column({ nullable: false})
	age: number;

	@Column({ nullable: false, length: 50, type: "character varying", unique: true })
	email: string;

	@Column({ nullable: false, type: "character varying" })
	password: string;
}

