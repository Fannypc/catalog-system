import { Router } from 'express';
import { create, all, info, update, destroy } from '../controllers/user';
const router = Router();
const authorization = require('../../middlewares/authorization');

router.get('/', authorization(['Admin']), all);
router.get('/:id', authorization(['Admin']), info);
router.post('/', authorization(['Admin']), create);
router.put('/:id', authorization(['Admin']), update);
router.delete('/:id', authorization(['Admin']), destroy);

export default router;