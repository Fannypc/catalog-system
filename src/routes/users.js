import { Router } from 'express';
import { all, info, update, destroy } from '../controllers/user';
import Roles from '../../helpers/roles';
const router = Router();
const authorization = require('../../middlewares/authorization');

router.get('/', authorization([Roles.Admin]), all);
router.get('/:id', authorization([Roles.Admin]), info);
router.put('/:id', authorization([Roles.Admin]), update);
router.delete('/:id', authorization([Roles.Admin]), destroy);

export default router;