import { Request, Response } from 'express';
import { AppDataSource }     from '../data-source';
import { Usuarios }          from '../entities/Usuario';
import * as Helpers          from './Helpers';
import dotenv                from 'dotenv';

dotenv.config();

export const createUsuario = async (request: Request, response: Response): Promise<void> => {
  try
  {
    const objUsuarioFields   = request.body;
    const usuarioRepository  = await AppDataSource.getRepository(Usuarios).findOneBy({ ds_username: objUsuarioFields.ds_username });

    if (usuarioRepository != null)
    {
      response.status(409).json({ message: 'Usuario ja cadastrado' });
      return;
    }

    const usuario:    Usuarios[] = AppDataSource.getRepository(Usuarios).create({ ...objUsuarioFields});
    const UsuarioNew: Usuarios[] = await AppDataSource.getRepository(Usuarios).save(usuario);

    if (UsuarioNew == null)
    {
      response.status(404).json({ message: 'Usuario nao cadastrado', details: UsuarioNew });
      return;
    }

    response.status(201).json(UsuarioNew);
  }
  catch (error)
  {
    response.status(500).json({
      error: 'Erro Interno do Servidor',
      message: 'Ocorreu um erro inesperado. Por favor, tente novamente mais tarde.',
      details: error
    });
  }
};

export const getUsuario = async (request: Request, response: Response): Promise<void> => {
  try
  {
    const cd_usuario: number = +request.params.cd_usuario;
    const objUsuario         = await AppDataSource.getRepository(Usuarios).findOneBy({ cd_usuario: cd_usuario });

    if (objUsuario == null)
    {
      response.status(404).json({ message: 'Usuario nao encontrado' });
      return;
    }

    const objUsuarioAtualizado = await Helpers.removeObjKey(objUsuario, 'ds_password');

    console.log('objeto alterado: ' + objUsuarioAtualizado);
    response.status(200).json(objUsuarioAtualizado);
  }
  catch (error)
  {
    response.status(500).json({
      error: 'Erro Interno do Servidor',
      message: 'Ocorreu um erro inesperado. Por favor, tente novamente mais tarde.',
      details: error
    });
  }
};

export const getUsuarios = async (request: Request, response: Response): Promise<void> => {
  try
  {
    const listUsuarios: Usuarios[] = await AppDataSource.getRepository(Usuarios).find();

    if (listUsuarios.length <= 0)
    {
      response.status(404).json({ message: 'Nenhum usuario cadastrado' });
      return;
    }

    response.status(200).json(listUsuarios);
  }
  catch (error)
  {
    response.status(500).json({
      error: 'Erro Interno do Servidor',
      message: 'Ocorreu um erro inesperado. Por favor, tente novamente mais tarde.',
      details: error
    });
  }
};

export const updateUsuario = async (request: Request, response: Response): Promise<void> => {
  try
  {
    const cd_usuario: number   = +request.params.cd_usuario;
    const objUsuarioFields     = await Helpers.removeObjKey(request.body, 'cd_usuario');
    const objUsuario: Usuarios = await AppDataSource.getRepository(Usuarios).findOneBy({ cd_usuario: cd_usuario });

    if (objUsuario == null)
    {
      response.status(404).json({ message: 'Usuario nao encontrado' });
      return;
    }

    AppDataSource.getRepository(Usuarios).merge(objUsuario, objUsuarioFields);
    const results: Usuarios = await AppDataSource.getRepository(Usuarios).save(objUsuario);
    response.status(200).json({ message: 'Usuario atualizado', details: results });
  }
  catch (error)
  {
    response.status(500).json({
      error: 'Erro Interno do Servidor',
      message: 'Ocorreu um erro inesperado. Por favor, tente novamente mais tarde.',
      details: error
    });
  }
};

export const deleteUsuario = async (request: Request, response: Response): Promise<void> => {
  try
  {
    const cd_usuario: number = +request.params.cd_usuario;

    await AppDataSource.getRepository(Usuarios).delete({ cd_usuario: cd_usuario });
    response.status(200).json({ message: 'Usuario excluido' });
  }
  catch (error)
  {
    response.status(500).json({
      error: 'Erro Interno do Servidor',
      message: 'Ocorreu um erro inesperado. Por favor, tente novamente mais tarde.',
      details: error
    });
  }
};