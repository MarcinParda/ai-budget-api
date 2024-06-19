import { Request, Response } from 'express';
import { errorHandler } from '../../utils/errors/errorHandler';
import * as userService from './user.service';

export async function getUsers(req: Request, res: Response) {
  try {
    const users = await userService.getAllUsers();
    res.json(users);
  } catch (err) {
    errorHandler(err, req, res);
  }
}

export async function getUserById(req: Request, res: Response) {
  try {
    const user = await userService.getUserById(req.params.id);
    res.json(user);
  } catch (err) {
    errorHandler(err, req, res);
  }
}
