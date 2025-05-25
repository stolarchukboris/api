import { Request, Response } from "express";

export default function (req: Request, res: Response) {
    res.status(200).sendFile(req.params.name, { root: 'static' });
}
