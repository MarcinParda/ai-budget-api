import express from 'express';
import * as path from 'path';
import { usersRouter } from './routes/users';
import passport from './config/passport';
import { jwtAuth } from './middlewares/jwtAuth';
import { registerRouter } from './routes/register';
import { loginRouter } from './routes/login';
import { refreshTokenRouter } from './routes/refresh-token';

const app = express();

app.use(express.json());
app.use(passport.initialize());

app.use('/assets', express.static(path.join(__dirname, 'assets')));

app.get('/api', (req, res) => {
  res.send({ message: 'OK' });
});
app.use('/api/users', usersRouter);
app.use('/api/register', registerRouter);
app.use('/api/login', loginRouter);
app.use('/api/refresh-token', refreshTokenRouter);
app.get('/api/protected', jwtAuth, (req, res) => {
  res.json({ message: 'This is a protected route' });
});

const port = process.env.PORT || 8000;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);
