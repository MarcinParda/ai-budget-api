import express, { NextFunction, Request, Response } from 'express';
import * as path from 'path';
import passport from './domains/auth/passport';
import { authRouter } from './domains/auth/auth.router';
import { jwtAuthMiddleware } from './domains/auth/jwt-auth.middleware';
import { usersRouter } from './domains/user/user.router';
import { handleError } from './utils/errors/handleError';

const app = express();

app.use(express.json());
app.use(passport.initialize());

app.use('/assets', express.static(path.join(__dirname, 'assets')));

app.get('/api', (req, res) => {
  res.send({ message: 'OK' });
});
app.use('/api/auth', authRouter);
app.use('/api/users', usersRouter);
app.get('/api/protected', jwtAuthMiddleware, (req, res) => {
  res.json({ message: 'This is a protected route' });
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err) {
    handleError(err, req, res);
  }
});

app.use((req: Request, res: Response) => {
  res.status(404).json({ message: 'Not Found' });
});

const port = process.env.PORT || 8000;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);
