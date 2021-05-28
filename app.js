
import express from 'express';
import taskGET  from './api/tasks.get.js';
import  taskDELETE  from './api/task.delete.js';
import  taskPATCH  from './api/task.patch.js';
import taskPOST  from './api/task.post.js';
import morgan  from 'morgan';


const app = express();


const PORT = 3000;
app.use(express.json())




const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
    res.status(500);
    res.render('error', { error: err });
};



app.post('/test/', async (req, res, next) => {
    return next(new Error("hellor"));
});


app.use(morgan('combined'));
app.use(taskGET);
app.use(taskPOST);
app.use(taskPATCH);
app.use(taskDELETE);
app.use(errorHandler);



app.listen(PORT);