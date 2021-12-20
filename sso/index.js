import express from 'express';
import mongoose from 'mongoose'
import compression from 'compression'
import http from 'http'
import helmet from 'helmet'
import cors from 'cors'
import authRoute from './modules/auth/router/authRoute.js'

import swaggerDocument from './modules/docs/swagger.json'

import swaggerJsDoc from 'swagger-jsdoc'
import swaggerUi, { serve } from 'swagger-ui-express'

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json()) // enable the read of the body
app.use(compression()) //Compress all routes
app.use(helmet())
app.use(cors())
const server = http.createServer({}, app)
mongoose
    .connect(
        'mongodb://mongo:27017/user_sso_db',
        { useNewUrlParser: true }
    )
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));

app.use('/sso', authRoute);
const port = process.env.PORT || 3200;
app.use('/sso/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
server.listen(port, () => {

    console.log(`SSO app listening at http://localhost:${port}`);

})