import 'babel-polyfill';
import Router from 'koa-router';
import { baseApi } from '../config';
import TagController from '../controllers/tags';

const api = 'tags';

const router = new Router();

router.prefix(`/${baseApi}/${api}`);

// GET /api/cities
router.get('/', TagController.find);

// POST /api/cities
router.post('/', TagController.add);

// PUT /api/cities/id
router.put('/:id', TagController.update);

// DELETE /api/cities/id
router.delete('/:id', TagController.delete);

export default router;