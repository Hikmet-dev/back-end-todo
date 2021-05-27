import fs from 'fs';
import path from 'path';

const __dirname = path.resolve()







export const GET = (req, res) => {

    let filterBy = req.query.filterBy;
    let order = req.query.order;
    let page = req.query.page;

    fs.readFile(__dirname + '/tasks.json','utf-8', (err, data) => {
        if (err) {
            console.log(err);
        }
    
        const user = JSON.parse(data.toString());


        const newUser = user.filter(data =>  filterBy ? data.done.toString() === filterBy : data )
                            .slice((page - 1) * 5, page * 5)
                            .sort((a, b) => order === 'asc' ? Date.parse(a.created_at) - Date.parse(b.created_at) : Date.parse(b.created_at) - Date.parse(a.created_at));

 
        res.send(newUser);
    })


};