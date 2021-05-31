
import express from 'express';
import taskGET  from './api/tasks.get.js';
import  taskDELETE  from './api/task.delete.js';
import  taskPATCH  from './api/task.patch.js';
import taskPOST  from './api/task.post.js';
import morgan  from 'morgan';
import { handleError } from './errors.js'


const app = express();


const PORT = process.env.PORT || 3000;
app.use(express.json())




app.use(morgan('combined'));
app.get('/', (req, res) => {
  res.send('<h1>Todo-back-end</h1>')
})
app.use(taskGET);
app.use(taskPOST);
app.use(taskPATCH);
app.use(taskDELETE);
app.use((err, req, res, next) => {
    handleError(err, res);
  })



app.listen(PORT);