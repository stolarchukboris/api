import app from "../index.js";
import handleError from '../middleware/errorHandler.js';
import { Request, Response } from "express";

export async function getEvents(req: Request, res: Response) {
    try {
        const events = await app.database('communityEvents')
            .select('*');

        if (!events) {
            res.status(404).json({ error: 'Not found.' });
            return;
        }

        res.status(200).json(events);
    } catch (error) {
        handleError(res, error);
    }
}
