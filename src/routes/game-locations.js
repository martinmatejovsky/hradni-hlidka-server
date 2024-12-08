import express from "express";
const gameLocationsRouter = express.Router();
import gameLocationsController from '../controllers/gameLocationsController';

gameLocationsRouter.get("/", gameLocationsController);

export default gameLocationsRouter;