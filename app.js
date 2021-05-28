
import express from 'express';
import taskGET  from './api/tasks.get.js';
import  taskDELETE  from './api/task.delete.js';
import  taskPATCH  from './api/task.patch.js';
import taskPOST  from './api/task.post.js';
import morgan  from 'morgan';


const app = express();


const PORT = 3000;
app.use(express.json())


export class ErrorHandler extends Error {
    constructor(statusCode, message) {
      super();
      this.statusCode = statusCode;
      this.message = message;
    }
  };
  const handleError = (err, res) => {
    const { statusCode, message } = err;
    res.status(statusCode).json({
      status: "error",
      statusCode,
      message
    });
  };


app.use(morgan('combined'));
app.use(taskGET);
app.use(taskPOST);
app.use(taskPATCH);
app.use(taskDELETE);
app.use((error, req, res, next) => {
    handleError(error, res);
  })



app.listen(PORT);