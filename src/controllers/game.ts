import {Request, Response} from 'express'
import {GameModel} from './../schemas/game'
import {Game} from "../models/game";

export const newGame = async (req: Request, res: Response) => {
    const x: number = +(req.body.x || 0)
    const y: number = +(req.body.y || 0)
    const mines: number = +(req.body.mines || 0)
    const game = new Game(x, y, mines)
    const gameModel: any = saveGame(game);
    game.code = gameModel._id.toString();
    res.json({
        msg: 'newGames',
        game: game.getDataFront()
    })
}

export const toogleFlag = async (req: Request, res: Response) => {
    const x: number = +(req.body.x || 0)
    const y: number = +(req.body.y || 0)
    const code: any = req.body.code
    const game = await updateGame(x, y, code, true);
    res.json({
        msg: 'flag toogle',
        game: game.getDataFront(),
    })
}

export const clickCell = async (req: Request, res: Response) => {
    const x: number = +(req.body.x || 0)
    const y: number = +(req.body.y || 0)
    const code: any = req.body.code
    const game = await updateGame(x, y, code, false);
    res.json({
        msg: 'cell clicked',
        game: game.getDataFront()
    })
}

export const getGame = async (req: Request, res: Response) => {
    const {id} = req.params;
    try {
        const gameData = await GameModel.findById(id);
        const game = Game.restoreOldGame(gameData);
        res.json({
            msg: 'getGame',
            game: game.getDataFront()
        })
    } catch (err: any) {
        console.log('Fallo ' + err)
        throw new Error(err)
    }
}

const saveGame = (game: Game): any => {
    GameModel.init();
    const gameModel = new GameModel(game.getDataDb());
    gameModel.save(function (err: any, game: any) {
        if (err) throw Error(err);
    });
    return gameModel;
}


const updateGame = async (x: number, y: number, code: string, flag: boolean = false): Promise<Game> => {
    const gameData = await GameModel.findById(code);
    const game = Game.restoreOldGame(gameData)
    flag ? game.toogleFlag({x, y}) : game.checkCell({x, y})
    GameModel.updateOne({ _id: code }, game.getDataDb(), { multi: false }, function(err: any) {
        if(err) { throw err; }
    })
    return game;
}
