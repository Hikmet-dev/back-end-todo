import fs from 'fs';
import path from 'path';

const __dirname = path.resolve()


export const DELETE = (req, res) => {
    let idParam = req.params['idParam'];

    fs.readFile(__dirname + '/tasks.json', 'utf-8', (err, data) => {
        if (err) {
            console.log(err);
        }

        const taskList = JSON.parse(data.toString());


        const newTaskList =  taskList.filter(item => item.id !== idParam) ;
        
        fs.writeFile(__dirname + '/tasks.json', JSON.stringify(newTaskList, null, 2), (err) => {
            if(err)  {
                console.log(err);
            }
            res.send(`Delete: ${idParam}`)
        })
    })


};

