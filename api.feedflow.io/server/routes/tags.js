import 'babel-polyfill'
import Router from 'koa-router'
import { baseApi } from '../config'
import TagController from '../controllers/tags'

const api = 'tags'

const router = new Router();

router.prefix(`/${baseApi}/${api}`)

// GET /api/tags
router.get('/', TagController.find)

// POST /api/tags
router.post('/', TagController.add)

// PUT /api/tags/id
router.put('/:id', TagController.update)

// DELETE /api/tags/id
router.delete('/:id', TagController.delete)

export default router
