process.env.NODE_ENV = process.env.NODE_ENV || 'development';
process.env.APP_ENV = process.env.APP_ENV || 'development';

// Env files
import dotenv = require('dotenv');

dotenv.config({
    path: `${__dirname}/../config/${process.env.APP_ENV}.env`
});

import express = require('express');
import { loadControllers } from 'awilix-express';
import loadContainer from './container';
import jwt from 'express-jwt';


const app: express.Application = express();

//json support

app.use(express.json());
//container
loadContainer(app);

    app.use(jwt({
        secret: 'asdaksjdkwajdklJDLKASJDALKSDJLsdawd45',
        algorithms: ['HS256']
    }));



app.use(loadControllers(
    'controllers/*.ts',
    { cwd: __dirname }
));



export { app };