import * as express                                                   from 'express';
import { createFilme, deleteFilme, getFilme, getFilmes, getFilmeByCategoria, updateFilme } from '../controllers/FilmeController';
import Auth                                                           from '../controllers/AuthController';

const RouterFilme = express.Router();

RouterFilme.post('/filme',                        Auth.hasAuthorization, createFilme);
RouterFilme.get('/filme/:cd_filme',               Auth.hasAuthorization, getFilme);
RouterFilme.get('/filme',                         Auth.hasAuthorization, getFilmes);
RouterFilme.get('/filme/categoria/:cd_categoria', Auth.hasAuthorization, getFilmeByCategoria);
RouterFilme.put('/filme/:cd_filme',               Auth.hasAuthorization, updateFilme);
RouterFilme.delete('/filme/:cd_filme',            Auth.hasAuthorization, deleteFilme);

export default RouterFilme;