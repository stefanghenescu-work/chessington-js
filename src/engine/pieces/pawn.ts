import Piece from './piece';
import Player from '../player';
import Board from '../board';
import Square from "../square";

export default class Pawn extends Piece {
    public constructor(player: Player) {
        super(player);
    }

    public getAvailableMoves(board: Board) {
        let availableMoves: Array<Square> = new Array<Square>();
        const currentSquare = board.findPiece(this);
        let squareToMove;

        if (this.player == Player.WHITE)
            squareToMove = new Square(currentSquare.row + 1, currentSquare.col);
        else
            squareToMove = new Square(currentSquare.row - 1, currentSquare.col);

        availableMoves.push(squareToMove);
        return availableMoves;
    }
}
