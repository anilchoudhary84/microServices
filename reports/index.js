import express from 'express';
import compression from 'compression'
import http from 'http'
import helmet from 'helmet'
import cors from 'cors'
import reportsRoute from './modules/reports/router/reportsRoute.js'
import ReportsController from "./modules/reports/controller/reports.controller.js";
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
app.use('/reports', reportsRoute);
const port = process.env.PORT || 3300;
app.use('/reports/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
server.listen(port, () => {
    console.log(`Reports app listening at http://localhost:${port}`);
    ReportsController.createParition();
    ReportsController.startConsumer();
})