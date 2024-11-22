import express             from 'express'
import { doLogin } from '../controllers/LoginController';

const routerLogin = express.Router()

routerLogin.post('/login', doLogin)

export default routerLogin
