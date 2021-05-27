import express from 'express';
import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';


const __dirname = path.resolve()

const app = express();

app.use(express.json())







export const POST = (req, res) => {

    let name = req.body.name;
    let done = req.body.done;


    const newElem = {
        id: uuidv4(),
        name,
        done,
        created_at: new Date(Date.now())
    };

    fs.readFile(__dirname + '/tasks.json', 'utf-8', (err, data) => {
        if (err) {
            console.log(err);
        }

        const taskList = JSON.parse(data.toString());


        taskList.push(newElem);
        
        fs.writeFile(__dirname + '/tasks.json', JSON.stringify(taskList, null, 2), (err) => {
            if(err)  {
                console.log(err);
            }
            
        })
    })







    res.send('Post request task');
}