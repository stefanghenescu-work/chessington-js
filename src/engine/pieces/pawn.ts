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
        let diagonalSquareLeft;
        let diagonalSquareRight;

        // verify whose turn is it
        if (this.player == Player.WHITE) {
            // first move can be of 2 squares
            if (board.whiteFirstMove)
                twoSquareNext = new Square(currentSquare.row + 2, currentSquare.col);
            oneSquareNext = new Square(currentSquare.row + 1, currentSquare.col);
            diagonalSquareLeft = new Square(currentSquare.row + 1, currentSquare.col - 1);
            diagonalSquareRight = new Square(currentSquare.row + 1, currentSquare.col + 1);
        } else {
            // first move can be of 2 squares
            if (board.blackFirstMove)
                twoSquareNext = new Square(currentSquare.row - 2, currentSquare.col);
            oneSquareNext = new Square(currentSquare.row - 1, currentSquare.col);
            diagonalSquareLeft = new Square(currentSquare.row - 1, currentSquare.col - 1);
            diagonalSquareRight = new Square(currentSquare.row - 1, currentSquare.col + 1);
        }

        // verify that there is no other piece there
        if (board.isInBoard(oneSquareNext) && board.getPiece(oneSquareNext) == undefined) {
            availableMoves.push(oneSquareNext);

            // verify that both squares are free as a pawn cannot jump over a piece
            if (twoSquareNext  && board.isInBoard(twoSquareNext) && board.getPiece(twoSquareNext) == undefined)
                availableMoves.push(twoSquareNext);

            // verify diagonal move to take opposite piece
            this.verifyTakeMove(board, availableMoves, diagonalSquareLeft);
            this.verifyTakeMove(board, availableMoves, diagonalSquareRight);
        }

        return availableMoves;
    }

    private verifyTakeMove(board: Board, availableMoves: Array<Square>, diagonalSquare: Square) {
        let diagonalPiece = board.getPiece(diagonalSquare);

        if (board.isInBoard(diagonalSquare) && diagonalPiece != undefined
            && this.isOppositePiece(diagonalPiece) && !board.isKing(diagonalPiece))
            availableMoves.push(diagonalSquare);
    }
}
