import dotenv from 'dotenv';
dotenv.config();

const PORT = process.env.PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET;
const REFRESH_JWT_SECRET = process.env.REFRESH_SECRET;
export { PORT, JWT_SECRET, REFRESH_JWT_SECRET };