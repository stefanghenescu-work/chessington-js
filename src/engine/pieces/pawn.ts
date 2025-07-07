import Piece from './piece';
import Player from '../player';
import Board from '../board';
import Square from "../square";
import GameSettings from "../gameSettings";

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
            if (board.whiteFirstMove) {
                twoSquareNext = new Square(currentSquare.row + 2, currentSquare.col);
            }
            oneSquareNext = new Square(currentSquare.row + 1, currentSquare.col);
        } else {
            // first move can be of 2 squares
            if (board.blackFirstMove) {
                twoSquareNext = new Square(currentSquare.row - 2, currentSquare.col);
            }
            oneSquareNext = new Square(currentSquare.row - 1, currentSquare.col);
        }

        // verify that there is no other piece there
        if (this.isInBoard(oneSquareNext) && board.getPiece(oneSquareNext) == undefined) {
            availableMoves.push(oneSquareNext);

            // verify that both squares are free as a pawn cannot jump over a piece
            if (twoSquareNext  && this.isInBoard(twoSquareNext) && board.getPiece(twoSquareNext) == undefined)
                availableMoves.push(twoSquareNext);
        }

        return availableMoves;
    }


    private isInBoard(position: Square) {
        if (position.row >= 0 && position.col >= 0
            && position.row < GameSettings.BOARD_SIZE && position.col < GameSettings.BOARD_SIZE)
            return true;

        return false;
    }
}
