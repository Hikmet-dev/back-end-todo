import { Router } from 'express';
import fs from 'fs';
import path from 'path';
import { body, param, validationResult } from 'express-validator';



const router = Router();
const __dirname = path.resolve();



router.patch('/task/:idParam/', 
            body('done').isBoolean(), 
            body('name').isString().isLength({min: 3}), 
            param('idParam').isUUID(), 
            (req, res) => {

    const idParam = req.params['idParam'];
    const body = req.body;



    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    };

    console.log(body);
    fs.readFile(__dirname + '/tasks.json', 'utf-8', (err, data) => {
            if (err) {
                console.log(err);
            }
    
            const taskList = JSON.parse(data.toString());
            const index = taskList.findIndex(item => item.id === idParam);
            const newObjs = {...taskList[index], ...body };
            taskList[index] = newObjs;

            

            fs.writeFile(__dirname + '/tasks.json', JSON.stringify(taskList, null, 2), (err) => {
                if(err)  {
                    console.log(err);
                }
                res.send(`patch: ${idParam}`);
            });
        });
})

export default router;