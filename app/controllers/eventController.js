import app from "../index.js";

export async function getEvents (req, res) {
    try {
        const events = await app.knex('communityEvents')
            .select('*');

        if (!events) res.status(404).json({ error: 'Not found.' });

        return res.status(200).json(events);
    } catch (error) {
        console.log(error);

        return res.status(500).json({ error: 'Internal server error.' });
    }
}
