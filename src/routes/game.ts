import {Router} from "express";
import {getGame, postGame, putGame, deleteGame, newGame, getGames} from "../controllers/game";

const router = Router();

router.get('/', getGames)
router.get('/new', newGame)
router.get('/:id', getGame)
router.post('/', postGame)
router.put('/:id', putGame)
router.delete('/:id', deleteGame)

export default router;
