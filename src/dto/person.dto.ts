import { IBaseDto } from "./base/base-dto";

export interface IPersonDto extends IBaseDto {
	firstName: string;
	lastName: string;
	age: number;
	email: string;
	password: string
	createdDate: Date;
}


export interface IPersonInfoDto extends IBaseDto {
	firstName: string;
	lastName: string;
	age: number;
	email: string;
}
