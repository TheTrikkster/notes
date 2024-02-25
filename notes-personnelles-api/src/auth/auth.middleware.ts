import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import fetch from 'node-fetch';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    const sessionCookie = req.headers.cookie;

    if (!sessionCookie) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const sessionUrl = `http://localhost:3000/api/auth/session`;

    const sessionResponse = await fetch(sessionUrl, {
      headers: {
        Cookie: sessionCookie,
      },
    });

    const sessionData = await sessionResponse.json();
    if (!sessionResponse.ok || !sessionData?.user?.email) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    (req as any).user = sessionData.user;
    next();
  }
}
