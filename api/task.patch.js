import { Router } from 'express';
import fs from 'fs';
import path from 'path';
import { body, validationResult } from 'express-validator';



const router = Router();
const __dirname = path.resolve();



const bodyDone = body('done').isBoolean();
const bodyName = body('name').isString().isLength({min: 3});


router.patch('/task/:idParam/', bodyDone, bodyName, (req, res) => {
    let idParam = req.params['idParam'];
    let body = req.body;



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