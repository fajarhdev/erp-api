/* eslint-disable prettier/prettier */
import { RoleEntity } from "../entities/role.entity.js";
import { RoleRepository } from "../repositories/role.repository.js";
import DatabaseConnection, { DocumentInterface } from "@src/database/connection.js";

export class UpdateRoleService {
	private db: DatabaseConnection;
	constructor(db: DatabaseConnection) {
		this.db = db;
	}
	public async handle(id: string, doc: DocumentInterface, session: unknown) {
		const roleEntity = new RoleEntity({
			name: doc.name,
			permissions: doc.permissions,
		});

		const roleRepository = new RoleRepository(this.db);
		return await roleRepository.update(id, roleEntity.role, { session });
	}
}
