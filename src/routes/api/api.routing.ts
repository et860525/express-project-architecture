import { Router } from 'express';
import todoRoute from './todo/todo.routing';

const router = Router();

router.get('/', function(req, res) {
  res.send('Hello api!');
})

router.use('/todo', todoRoute);

export default router;