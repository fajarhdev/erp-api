/* eslint-disable prettier/prettier */
import { NextFunction, Request, Response } from "express";
import { UpdateItemService } from "../services/update.service";
import { db } from "@src/database/database.js";

export const update = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const session = db.startSession();

		db.startTransaction();

		const updateItemService = new UpdateItemService(db);
		await updateItemService.handle(req.params.id, req.body, session);

		await db.commitTransaction();

		res.status(204).json();
	} catch (error) {
		await db.abortTransaction();
		next(error);
	} finally {
		await db.endSession();
	}
};
