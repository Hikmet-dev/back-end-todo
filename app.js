
import express from 'express';
import GET  from './api/tasks.get.js';
import  DELETE  from './api/task.delete.js';
import  PATCH  from './api/task.patch.js';
import POST  from './api/task.post.js';


const app = express();

import bodyParser from 'body-parser';
var jsonParser = bodyParser.json()



const PORT = 3000;





app.use(GET);
app.use(POST);
app.use(PATCH);
app.use(DELETE);




app.listen(PORT);