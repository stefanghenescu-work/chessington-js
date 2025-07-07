import Piece from './piece';
import Player from '../player';
import Board from '../board';
import Square from "../square";
import gameSettings from "../gameSettings";

export default class King extends Piece {
    public constructor(player: Player) {
        super(player);
    }

    public getAvailableMoves(board: Board) {
        const currentSquare = board.findPiece(this);

        let rowDelta = [1, 0, -1, 1, -1, 0, 1, -1];
        let colDelta = [1, 1, 1, 0, -1, -1, -1, 0];

        return this.availableNearMoves(currentSquare, rowDelta, colDelta);
    }
}
