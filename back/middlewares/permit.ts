import { NextFunction, Request, Response } from 'express';
import { IRequestWithUser } from './auth';

const permit = (...roles: string[]) => {
  return (expressReq: Request, res: Response, next: NextFunction) => {
    const req = expressReq as IRequestWithUser;

    if (!req.user) {
      return res.status(401).send({ message: 'Unauthenticated' });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).send({ message: 'Permission denied' });
    }

    next();
  };
};

export default permit;
