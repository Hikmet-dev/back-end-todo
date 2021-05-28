import express, { Router } from 'express';
import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import bodyParser from 'body-parser';
import { body, validationResult } from 'express-validator';

const app = express();
const router = Router();
const urlencodedParser = bodyParser.urlencoded({extended: false});
const __dirname = path.resolve();



const bodyDone = body('done').isBoolean();
const bodyName = body('name').isString().isLength({min: 3});




router.post('/task', urlencodedParser, bodyDone, bodyName, (req, res) => {
    let body = req.body;



    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    };

    const newElem = {
        id: uuidv4(),
        ...body,
        created_at: new Date(Date.now())
    };

    fs.readFile(__dirname + '/tasks.json', 'utf-8', (err, data) => {
        if (err) {
            console.log(err);
        }

        const taskList = JSON.parse(data);

        taskList.push(newElem);
        
        fs.writeFile(__dirname + '/tasks.json', JSON.stringify(taskList, null, 2), (err) => {
            if(err)  {
                console.log(err);
            }; 
        });
    });


    res.send('Post request task');
});

export default router;