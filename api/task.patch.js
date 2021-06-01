import { Router } from 'express';
import fs from 'fs';
import path from 'path';
import { body, param, validationResult } from 'express-validator';
import { ErrorHandler } from '../errors.js';




const router = Router();
const __dirname = path.resolve();



router.patch('/task/:idParam/', 
            body('done').isBoolean(), 
            body('name').isString().isLength({min: 3}), 
            param('idParam').isUUID(), 
            (req, res, next) => {
try{
    const idParam = req.params['idParam'];
    const body = req.body;



    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        throw new ErrorHandler(422, 'Invalid fields in request', errors.array());
    };

    fs.readFile(__dirname + '/tasks.json', 'utf-8', (err, data) => {
        try{
            if (err) {
                console.log(err);
            }
    
            const taskList = JSON.parse(data.toString());
            const index = taskList.findIndex(item => item.id === idParam);

            if(index === -1) {
               throw new ErrorHandler(400, "Task not found")
            };
            const newObjs = {...taskList[index], ...body };
            taskList[index] = newObjs;

        } catch (error) {
            next(error);
        }
           
            fs.writeFile(__dirname + '/tasks.json', JSON.stringify(taskList, null, 2), (err) => {
                    if(err)  {
                        console.log(err);
                    }
                    return res.sendStatus(200)
            });
        });
    } catch (error) {
        next(error);
    };

});

export default router;