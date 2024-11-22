import * as express                                                                       from 'express';
import { createCategoria, deleteCategoria, getCategoria, getCategorias, updateCategoria } from '../controllers/CategoriaController';
import Auth                                                                               from '../controllers/AuthController';

const RouterCategoria = express.Router();

RouterCategoria.post('/categoria',                 Auth.hasAuthorization, createCategoria);
RouterCategoria.get('/categoria/:cd_categoria',    Auth.hasAuthorization, getCategoria);
RouterCategoria.get('/categoria',                  Auth.hasAuthorization, getCategorias);
RouterCategoria.put('/categoria/:cd_categoria',    Auth.hasAuthorization, updateCategoria);
RouterCategoria.delete('/categoria/:cd_categoria', Auth.hasAuthorization, deleteCategoria);

export default RouterCategoria;