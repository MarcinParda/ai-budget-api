import { prisma } from '@ai-budget-api/prisma';
import express from 'express';
import bcrypt from 'bcrypt';
import { errorHandler } from '../utils/errors/errorHandler';
import * as authController from './auth.controller';

export const authRouter = express.Router();

authRouter.post('/register', authController.register);

// const isValidDecodedToken = (
//   decoded: unknown
// ): decoded is { userId: string } => {
//   return typeof decoded === 'object' && decoded !== null && 'userId' in decoded;
// };

// authRouter.post('/', async (req, res) => {
//   try {
//     const { refreshToken } = req.body;

//     if (!refreshToken) {
//       throw new CustomError('Refresh token is required', 401);
//     }

//     const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
//     if (!isValidDecodedToken(decoded)) {
//       throw new CustomError('Invalid refresh token', 401);
//     }

//     const storedRefreshToken = await prisma.refreshToken.findUnique({
//       where: { refreshToken },
//     });
//     if (!storedRefreshToken || storedRefreshToken.expiresAt < new Date()) {
//       throw new CustomError('Refresh token is invalid or expired', 401);
//     }

//     const user = await prisma.user.findUnique({
//       where: { id: decoded.userId },
//     });

//     const accessToken = jwt.sign(
//       { userId: user.id },
//       process.env.ACCESS_TOKEN_SECRET,
//       { expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN }
//     );

//     return res.json({ accessToken });
//   } catch (err) {
//     errorHandler(err, req, res);
//   }
// });

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
