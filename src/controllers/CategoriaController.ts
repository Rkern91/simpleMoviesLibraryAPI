import { Request, Response } from 'express';
import { AppDataSource }     from '../data-source';
import { Categorias }        from '../entities/Categoria';
import * as Helpers          from './Helpers';
import dotenv                from 'dotenv';

dotenv.config();

export const createCategoria = async (request: Request, response: Response): Promise<void> => {
  try
  {
    const objCategoriaFields   = request.body;
    const CategoriaRepository  = await AppDataSource.getRepository(Categorias).findOneBy({ nm_categoria: objCategoriaFields.nm_categoria });

    if (CategoriaRepository != null)
    {
      response.status(409).json({ message: 'Categoria ja cadastrada' });
      return; // Para garantir que a execução do código pare aqui
    }

    const Categoria:    Categorias[] = AppDataSource.getRepository(Categorias).create({ ...objCategoriaFields});
    const CategoriaNew: Categorias[] = await AppDataSource.getRepository(Categorias).save(Categoria);

    if (CategoriaNew == null)
    {
      response.status(404).json({ message: 'Categoria nao cadastrado', details: CategoriaNew });
      return;
    }

    response.status(201).json(CategoriaNew);
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

export const getCategoria = async (request: Request, response: Response): Promise<void> => {
  try
  {
    const cd_categoria: number = +request.params.cd_categoria;
    const objCategoria         = await AppDataSource.getRepository(Categorias).findOneBy({ cd_categoria: cd_categoria });

    if (objCategoria == null)
    {
      response.status(404).json({ message: 'Categoria nao encontrado' });
      return;
    }

    const objCategoriaAtualizado = await Helpers.removeObjKey(objCategoria, 'ds_password');
    response.status(200).json(objCategoriaAtualizado);
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

export const getCategorias = async (request: Request, response: Response): Promise<void> => {
  try
  {
    const listCategorias: Categorias[] = await AppDataSource.getRepository(Categorias).find();

    if (listCategorias.length <= 0)
    {
      response.status(404).json({ message: 'Nenhum Categoria cadastrado' });
      return;
    }

    response.status(200).json(listCategorias);
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

export const updateCategoria = async (request: Request, response: Response): Promise<void> => {
  try
  {
    const cd_categoria: number     = +request.params.cd_categoria;
    const objCategoriaFields       = await Helpers.removeObjKey(request.body, 'cd_categoria');
    const objCategoria: Categorias = await AppDataSource.getRepository(Categorias).findOneBy({ cd_categoria: cd_categoria });

    if (objCategoria == null)
    {
      response.status(404).json({ message: 'Categoria nao encontrado' });
      return;
    }

    AppDataSource.getRepository(Categorias).merge(objCategoria, objCategoriaFields);
    const results: Categorias = await AppDataSource.getRepository(Categorias).save(objCategoria);
    response.status(200).json({ message: 'Categoria atualizado', details: results });
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

export const deleteCategoria = async (request: Request, response: Response): Promise<void> => {
  try
  {
    const cd_categoria: number = +request.params.cd_categoria;

    await AppDataSource.getRepository(Categorias).delete({ cd_categoria: cd_categoria });
    response.status(200).json({ message: 'Categoria excluido' });
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