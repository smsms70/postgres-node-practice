import {Router} from 'express';
import { createUser, deleteUser, getAllUsers, getUniqueUser, updateUser } from '../controllers/users.controllers.js';


const router = Router();

router.get('/users', getAllUsers);
router.get('/users/:id', getUniqueUser);

 
router.post('/users', createUser);
router.delete('/users/:id', deleteUser);
router.put('/users/:id', updateUser)


export default router;