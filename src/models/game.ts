import {newGame} from "../controllers/game";

export interface Cell {
    x: number;
    y: number;
}

export class Game {

    boardMines: Array<Cell> = [];
    boardChecked: Array<Cell> = [];
    boardFlags: Array<Cell> = [];
    sizeX: number;
    sizeY: number;
    mines: number;
    board: Array<Array<string>> = [];
    status: string = 'IN PROGRESS';

    constructor(posX: number, posY: number, mines: number) {
        this.sizeX = posX;
        this.sizeY = posY;
        this.mines = mines;
        this.allocateMines();
        this.generateBoard()
    }

    static restoreOldGame(oldGameData: any) {
        const oldGame: Game = new Game(oldGameData.sizeX, oldGameData.sizeY, 0)
        oldGame.boardMines = oldGameData.boardMines;
        oldGame.boardChecked = oldGameData.boardChecked;
        oldGame.boardFlags = oldGameData.boardFlags;
        oldGame.sizeX = oldGameData.sizeX;
        oldGame.sizeY = oldGameData.sizeY;
        oldGame.mines = oldGameData.mines;
        oldGame.board = oldGameData.board;
        oldGame.status = oldGameData.status;
        return oldGame;
    }

    toogleFlag(cell: Cell) {
        if (!this.isCellValid(cell)) {
            console.log('Coordenada invalida.')
            return false
        };
        if (this.findFlag(cell)) {
            this.boardFlags = this.boardFlags.filter((elem) => elem.x === cell.x && elem.y === cell.y);
            this.boardChecked = this.boardChecked.filter((elem) => elem.x === cell.x && elem.y === cell.y);
            this.board[cell.x][cell.y] = '#';
        } else {
            this.boardFlags.push(cell)
            this.boardChecked.push(cell)
            this.board[cell.x][cell.y] = 'F';
        }
    }

    checkCell(cell: Cell) {
        if (!this.isCellValid(cell)) {
            console.log('Coordenada invalida.')
            return false
        };
        if (this.boardChecked.length === 0) {
            if (this.findMine(cell)) {
                this.moveMine(cell);
            }
            this.markCell(cell);
            console.log('Bien ahi, safaste.')
        } else {
            if (this.findChecked(cell)) {
                console.log('Esta casilla ya se marco')
            } else {
                if (this.findMine(cell)) {
                    console.log('Bomba! buen intento.')
                    this.status = 'WIN!!!'
                    return true;
                } else {
                    this.markCell(cell);
                    console.log('Bien ahi, safaste.')
                }
            }
        }
        return this.checkWin();
    }

    moveMine(cell: Cell) {
        let moved = false;
        for (let x = 0; x < this.sizeX; x++) {
            for (let y = 0; y < this.sizeY; y++) {
                const currentCell = {x: x, y: y}
                if (!this.findMine(currentCell)) {
                    this.boardMines = this.boardMines.filter((mine) => !(mine.x === cell.x && mine.y === cell.y));
                    this.boardMines.push(currentCell)
                    moved = true;
                    break;
                }
            }
            if (moved) break;
        }
    }

    markCell(cell: Cell) {
        if (!this.isCellValid(cell)) {
            return false;
        }
        const cant = this.cellArround(cell);
        const cheked = this.findChecked(cell);
        if (cant === 0 && !cheked) {
            this.boardChecked.push(cell)
            this.board[cell.x][cell.y] = ' ';
            this.markCell({x: cell.x - 1, y: cell.y - 1})
            this.markCell({x: cell.x, y: cell.y - 1})
            this.markCell({x: cell.x + 1, y: cell.y - 1})
            this.markCell({x: cell.x - 1, y: cell.y})
            this.markCell({x: cell.x + 1, y: cell.y})
            this.markCell({x: cell.x - 1, y: cell.y + 1})
            this.markCell({x: cell.x, y: cell.y + 1})
            this.markCell({x: cell.x + 1, y: cell.y + 1})
        } else {
            if (this.isCellValid(cell) && !cheked) {
                this.boardChecked.push(cell)
                this.board[cell.x][cell.y] = (cant === 0 ? ' ' : cant.toString());
            }
        }
    }

    getData() {
        return {
            sizeX: this.sizeX,
            sizeY: this.sizeY,
            mines: this.mines,
            board: this.board,
            status: this.status
        }
    }

    private findMine(cell: Cell): boolean {
        return this.boardMines
            .some((mine) => mine.x === cell.x && mine.y === cell.y)
    }

    private findChecked(cell: Cell): boolean {
        return this.boardChecked.some((elem) => elem.x === cell.x && elem.y === cell.y)
    }

    private findFlag(cell: Cell): boolean {
        return this.boardFlags.some((flag) => flag.x === cell.x && flag.y === cell.y)
    }

    private checkWin() {
        const status = this.boardChecked.length + this.boardMines.length === this.sizeX * this.sizeY;
        if(status){
            this.status = 'WIN!!!'
        }
        return status
    }

    private isCellValid(cell: Cell) {
        if (cell.x < 0 || cell.x >= this.sizeX || cell.y < 0 || cell.y >= this.sizeY || cell.x == null || cell.y == null) {
            return false;
        }
        return true;
    }

    private generateBoard(): void {
        this.board = Array(this.sizeX)
            .fill([])
            .map((value) => Array(this.sizeY)
                .fill('#'));
    }

    private allocateMines() {
        for (let cantMines = 1; cantMines <= this.mines; cantMines++) {
            const posX = Math.floor((Math.random() * this.sizeX));
            const posY = Math.floor((Math.random() * this.sizeY));
            this.findMine({x: posX, y: posY}) ? cantMines-- : this.boardMines.push({x: posX, y: posY});
        }
    }

    private showMap() {
        for(let x = 0; x < this.sizeX; x++){
            for(let y = 0; y < this.sizeY; y++){
                const cell = {x:x, y:y};
                if (this.findMine(cell)) {
                    this.board[x][y] = '!';
                } else if (this.findFlag(cell)) {
                    this.board[x][y] = 'F';
                } else {
                    const cant = this.cellArround(cell);
                    this.board[x][y] = (cant > 0 ? cant.toString() : ' ');
                }
            }
        }
    }

    private cellArround(cell: Cell): number {
        let result: any = 0;
        for (const mine of this.boardMines) {
            if (
                ((mine.x - 1) === cell.x && (mine.y) === cell.y) ||
                ((mine.x + 1) === cell.x && (mine.y) === cell.y) ||
                ((mine.x) === cell.x && (mine.y - 1) === cell.y) ||
                ((mine.x) === cell.x && (mine.y + 1) === cell.y) ||
                ((mine.x + 1) === cell.x && (mine.y + 1) === cell.y) ||
                ((mine.x - 1) === cell.x && (mine.y + 1) === cell.y) ||
                ((mine.x + 1) === cell.x && (mine.y - 1) === cell.y) ||
                ((mine.x - 1) === cell.x && (mine.y - 1) === cell.y)
            ) {
                result++;
            }
        }
        return result;
    }
}
