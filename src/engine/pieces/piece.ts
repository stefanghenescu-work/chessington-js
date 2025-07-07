import Player from '../player';
import Board from '../board';
import Square from '../square';
import gameSettings from "../gameSettings";
import GameSettings from "../gameSettings";

export default class Piece {
    public player: Player;

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

            if (board.getPiece(availableSquare) != undefined)
                break;
            availableMoves.push(availableSquare);
        }

        rowIndex = currentSquare.row;

        while (rowIndex < GameSettings.BOARD_SIZE - 1) {
            rowIndex++;

            let availableSquare = new Square(rowIndex, currentSquare.col);

            if (board.getPiece(availableSquare) != undefined)
                break;
            availableMoves.push(availableSquare);
        }

        // add every square on the same row as the piece
        while (colIndex > 0) {
            colIndex--;

            let availableSquare = new Square(currentSquare.row, colIndex);

            if (board.getPiece(availableSquare) != undefined)
                break;
            availableMoves.push(availableSquare);
        }

        colIndex = currentSquare.col;

        while (colIndex < GameSettings.BOARD_SIZE - 1) {
            colIndex++;

            let availableSquare = new Square(currentSquare.row, colIndex);

            if (board.getPiece(availableSquare) != undefined)
                break;
            availableMoves.push(availableSquare);
        }

        return availableMoves;
    }

    // method for getting available squares in diagonal position to the current square
    availableDiagonalMoves(board: Board) {
        const currentSquare = board.findPiece(this);
        let availableMoves: Array<Square> = new Array<Square>();

        let startRow = currentSquare.row;
        let startCol = currentSquare.col;

        // look on every diagonal starting from the square of the bishop until I hit a margin

        // first diagonal
        while (startRow > 0 && startCol > 0) {
            startRow--;
            startCol--;
            availableMoves.push(new Square(startRow, startCol));
        }

        // reset starting position
        startRow = currentSquare.row;
        startCol = currentSquare.col;

        // second diagonal
        while (startRow > 0 && startCol < gameSettings.BOARD_SIZE - 1) {
            startRow--;
            startCol++;
            availableMoves.push(new Square(startRow, startCol));
        }

        // reset starting position
        startRow = currentSquare.row;
        startCol = currentSquare.col;

        while (startRow < gameSettings.BOARD_SIZE - 1 && startCol < gameSettings.BOARD_SIZE - 1) {
            startRow++;
            startCol++;
            availableMoves.push(new Square(startRow, startCol));
        }

        // reset starting position
        startRow = currentSquare.row;
        startCol = currentSquare.col;

        while (startRow < gameSettings.BOARD_SIZE - 1 && startCol > 0) {
            startRow++;
            startCol--;
            availableMoves.push(new Square(startRow, startCol));
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

            // count valid moves
            if (newRow >= 0 && newCol >= 0 && newRow < gameSettings.BOARD_SIZE && newCol < gameSettings.BOARD_SIZE)
                availableSquares.push(new Square(newRow, newCol));
        }

        return availableSquares;
    }
}
