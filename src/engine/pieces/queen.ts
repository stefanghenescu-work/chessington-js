import Piece from './piece';
import Player from '../player';
import Board from '../board';

export default class Queen extends Piece {
    public constructor(player: Player) {
        super(player);
    }

    public getAvailableMoves(board: Board) {
        // get every possible move
        let lateralMoves = this.availableLateralMoves(board);
        let diagonalMoves = this.availableDiagonalMoves(board);

        // merge the arrays
        return lateralMoves.concat(diagonalMoves);
    }
}
