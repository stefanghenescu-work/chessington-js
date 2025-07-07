import Player from '../player';
import Board from '../board';
import Square from '../square';
import gameSettings from "../gameSettings";

export default class Piece {
    public player: Player;

    public constructor(player: Player) {
        this.player = player;
    }

    public getAvailableMoves(board: Board) {
        throw new Error('This method must be implemented, and return a list of available moves');
    }

    public moveTo(board: Board, newSquare: Square) {
        const currentSquare = board.findPiece(this);
        board.movePiece(currentSquare, newSquare);
    }

    // method for getting available squares in lateral position to the current square
    availableLateralMoves(currentSquare: Square) {
        let availableMoves: Array<Square> = new Array<Square>();

        // add every square on the same column as the piece
        for (let rowIndex = 0; rowIndex < gameSettings.BOARD_SIZE; rowIndex++) {
            if (rowIndex == currentSquare.row)
                continue;

            let availableSquare = new Square(rowIndex, currentSquare.col);
            availableMoves.push(availableSquare);
        }

        // add every square on the same row as the piece
        for (let colIndex = 0; colIndex < gameSettings.BOARD_SIZE; colIndex++) {
            if (colIndex == currentSquare.col)
                continue;

            let availableSquare = new Square(currentSquare.row, colIndex);
            availableMoves.push(availableSquare);
        }

        return availableMoves;
    }

    // method for getting available squares in diagonal position to the current square
    availableDiagonalMoves(currentSquare: Square) {
        let availableMoves: Array<Square> = new Array<Square>();

        let startRow = currentSquare.row;
        let startCol = currentSquare.col;

        // look on every diagonal starting from the square of the bishop until I hit a margin

        // first diagonal
        while (startRow > 0 && startCol > 0) {
            startRow--;
            startCol--;
            let availableSquare = new Square(startRow, startCol);
            availableMoves.push(availableSquare);
        }

        // reset starting position
        startRow = currentSquare.row;
        startCol = currentSquare.col;

        // second diagonal
        while (startRow > 0 && startCol < gameSettings.BOARD_SIZE - 1) {
            startRow--;
            startCol++;
            let availableSquare = new Square(startRow, startCol);
            availableMoves.push(availableSquare);
        }

        // reset starting position
        startRow = currentSquare.row;
        startCol = currentSquare.col;

        while (startRow < gameSettings.BOARD_SIZE - 1 && startCol < gameSettings.BOARD_SIZE - 1) {
            startRow++;
            startCol++;
            let availableSquare = new Square(startRow, startCol);
            availableMoves.push(availableSquare);
        }

        // reset starting position
        startRow = currentSquare.row;
        startCol = currentSquare.col;

        while (startRow < gameSettings.BOARD_SIZE - 1 && startCol > 0) {
            startRow++;
            startCol--;
            let availableSquare = new Square(startRow, startCol);
            availableMoves.push(availableSquare);
        }

        return availableMoves;
    }
}
