import * as express                                                             from 'express';
import { createUsuario, deleteUsuario, getUsuario, getUsuarios, updateUsuario } from '../controllers/UsuarioController';
import Auth                                                                     from '../controllers/AuthController';

const RouterUsuario = express.Router();

RouterUsuario.post('/usuario',               createUsuario);
RouterUsuario.get('/usuario/:cd_usuario',    Auth.hasAuthorization, getUsuario);
RouterUsuario.get('/usuario',                Auth.hasAuthorization, getUsuarios);
RouterUsuario.put('/usuario/:cd_usuario',    Auth.hasAuthorization, updateUsuario);
RouterUsuario.delete('/usuario/:cd_usuario', Auth.hasAuthorization, deleteUsuario);

export default RouterUsuario;