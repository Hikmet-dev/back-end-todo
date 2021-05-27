import fs from 'fs';
import path from 'path';

const __dirname = path.resolve();


export const PATCH = (req, res) => {
        let idParam = req.params['idParam'];
        let body = req.body;

        fs.readFile(__dirname + '/tasks.json', 'utf-8', (err, data) => {
                if (err) {
                    console.log(err);
                }
                console.log(typeof idParam);
        
                const taskList = JSON.parse(data.toString());
                console.log(taskList);
                const index = taskList.findIndex(item => item.id === idParam);
                console.log(index);
                const newObjs = {...taskList[index], ...body };
                taskList[index] = newObjs;

                

                fs.writeFile(__dirname + '/tasks.json', JSON.stringify(taskList, null, 2), (err) => {
                    if(err)  {
                        console.log(err);
                    }
                    res.send(`patch: ${idParam}`);
                });
            });
};