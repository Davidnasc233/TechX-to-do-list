import express from 'express';
import cors from 'cors';
import taskRoutes from './routes/task.routes';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/', taskRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
