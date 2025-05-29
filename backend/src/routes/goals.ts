import { Router } from 'express';
import * as goalController from '../controllers/goalController';

const router = Router();

router.post('/', goalController.createGoal);
router.get('/', goalController.listGoals); 
router.get('/:id', goalController.getGoal);
router.put('/:id', goalController.updateGoal);
router.delete('/:id', goalController.deleteGoal);

router.get('/templates', goalController.listTemplates);

export default router;