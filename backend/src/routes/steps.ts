import { Router } from 'express';
import * as stepController from '../controllers/stepController';

const router = Router();

router.get('/goals/:goalId/steps', stepController.listSteps);
router.get('/steps/today', stepController.getTodayStep);
router.post('/steps/:id/complete', stepController.completeStep);
router.post('/steps/:id/skip', stepController.skipStep);
router.post('/steps/:id/swap', stepController.swapStep); 
router.put('/steps/:id', stepController.updateStep);
router.get('/steps/:id/history', stepController.getStepHistory);

export default router;