import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

class Authentication {
  async hasAuthorization(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const bearerHeader = req.headers.authorization;

      if (!bearerHeader) {
        res.status(403).json({ auth: false, message: 'Nenhum token fornecido.' });
        return;
      }

      const bearer = bearerHeader.split(' ')[1];

      jwt.verify(bearer, process.env.TOKEN!, (err, decoded) => {
        if (err) {
          res.status(401).json({
            auth: false,
            message: 'Failed to authenticate token.',
            error: err,
          });
          return;
        }

        req.params.token = bearer;
        next();
      });
    } catch (error) {
      res.status(500).json({ message: 'Erro interno no servidor.', error });
    }
  }
}

export default new Authentication();
