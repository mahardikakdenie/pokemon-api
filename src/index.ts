import express, { Application } from 'express';
import dotenv from 'dotenv';
import routes from './routes/route';

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 3000;
app.use('/v1/pokemons', routes)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})
