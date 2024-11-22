import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

class Authentication {
  async hasAuthorization(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const bearerHeader = req.headers.authorization;

      if (!bearerHeader) {
        res.status(403).json({ auth: false, message: 'Nenhum token fornecido.' });
        return; // Garante que não continua a execução após enviar a resposta
      }

      const bearer = bearerHeader.split(' ')[1];

      jwt.verify(bearer, process.env.TOKEN!, (err, decoded) => {
        if (err) {
          res.status(401).json({
            auth: false,
            message: 'Failed to authenticate token.',
            error: err,
          });
          return; // Finaliza o fluxo em caso de erro
        }

        req.params.token = bearer; // Adiciona o token aos parâmetros
        next(); // Continua a cadeia de middlewares
      });
    } catch (error) {
      res.status(500).json({ message: 'Erro interno no servidor.', error });
    }
  }
}

export default new Authentication();
