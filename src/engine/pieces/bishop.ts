import Piece from './piece';
import Player from '../player';
import Board from '../board';
import Square from "../square";
import gameSettings from "../gameSettings";

export default class Bishop extends Piece {
    public constructor(player: Player) {
        super(player);
    }

    public getAvailableMoves(board: Board) {
        let availableMoves: Array<Square> = new Array<Square>();
        const currentSquare = board.findPiece(this);

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
