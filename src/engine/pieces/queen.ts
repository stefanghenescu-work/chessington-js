import Piece from './piece';
import Player from '../player';
import Board from '../board';

export default class Queen extends Piece {
    public constructor(player: Player) {
        super(player);
    }

    public getAvailableMoves(board: Board) {
        const currentSquare = board.findPiece(this);

        // get every possible move
        let lateralMoves = this.availableLateralMoves(currentSquare);
        let diagonalMoves = this.availableDiagonalMoves(currentSquare);

        // merge the arrays
        return lateralMoves.concat(diagonalMoves);
    }
}
