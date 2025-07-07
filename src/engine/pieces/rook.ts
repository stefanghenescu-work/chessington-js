import Piece from './piece';
import Player from '../player';
import Board from '../board';
import Square from "../square";
import gameSettings from "../gameSettings";

export default class Rook extends Piece {
    public constructor(player: Player) {
        super(player);
    }

    public getAvailableMoves(board: Board) {
        let availableMoves: Array<Square> = new Array<Square>();
        const currentSquare = board.findPiece(this);

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
}
