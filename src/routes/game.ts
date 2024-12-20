import express from "express";
const router = express.Router();
import gameController from '../controllers/gameController';

router.get("/", gameController.getGameInstance);
router.get("/settings", gameController.getGameSettings);
router.post("/createGame", gameController.createNewGameInstance);
router.get("/checkGameStatus", gameController.checkGameStatus);
router.post("/start", gameController.startGame); // Pass io instance to the controller method

export default router;