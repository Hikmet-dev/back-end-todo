import { Router } from 'express';
import fs from 'fs';
import path from 'path';
import { param, validationResult } from 'express-validator';
import { ErrorHandler } from '../app.js'


const router = Router();
const __dirname = path.resolve()


router.delete('/task/:idParam', 
            param('idParam').isUUID(), 
            (req, res) => {

                const idParam = req.params.idParam;

                const errors = validationResult(req);
                if(!errors.isEmpty()) {
                    return res.status(400).json({errors: errors.array(), message: "Task not found"});
                };

                fs.readFile(__dirname + '/tasks.json', 'utf-8', async (err, data) => {
                    if (err) {
                        console.log(err);
                    }

                    const taskList = JSON.parse(data.toString());

                    const taskIndex =  taskList.findIndex(item => item.id === idParam);
                    if(taskIndex === -1) {
                        throw new ErrorHandler(403, 'Not found tasks');
                    };

                    const newTaskList = taskList.filter((item, index) => index !== taskIndex);
                    
                    fs.writeFile(__dirname + '/tasks.json', JSON.stringify(newTaskList, null, 2), (err) => {
                        if(err)  {
                            console.log(err);
                        }
                        res.send(`Delete: ${idParam}`)
                    })
                });


});


export default router;