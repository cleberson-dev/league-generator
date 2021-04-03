import { Router } from 'express';
import LeagueController from 'main/controllers/league';
import authMiddleware from 'main/middlewares/auth';

const router = Router();

router.get('/', authMiddleware, LeagueController.getUserLeagues);
router.post('/',  authMiddleware, LeagueController.createLeague);
router.get('/:leagueId', LeagueController.getLeague);
router.get('/:leagueId/teams', LeagueController.getLeagueTeams);
router.get('/:leagueId/fixtures', LeagueController.getLeagueFixtures);

export default router;