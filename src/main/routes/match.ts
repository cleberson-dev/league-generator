import { Router } from "express";
import MatchController from "main/controllers/match";
import authMiddleware from "main/middlewares/auth";

const router = Router();

router.get('/:matchId', MatchController.getMatch);
router.patch('/:matchId', authMiddleware, MatchController.changeMatch);

export default router;