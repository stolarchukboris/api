import type { Request, Response } from "express";

export default function (req: Request, res: Response) {
	if (!req.params.name) return res.status(400).end();

	res.status(200).sendFile(req.params.name as string, { root: 'static' });
}
