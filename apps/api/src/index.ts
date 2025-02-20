import app from './app';
import dotenv from 'dotenv';

dotenv.config();

const port = process.env.BACKEND_PORT || 4000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
