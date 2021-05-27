
import express from 'express';

import router from './router.api.js';

const app = express();

import bodyParser from 'body-parser';
var jsonParser = bodyParser.json()



const PORT = 3005;

app.use('/api/v1/',jsonParser, router);

app.listen(PORT);