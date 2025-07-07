import Player from '../player';
import Board from '../board';
import Square from '../square';
import gameSettings from "../gameSettings";
import GameSettings from "../gameSettings";

export default class Piece {
    public player: Player;
    private tookPieceBefore: boolean = false;

    public constructor(player: Player) {
        this.player = player;
    }

    public getAvailableMoves(board: Board) {
        throw new Error('This method must be implemented, and return a list of available moves');
    }

    public moveTo(board: Board, newSquare: Square) {
        const currentSquare = board.findPiece(this);
        board.movePiece(currentSquare, newSquare);
    }

    // method for getting available squares in lateral position to the current square
    availableLateralMoves(board: Board) {
        const currentSquare = board.findPiece(this);
        let availableMoves: Array<Square> = new Array<Square>();

        let rowIndex = currentSquare.row;
        let colIndex = currentSquare.col;

        // add every square on the same column as the piece
        while (rowIndex > 0) {
            rowIndex--;

            let availableSquare = new Square(rowIndex, currentSquare.col);

            if (this.helperAvailableMoves(board, availableSquare) != -1)
                availableMoves.push(availableSquare);
            else
                break;

        }

        rowIndex = currentSquare.row;

        while (rowIndex < GameSettings.BOARD_SIZE - 1) {
            rowIndex++;

            let availableSquare = new Square(rowIndex, currentSquare.col);

            if (this.helperAvailableMoves(board, availableSquare) != -1)
                availableMoves.push(availableSquare);
            else
                break;

        }

        // add every square on the same row as the piece
        while (colIndex > 0) {
            colIndex--;

            let availableSquare = new Square(currentSquare.row, colIndex);

            if (this.helperAvailableMoves(board, availableSquare) != -1)
                availableMoves.push(availableSquare);
            else
                break;

        }

        colIndex = currentSquare.col;

        while (colIndex < GameSettings.BOARD_SIZE - 1) {
            colIndex++;

            let availableSquare = new Square(currentSquare.row, colIndex);

            if (this.helperAvailableMoves(board, availableSquare) != -1)
                availableMoves.push(availableSquare);
            else
                break;
        }

        return availableMoves;
    }

    // method for getting available squares in diagonal position to the current square
    availableDiagonalMoves(board: Board) {
        const currentSquare = board.findPiece(this);
        let availableMoves: Array<Square> = new Array<Square>();

        let indexRow = currentSquare.row;
        let indexCol = currentSquare.col;

        // look on every diagonal starting from the square of the bishop until I hit a margin

        // first diagonal
        while (indexRow > 0 && indexCol > 0) {
            indexRow--;
            indexCol--;

            let nextSquare = new Square(indexRow, indexCol);

            if (this.helperAvailableMoves(board, nextSquare) != -1)
                availableMoves.push(nextSquare);
            else
                break;
        }

        // reset starting position
        indexRow = currentSquare.row;
        indexCol = currentSquare.col;

        // second diagonal
        while (indexRow > 0 && indexCol < gameSettings.BOARD_SIZE - 1) {
            indexRow--;
            indexCol++;

            let nextSquare = new Square(indexRow, indexCol);

            if (this.helperAvailableMoves(board, nextSquare) != -1)
                availableMoves.push(nextSquare);
            else
                break;
        }

        // reset starting position
        indexRow = currentSquare.row;
        indexCol = currentSquare.col;

        while (indexRow < gameSettings.BOARD_SIZE - 1 && indexCol < gameSettings.BOARD_SIZE - 1) {
            indexRow++;
            indexCol++;

            let nextSquare = new Square(indexRow, indexCol);

            if (this.helperAvailableMoves(board, nextSquare) != -1)
                availableMoves.push(nextSquare);
            else
                break;
        }

        // reset starting position
        indexRow = currentSquare.row;
        indexCol = currentSquare.col;

        while (indexRow < gameSettings.BOARD_SIZE - 1 && indexCol > 0) {
            indexRow++;
            indexCol--;

            let nextSquare = new Square(indexRow, indexCol);

            if (this.helperAvailableMoves(board, nextSquare) != -1)
                availableMoves.push(nextSquare);
            else
                break;
        }

        return availableMoves;
    }


    availableNearMoves(board: Board, rowDelta: Array<number>, colDelta: Array<number>) {
        const currentSquare = board.findPiece(this);
        let availableSquares = new Array<Square>();

        for (let i = 0; i < 8; i++) {

            // Position of knight after move
            let newRow = currentSquare.row + rowDelta[i];
            let newCol = currentSquare.col + colDelta[i];

            let nextSquare = new Square(newRow, newCol);

            // add only valid moves
            if (board.isInBoard(nextSquare))
                availableSquares.push(nextSquare);
        }

        return availableSquares;
    }

    private isOppositePiece(piece: Piece | undefined) {
        return piece?.player != this.player;
    }

    private helperAvailableMoves(board: Board, availableSquare: Square) {
        if (this.tookPieceBefore)
            return -1;

        if (board.getPiece(availableSquare) != undefined) {
            if (board.isKing(board.getPiece(availableSquare)))
                return -1;

            if (!this.isOppositePiece(board.getPiece(availableSquare)))
                return -1;
            else if (!this.tookPieceBefore)
                this.tookPieceBefore = true;
        }

        return 0;
    }
}
