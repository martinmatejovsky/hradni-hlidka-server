import express from 'express';
const router = express.Router();
import gameController from '../controllers/gameController';

router.get('/', gameController.getGameInstance);
router.post('/createGame', gameController.createGame);
router.get('/checkGameStatus', gameController.checkGameStatus);
router.post('/start', gameController.startGame);
router.get('/runningGames', gameController.getRunningGames);
router.get('/weapons', gameController.getWeapons);

export default router;
