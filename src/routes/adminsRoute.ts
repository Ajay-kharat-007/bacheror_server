import { Router } from 'express';
import { validateToken } from '../middleware/validateTokenHandler';

const router = Router();

import {
    getUser,
    getAllUsers,
    deleteUser,
    createUser,
    updateUser
} from "../controllers/adminController";


// router.use(validateToken)

router.route("/").get(getAllUsers).post(createUser);
router.route("/:id").get(getUser).delete(deleteUser).put(updateUser);

export default router;