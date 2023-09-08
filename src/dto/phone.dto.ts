import { IBaseDto } from "./base/base-dto";

export interface IPhoneDto extends IBaseDto {
	img: string;
	name: string;
	memory: number;
	color: string;
	price: number;
	createdDate: Date;
}
