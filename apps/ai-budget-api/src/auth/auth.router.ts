import { prisma } from '@ai-budget-api/prisma';
import express from 'express';
import bcrypt from 'bcrypt';
import { errorHandler } from '../utils/errors/errorHandler';
import * as authController from './auth.controller';

export const authRouter = express.Router();

authRouter.post('/register', authController.register);
authRouter.post('/refresh-token', authController.register);


// authRouter.post('/', (req, res, next) => {
//   passport.authenticate(
//     'local',
//     { session: false },
//     (err: unknown, user: User) => {
//       if (err) {
//         errorHandler(err, req, res);
//       }

//       if (!user) {
//         const error = new CustomError('Invalid email or password', 400);
//         errorHandler(error, req, res);
//       }

//       req.login(user, { session: false }, async (err) => {
//         if (err) {
//           errorHandler(err, req, res);
//         }

//         const accessToken = jwt.sign(
//           { userId: user.id },
//           process.env.ACCESS_TOKEN_SECRET,
//           {
//             expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN,
//           }
//         );
//         const refreshToken = jwt.sign(
//           { userId: user.id },
//           process.env.REFRESH_TOKEN_SECRET,
//           {
//             expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN,
//           }
//         );

//         await prisma.refreshToken.create({
//           data: {
//             userId: user.id,
//             refreshToken,
//             expiresAt: new Date(
//               Date.now() + Number(process.env.REFRESH_TOKEN_EXPIRES_IN_MS)
//             ),
//           },
//         });

//         return res.json({ accessToken, refreshToken });
//       });
//     }
//   )(req, res, next);
// });
