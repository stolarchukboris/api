import app from "../index.ts";
import type { Request, Response } from "express";

export default async function (req: Request, res: Response) {
    const events = await app.database('communityEvents').select('*');

    if (events.length === 0) return res.status(404).json({ error: 'Not found.' });

    res.status(200).json(events);
}
