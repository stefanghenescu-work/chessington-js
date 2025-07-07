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
        let rowDelta = [2, 1, -1, -2, -2, -1, 1, 2];
        let colDelta = [1, 2, 2, 1, -1, -2, -2, -1];

        return this.availableNearMoves(board, rowDelta, colDelta);
    }
}
