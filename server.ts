import express         from 'express';
import {AppDataSource} from './src/data-source';
import cors            from 'cors';

// IMPORTS DE ROTAS
import RouterLogin      from './src/routes/LoginRoute';
import RouterUsuario    from "./src/routes/UsuariosRoutes";
import RouterCategorias from "./src/routes/CategoriasRoutes";
import RouterFilmes     from "./src/routes/FilmesRoutes";

// CONFIGURAÇÕES
AppDataSource.initialize().then(function (){
  console.log('Banco de dados inicializado!');
}).catch(function (error){
  console.log('Erro na inicialização do banco de dados: ', error);
});

const app  = express();
const port = 3001;

app.use(express.json());
app.use(cors());

// ROTAS
app.use('/api', RouterLogin);
app.use('/api', RouterUsuario);
app.use('/api', RouterCategorias);
app.use('/api', RouterFilmes);

// START
app.listen(port, () =>{
  console.log(`[SERVER]: Server rodando em http://localhost:${port}`);
});