import {expect} from 'chai';
import {Game} from '../src/models/game';

describe('Game tests', () => {

    describe('Default tests', () => {
        let game: Game;

        beforeEach(() => {
            game = new Game(5, 10, 20);
        })

        it('Attribute finished should be false', () => {
            expect(game.finished).to.be.false;
        });

        it('boardMines should have 20 mines', () => {
            expect(game.boardMines.length).to.equal(20);
        });

        it('Game status should be "IN PROGRESS"', () => {
            expect(game.status).to.be.equal('IN PROGRESS');
        });

        it('Game should not have flags', () => {
            expect(game.boardFlags.length).to.be.equal(0)
        });

        it('Game board should have 50 cells', () => {
            const cells = game.board.length * game.board[0].length;
            expect(cells).to.be.equal(50)
        });

    });

    describe('Moves tests', () => {
        let game: Game;

        beforeEach(() => {
            game = new Game(5, 10, 20);
        })


        it('shoul check {x: 0, y: 0} cell', () => {
            const x = 0;
            const y = 0;
            expect(game.board[x][y]).to.be.equals('#');
            game.checkCell({x, y});
            expect(game.board[x][y]).to.be.equals('#');
        });


    });
});
