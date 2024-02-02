import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import productRoutes from './routes/productRoute.js';
dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

app.use(productRoutes)

app.listen(process.env.PORT, () => {
    console.log("Server is running on port", process.env.PORT);
});