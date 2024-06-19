import { Request, Response } from 'express';
import { errorHandler } from '../utils/errors/errorHandler';
import * as userService from '../user/user.service';
import * as authService from './auth.service';
import CustomError from '../utils/errors/customError';

// export const authController = express.Router();

export async function register(req: Request, res: Response) {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      throw new CustomError('All fields are required', 400);
    }

    await userService.register(username, email, password);

    res.status(201).json({ message: 'User registered successfully' });
  } catch (err: unknown) {
    errorHandler(err, req, res);
  }
}

export async function refreshToken(req: Request, res: Response) {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) {
      throw new CustomError('Refresh token is required', 401);
    }

    const accessToken = await authService.refreshToken(refreshToken);

    return res.json({ accessToken });
  } catch (err) {
    errorHandler(err, req, res);
  }
};

// loginRouter.post('/', (req, res, next) => {
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
