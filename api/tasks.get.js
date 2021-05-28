import { Router } from 'express';
import { query, validationResult } from 'express-validator';

import fs from 'fs';
import path from 'path';

const router = Router();
const __dirname = path.resolve();




router.get('/tasks',
        query('filterBy').isBoolean().optional({checkFalsy: true}),
        query('order').isString().optional({checkFalsy: true}),
        query('page').isInt().optional({checkFalsy: true}),
        query('taskCount').isInt().optional({checkFalsy: true}),
         (req, res) => {

    const filterBy = req.query.filterBy;
    const order = req.query.order;
    const page = req.query.page;
    const taskCount = req.query.taskCount;

    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    };

       

    console.log((page - 1) * taskCount);
    console.log(page * taskCount);

    fs.readFile(__dirname + '/tasks.json','utf-8', (err, data) => {
        if (err) {
            console.log(err);
        }

        const tasks = JSON.parse(data);

        if([filterBy, order, page, taskCount].every(item => item === '' )){
           return res.send(tasks);
        }

        const filterTasks = tasks.filter(item =>  filterBy ? item.done.toString() === filterBy : item);
        const pageCount = Math.ceil(filterTasks.length / taskCount);
        const activePage = page <= pageCount ? page : pageCount;
    
        const filterSlice = filterTasks.slice((activePage - 1) * taskCount || undefined, activePage * taskCount || undefined); 
        const sortTasks = filterSlice.sort((a, b) => order === 'asc' 
                                                                ? Date.parse(b.created_at) - Date.parse(a.created_at) 
                                                                : Date.parse(a.created_at) - Date.parse(b.created_at));
        
        res.send({
            tasks: sortTasks,
            pageCount
        });
    });
});


export default router;