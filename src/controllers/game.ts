import {Request, Response} from 'express'
import {GameModel} from './../schemas/game'
import {Game} from "../models/game";

export const newGame = (req: Request, res: Response) => {
    const {x, y, mines} = req.body;
    const game = new Game(x, y, mines)
    res.json({
        msg: 'newGames',
        game: game.getData()
    })
}

export const getGames = (req: Request, res: Response) => {
    GameModel.find()
        .then((data: any)=>console.log(data))
        .catch((err: Error) => console.log('Fallo ' + err))
    res.json({
        msg: 'getGames',
        game: 'game list'
    })
}

export const getGame = async (req: Request, res: Response) => {
    const {id} = req.params;
    try {
        const game = await GameModel.findById(id);
        res.json({
            msg: 'getGame',
            game: game
        })
    } catch (err: any) {
        console.log('Fallo ' + err)
    }
}

export const postGame = (req: Request, res: Response) => {
    const {body} = req;
    const {id} = req.params;
    // Create an instance of model SomeModel
    GameModel.init();
    const game = new GameModel({
        boardMines: [
            { x: 3, y: 1 },
            { x: 1, y: 4 },
            { x: 5, y: 5 },
            { x: 3, y: 2 },
            { x: 2, y: 3 },
            { x: 4, y: 4 },
            { x: 3, y: 3 },
            { x: 4, y: 3 },
            { x: 2, y: 4 },
            { x: 1, y: 2 }
        ],
        boardChecked: [],
        boardFlags: [],
        sizeX: 5,
        sizeY: 5,
        mines: 10
    });

    // Save the new model instance, passing a callback
    game.save(function (err: any) {
        if (err) throw Error(err);
        console.log('save game')
    });
    res.json({
        msg: 'postGames',
        body
    })
}

export const putGame = (req: Request, res: Response) => {
    const {body} = req;
    const {id} = req.params;

    res.json({
        msg: 'putGames',
        body
    })
}

export const deleteGame = (req: Request, res: Response) => {
    const {id} = req.params;

    res.json({
        msg: 'deleteGames',
        id
    })
}
