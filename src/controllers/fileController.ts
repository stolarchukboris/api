import { Request, Response } from "express";
import fs from 'fs';

export default async function (req: Request, res: Response) {
    res.status(200).sendFile(req.params.name, { root: 'static' });
}
