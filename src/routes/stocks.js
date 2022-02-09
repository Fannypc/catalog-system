import { Router } from 'express';
import { create, all, info, update, destroy } from '../controllers/stock';
import Roles from '../../helpers/roles';
const router = Router();
const authorization = require('../../middlewares/authorization');
const authentication = require('../../middlewares/authentication');

router.get('/', all);
router.get('/:id', info);
router.post('/', authentication, authorization([Roles.Admin, Roles.User]), create);
router.put('/:id', authentication, authorization([Roles.Admin, Roles.User]), update);
router.delete('/:id', authentication, authorization([Roles.Admin, Roles.User]), destroy);

export default router;