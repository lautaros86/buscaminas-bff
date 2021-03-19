import {Router} from "express";
import {getGame, newGame, toogleFlag, clickCell} from "../controllers/game";

const router = Router();

router.post('/newGame', newGame)
router.post('/clickCell', clickCell)
router.post('/toogleFlag', toogleFlag)
router.get('/getGame/:id', getGame)

export default router;
