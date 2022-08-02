import { CoreDocument } from "../types/model.type";

export class DTOBase {

	public readonly _id!: string;
	public readonly createdAt!: Date;
	public readonly updatedAt!: Date;

	constructor(dto: CoreDocument) {
		this._id = dto._id;
		this.createdAt = dto.createdAt;
		this.updatedAt = dto.updatedAt;
	}

};