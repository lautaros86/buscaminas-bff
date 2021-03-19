"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const game_1 = require("../models/game");
describe('Game tests', () => {
    describe('Default tests', () => {
        let game;
        beforeEach(() => {
            game = new game_1.Game(5, 10, 20);
        });
        it('Attribute finished should be false', () => {
            chai_1.expect(game.finished).to.be.false;
        });
        it('boardMines should have 20 mines', () => {
            chai_1.expect(game.boardMines.length).to.equal(20);
        });
        it('Game status should be "IN PROGRESS"', () => {
            chai_1.expect(game.status).to.be.equal('IN PROGRESS');
        });
        it('Game should not have flags', () => {
            chai_1.expect(game.boardFlags.length).to.be.equal(0);
        });
        it('Game board should have 50 cells', () => {
            const cells = game.board.length * game.board[0].length;
            chai_1.expect(cells).to.be.equal(50);
        });
    });
    describe('Moves tests', () => {
        let game;
        beforeEach(() => {
            game = new game_1.Game(5, 10, 20);
        });
        it('shoul check {x: 0, y: 0} cell', () => {
            const x = 0;
            const y = 0;
            chai_1.expect(game.board[x][y]).to.be.equals('#');
            game.checkCell({ x, y });
            chai_1.expect(game.board[x][y]).to.be.equals('#');
        });
    });
});
//# sourceMappingURL=test.spec.js.map
