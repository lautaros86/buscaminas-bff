import {Router} from "express";
import {getGame, newGame, getGames, toogleFlag, clickCell} from "../controllers/game";

const router = Router();

router.get('/new', newGame)
router.get('/clickCell', clickCell)
router.get('/toogleFlag', toogleFlag)
router.get('/:id', getGame)

export default router;
