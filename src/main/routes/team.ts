import { Router } from 'express';
import TeamController from 'main/controllers/team';
import authMiddleware from 'main/middlewares/auth';

const router = Router();

router.get('/', authMiddleware, TeamController.getUserTeams);
router.post('/', authMiddleware, TeamController.createTeam);

export default router;