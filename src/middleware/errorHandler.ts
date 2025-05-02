import { Response } from "express";

export default async function (res: Response, error: any) {
    console.error(error);

    res.status(500).json({ error: 'Internal server error.' });
}
