import { Request, Response } from 'express';
import connectDB from './config/db';
import app from './app';

connectDB();

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World');
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
