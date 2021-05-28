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

    const { filterBy, order, taskCount = 100, page = 1}  = req.query;

    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        console.log(errors.array());
    };

    fs.readFile(__dirname + '/tasks.json','utf-8', (err, data) => {
        if (err) {
            throw err.message;
        }

        const tasks = JSON.parse(data);

        const filterTasksList = tasks.filter(item => filterBy ? item.done.toString() === filterBy : item);
        
        const pageCount = Math.ceil(filterTasksList.length / taskCount);
        const activePage = page <= pageCount ? page : pageCount;
        const sliceTasksList = filterTasksList.slice((activePage - 1) * taskCount, activePage * taskCount); 
        const sortTasksList = sliceTasksList.sort((a, b) => Date.parse((order === "asc" ? a : b).created_at) - Date.parse((order === "asc" ? b : a).created_at));    
        
        res.send({
            tasks: sortTasksList,
            pageCount
        });
    });
});


export default router;