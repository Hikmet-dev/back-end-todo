import { Router } from 'express';
const router = Router();

import bodyParser from 'body-parser';

const urlencodedParser = bodyParser.urlencoded({extended: false});







import { GET } from './api/tasks.get.js';
import { DELETE } from './api/task.delete.js';
import { PATCH } from './api/task.patch.js';
import { POST } from './api/task.post.js';



router.get('/tasks', GET);

router.post('/task', urlencodedParser,  POST);

router.patch('/task/:idParam/', PATCH);

router.delete('/task/:idParam', DELETE);


export default router;
