import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';
import cors from 'cors';

import routes from './routes';
import './database';
import AppError from './errors/AppError';
import UploadConfig from './config/upload';

const app = express();

app.use(cors()); //habilitando o cross-platform
app.use('/files', express.static(UploadConfig.directory));
app.use(express.json());
app.use(routes);

/***
|> Middleware de tratativa de erros tem 4 parametros e deve ser alocado abaixo das rotas para capturar os erros que serao gerados por elas
|> Rotas com funções assincronas o express não consegue captar o erro e retornar para o middleware sendo necessária a adição da lib
express-async-errors
***/

app.use((err: Error, request: Request, response: Response, next: NextFunction) => {

    //Verifica se o erro retornado pela rota é do tipo AppError, caso seja retorna o status mensagem
    if( err instanceof AppError){
        return response.status(err.statusCode).json({
            status: 'error',
            message: err.message
        });
    }

    //caso contrário, exibe o erro no log para debug
    console.log(err);

    //Retorna mensagem padrão de erro interno (erro que não é esperado/mapeado)
    return response.status(500).json({
        status: 'error',
        message:'Internal server error',
    });

});

app.listen(3333, () => {
    console.log("App running on port 3333")
});
