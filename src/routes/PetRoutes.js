import { Router } from 'express';
import * as petController from './../controllers/PetControllers.js';

const router = Router();

router.get('/', petController.getAllPets);
router.get('/:id', petController.getPetById);
router.post('/', petController.criarPet);
router.delete('/:id', petController.deletaPet);
router.put('/:id', petController.atualizaPet);

export default router;