import 'babel-polyfill'
import Router from 'koa-router'
import { baseApi } from '../config'
import FeedController from '../controllers/feeds'

const api = 'feeds'

const router = new Router();

router.prefix(`/${baseApi}/${api}`)

// GET /api/feeds
router.get('/:type', FeedController.find)

// GET /api/feeds
router.get('/:type/:sort', FeedController.find)

// POST /api/feeds
router.post('/', FeedController.add)

// PUT /api/feeds/id
router.put('/:id', FeedController.update)

// DELETE /api/feeds/id
router.delete('/:id', FeedController.delete)

export default router
