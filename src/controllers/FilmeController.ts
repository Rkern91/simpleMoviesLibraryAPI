import { Request, Response } from 'express';
import { AppDataSource }     from '../data-source';
import { Filmes }            from '../entities/Filme';
import * as Helpers          from './Helpers';
import dotenv                from 'dotenv';
import {Categorias} from "../entities/Categoria";

dotenv.config();

export const createFilme = async (request: Request, response: Response): Promise<void> => {
  try
  {
    const objFilmeFields  = request.body;
    const FilmeRepository = await AppDataSource.getRepository(Filmes).findOneBy({
      ds_titulo: objFilmeFields.ds_titulo,
    });

    if (FilmeRepository)
    {
      response.status(409).json({ message: 'Filme já cadastrado' });
      return;
    }

    const categoria = await AppDataSource.getRepository(Categorias).findOneBy({
      cd_categoria: objFilmeFields.cd_categoria,
    });

    if (!categoria)
    {
      response.status(404).json({ message: 'Categoria não encontrada' });
      return;
    }

    const Filme = AppDataSource.getRepository(Filmes).create({
      ...objFilmeFields,
      categoria
    });

    const FilmeNew = await AppDataSource.getRepository(Filmes).save(Filme);

    if (!FilmeNew) {
      response.status(400).json({ message: 'Filme não foi cadastrado', details: FilmeNew });
      return;
    }

    response.status(201).json(FilmeNew);
  }
  catch (error)
  {
    response.status(500).json({
      error: 'Erro Interno do Servidor',
      message: 'Ocorreu um erro inesperado. Por favor, tente novamente mais tarde.',
      details: error,
    });
  }
};

export const getFilme = async (request: Request, response: Response): Promise<void> => {
  try
  {
    const cd_filme: number = +request.params.cd_filme;
    const objFilme         = await AppDataSource.getRepository(Filmes).findOne({
      where: {cd_filme: cd_filme},
      relations: ['categoria']
    });

    if (objFilme == null)
    {
      response.status(404).json({ message: 'Filme nao encontrado' });
      return;
    }

    response.status(200).json(objFilme);
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

export const getFilmes = async (request: Request, response: Response): Promise<void> => {
  try
  {
    const listFilmes: Filmes[] = await AppDataSource.getRepository(Filmes).find({
      relations: ['categoria']
    });

    if (listFilmes.length <= 0)
    {
      response.status(404).json({ message: 'Nenhum Filme cadastrado' });
      return;
    }

    response.status(200).json(listFilmes);
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

export const getFilmeByCategoria = async (request: Request, response: Response): Promise<void> => {
  try {
    const cd_categoria: number = +request.params.cd_categoria;

    const filmes = await AppDataSource.getRepository(Filmes).find({
      where: {
        categoria: { cd_categoria },
      },
      relations: ["categoria"],
    });

    if (filmes.length === 0) {
      response.status(404).json({ message: "Nenhum filme encontrado para a categoria informada" });
      return;
    }

    response.status(200).json(filmes);
  } catch (error) {
    response.status(500).json({
      error: "Erro Interno do Servidor",
      message: "Ocorreu um erro inesperado. Por favor, tente novamente mais tarde.",
      details: error,
    });
  }
};

export const updateFilme = async (request: Request, response: Response): Promise<void> => {
  try
  {
    const cd_filme: number = +request.params.cd_filme;
    const objFilmeFields   = await Helpers.removeObjKey(request.body, 'cd_filme');
    const objFilme         = await AppDataSource.getRepository(Filmes).findOneBy({ cd_filme });

    if (!objFilme)
    {
      response.status(404).json({ message: 'Filme não encontrado' });
      return;
    }

    if (objFilmeFields['cd_categoria'])
    {
      const novaCategoria = await AppDataSource.getRepository(Categorias).findOneBy({
        cd_categoria: objFilmeFields['cd_categoria'],
      });

      if (!novaCategoria) {
        response.status(404).json({ message: 'Categoria fornecida não encontrada' });
        return;
      }

      objFilme.categoria = novaCategoria;
      delete objFilmeFields['cd_categoria'];
    }

    AppDataSource.getRepository(Filmes).merge(objFilme, objFilmeFields);
    const results = await AppDataSource.getRepository(Filmes).save(objFilme);

    response.status(200).json({ message: 'Filme atualizado', details: results });
  }
  catch (error)
  {
    response.status(500).json({
      error: 'Erro Interno do Servidor',
      message: 'Ocorreu um erro inesperado. Por favor, tente novamente mais tarde.',
      details: error,
    });
  }
};

export const deleteFilme = async (request: Request, response: Response): Promise<void> => {
  try
  {
    const cd_filme: number = +request.params.cd_filme;

    await AppDataSource.getRepository(Filmes).delete({ cd_filme: cd_filme });
    response.status(200).json({ message: 'Filme excluido' });
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