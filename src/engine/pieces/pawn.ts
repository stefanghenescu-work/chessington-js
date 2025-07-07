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
        let oneSquareNext;
        let twoSquareNext = undefined;

        // verify whose turn is it
        if (this.player == Player.WHITE) {
            // first move can be of 2 squares
            if (this.firstMove)
                twoSquareNext = new Square(currentSquare.row + 2, currentSquare.col);
            oneSquareNext = new Square(currentSquare.row + 1, currentSquare.col);
        } else {
            // first move can be of 2 squares
            if (this.firstMove)
                twoSquareNext = new Square(currentSquare.row - 2, currentSquare.col);
            oneSquareNext = new Square(currentSquare.row - 1, currentSquare.col);
        }

        availableMoves.push(oneSquareNext);
        if (twoSquareNext)
            availableMoves.push(twoSquareNext);

        return availableMoves;
    }
}
