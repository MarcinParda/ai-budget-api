import express from 'express';
import passport from '../config/passport';
import jwt from 'jsonwebtoken';

export const loginRouter = express.Router();

loginRouter.post('/', (req, res, next) => {
  passport.authenticate('local', { session: false }, (err, user, info) => {
    if (err || !user) {
      return res.status(400).json({
        message: info ? info.message : 'Login failed',
        user: user,
      });
    }

    req.login(user, { session: false }, (err) => {
      if (err) {
        res.status(400).json({ message: 'Login failed', error: err });
      }

      const token = jwt.sign({ user }, process.env.JWT_SECRET, {
        expiresIn: '15m',
      });
      return res.json({ token });
    });
  })(req, res, next);
});
