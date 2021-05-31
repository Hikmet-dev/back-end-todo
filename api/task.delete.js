import { Router } from 'express';
import fs from 'fs';
import path from 'path';
import { param, validationResult } from 'express-validator';
import { ErrorHandler } from '../errors.js';


const router = Router();
const __dirname = path.resolve()


router.delete('/task/:idParam', 
            param('idParam').isUUID(), 
            (req, res) => {
        
                    const idParam = req.params.idParam;

                    const errors = validationResult(req);
                    if(!errors.isEmpty()) {
                        throw new ErrorHandler(422, 'Invalid fields in request', errors.array());
                    };
    
                    fs.readFile(__dirname + '/tasks.json', 'utf-8', (err, data) => {
                        if (err) {
                            console.log(err);
                        };
    
                        const taskList = JSON.parse(data.toString());
    
                        const taskIndex =  taskList.findIndex(item => item.id === idParam);
                        if(taskIndex === -1) { 
                            throw new ErrorHandler(400, "Task not found") 
                        }; 
    
                        const newTaskList = taskList.filter((item, index) => index !== taskIndex);
                        
                        fs.writeFile(__dirname + '/tasks.json', JSON.stringify(newTaskList, null, 2), (err) => {
                            if(err)  {
                                console.log(err);
                            };
                            return res.sendStatus(200);
                        })
                    });
                });


export default router;