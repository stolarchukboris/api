import app from "../index.js";
import { Request, Response } from "express";

export async function getEvents(req: Request, res: Response) {
    const events = await app.database('communityEvents')
        .select('*');

    if (events.length === 0) {
        res.status(404).json({ error: 'Not found.' });
        return;
    }

    res.status(200).json(events);
}
