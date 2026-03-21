import { Request, Response } from 'express';
import { gameLocations } from '../data/locations';

const getGameLocations = (_: Request, res: Response) => {
    return res.json(gameLocations);
};

export default getGameLocations;
