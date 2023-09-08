export abstract class BaseDto<T = number> implements IBaseDto<T> {
	id: T;
}

export interface IBaseDto<T = number> {
	id: T;
}