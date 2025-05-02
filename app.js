import express from 'express';

const app = express();
const PORT = 3000;

app.use(express.json());

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

app.get('/api/welcome', (req, res) => res.json({ message: 'Hello world!' }));
