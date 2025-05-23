import { Request, Response } from "express";

export default async function (error: any, req: Request, res: Response, next: any) {
    console.error(error);

    res.status(error.status || 500).json({ error: error.message });
}
