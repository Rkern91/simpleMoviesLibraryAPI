import {AppDataSource}     from '../data-source'
import {Usuarios}          from '../entities/Usuario'
import {Request, Response} from 'express'
import bcrypt              from 'bcryptjs'
import jwt                 from 'jsonwebtoken'

export const doLogin = async (req: Request, res: Response) => {
  const {ds_username, ds_password} = req.body;

  if (!ds_username || !ds_password)
  {
    res.status(400).json({error: 'Username e Password sao obrigatorios'});
    return;
  }

  try
  {
    const usuario = await AppDataSource.getRepository(Usuarios).findOneBy({ds_username: ds_username});

    if (!usuario)
    {
      res.status(404).json({error: 'Usuario nao encontrado'})
      return;
    }

    const isPasswordValid = await bcrypt.compare(ds_password, usuario.ds_password)

    if (!isPasswordValid)
    {
      res.status(400).json({error: 'Credenciais invalidas'})
      return;
    }

    const token = jwt.sign({ds_username: ds_username}, process.env.TOKEN, {expiresIn: '30m'});

    res.status(200).json({auth: true, token: token}).send();
  }
  catch (error)
  {
    res.status(500).json({error: error});
    return;
  }
}