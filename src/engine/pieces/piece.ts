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

    /**
     * method for getting available squares in lateral positions to the current square
     * @param board - the board on which the game is played
     * @return availableMoves - an array of squares on which the piece can move
     */
    availableLateralMoves(board: Board) {
        const currentSquare = board.findPiece(this);
        let availableMoves: Array<Square> = new Array<Square>();

        let rowIndex = currentSquare.row;
        let colIndex = currentSquare.col;

        // add every square on the same column as the piece
        while (rowIndex > 0) {
            rowIndex--;

            let availableSquare = new Square(rowIndex, currentSquare.col);

            if (this.helperAvailableSquare(board, availableSquare) != -1)
                availableMoves.push(availableSquare);
            else
                break;

        }

        // reset if for next turn
        this.tookPieceBefore = false;

        rowIndex = currentSquare.row;

        while (rowIndex < GameSettings.BOARD_SIZE - 1) {
            rowIndex++;

            let availableSquare = new Square(rowIndex, currentSquare.col);

            if (this.helperAvailableSquare(board, availableSquare) != -1)
                availableMoves.push(availableSquare);
            else
                break;

        }

        // reset if for next turn
        this.tookPieceBefore = false;

        // add every square on the same row as the piece
        while (colIndex > 0) {
            colIndex--;

            let availableSquare = new Square(currentSquare.row, colIndex);

            if (this.helperAvailableSquare(board, availableSquare) != -1)
                availableMoves.push(availableSquare);
            else
                break;

        }

        // reset if for next turn
        this.tookPieceBefore = false;

        colIndex = currentSquare.col;

        while (colIndex < GameSettings.BOARD_SIZE - 1) {
            colIndex++;

            let availableSquare = new Square(currentSquare.row, colIndex);

            if (this.helperAvailableSquare(board, availableSquare) != -1)
                availableMoves.push(availableSquare);
            else
                break;
        }

        // reset if for next turn
        this.tookPieceBefore = false;

        return availableMoves;
    }

    /**
     * method for getting available squares in diagonal position to the current square
     * @param board - the board on which the game is played
     * @return availableMoves - an array of squares on which the piece can move
     */
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

            if (this.helperAvailableSquare(board, nextSquare) != -1)
                availableMoves.push(nextSquare);
            else
                break;
        }

        // reset if for next turn
        this.tookPieceBefore = false;

        // reset starting position
        indexRow = currentSquare.row;
        indexCol = currentSquare.col;

        // second diagonal
        while (indexRow > 0 && indexCol < gameSettings.BOARD_SIZE - 1) {
            indexRow--;
            indexCol++;

            let nextSquare = new Square(indexRow, indexCol);

            if (this.helperAvailableSquare(board, nextSquare) != -1)
                availableMoves.push(nextSquare);
            else
                break;
        }

        // reset if for next turn
        this.tookPieceBefore = false;

        // reset starting position
        indexRow = currentSquare.row;
        indexCol = currentSquare.col;

        while (indexRow < gameSettings.BOARD_SIZE - 1 && indexCol < gameSettings.BOARD_SIZE - 1) {
            indexRow++;
            indexCol++;

            let nextSquare = new Square(indexRow, indexCol);

            if (this.helperAvailableSquare(board, nextSquare) != -1)
                availableMoves.push(nextSquare);
            else
                break;
        }

        // reset if for next turn
        this.tookPieceBefore = false;

        // reset starting position
        indexRow = currentSquare.row;
        indexCol = currentSquare.col;

        while (indexRow < gameSettings.BOARD_SIZE - 1 && indexCol > 0) {
            indexRow++;
            indexCol--;

            let nextSquare = new Square(indexRow, indexCol);

            if (this.helperAvailableSquare(board, nextSquare) != -1)
                availableMoves.push(nextSquare);
            else
                break;
        }

        // reset if for next turn
        this.tookPieceBefore = false;

        return availableMoves;
    }


    //
    /**
     * method for preknown positions relative to the piece position
     * implemented by knight and king
     * @param board - the board on which the game is played
     * @param rowDelta - an array of relative index positions for rows
     * @param colDelta - an array of relative index positions for columns
     * @return availableMoves - an array of squares on which the piece can move
     */
    availableNearMoves(board: Board, rowDelta: Array<number>, colDelta: Array<number>) {
        const currentSquare = board.findPiece(this);
        let availableMoves = new Array<Square>();

        for (let i = 0; i < 8; i++) {

            // Position of knight after move
            let newRow = currentSquare.row + rowDelta[i];
            let newCol = currentSquare.col + colDelta[i];

            let nextSquare = new Square(newRow, newCol);

            // add only valid moves and cannot take other king
            if (board.isInBoard(nextSquare) && !board.isKing(board.getPiece(nextSquare))
                && this.isOppositePiece(board.getPiece(nextSquare)))
                availableMoves.push(nextSquare);
        }

        return availableMoves;
    }

    /**
     * verifies if another piece, if exists, is from the other player
     */
    public isOppositePiece(piece: Piece | undefined) {
        return piece?.player != this.player;
    }

    private helperAvailableSquare(board: Board, availableSquare: Square) {
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
