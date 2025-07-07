import Piece from './piece';
import Player from '../player';
import Board from '../board';
import Square from "../square";
import gameSettings from "../gameSettings";

export default class Knight extends Piece {
    public constructor(player: Player) {
        super(player);
    }

    public getAvailableMoves(board: Board) {
        const currentSquare = board.findPiece(this);
        let availableSquares = new Array<Square>();

        let rowDelta = [2, 1, -1, -2, -2, -1, 1, 2];
        let colDelta = [1, 2, 2, 1, -1, -2, -2, -1];

        for (let i = 0; i < 8; i++) {

            // Position of knight after move
            let newRow = currentSquare.row + rowDelta[i];
            let newCol = currentSquare.col + colDelta[i];

            // count valid moves
            if (newRow >= 0 && newCol >= 0 && newRow < gameSettings.BOARD_SIZE && newCol < gameSettings.BOARD_SIZE)
                availableSquares.push(new Square(newRow, newCol));
        }

        return availableSquares
    }
}
