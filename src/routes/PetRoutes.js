import { Router } from 'express';
import * as petController from './../controllers/PetControllers.js';

const router = Router();

router.get('/', petController.getAllPets);
router.get('/:id', petController.getPetById);

export default router;