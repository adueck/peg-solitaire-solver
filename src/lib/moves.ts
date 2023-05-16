export function applyMove(b: Board, m: Move): Board {
    const nb = structuredClone(b);
    nb[m.start.y][m.start.x] = 0;
    nb[m.jumped.y][m.jumped.x] = 0;
    nb[m.end.y][m.end.x] = 1;
    return nb;
}

/**
 * searches to find all the possible moves that can be made
 * on a given board
 * 
 * @param board 
 * @returns 
 */
export function allPossibleMoves(board: Board): Move[] {
    let moves: Move[] = [];
    board.forEach((row, y) => {
        row.forEach((_, x) => {
            moves = moves.concat(possibleMovesOnPeg(board, { x, y }));
        });
    });
    return moves;
}

/**
 * searches to find all the possible moves that could be made
 * from a single peg an a given board
 * 
 * @param board 
 * @param peg 
 * @returns 
 */
function possibleMovesOnPeg(board: Board, peg: Position): Move[] {
    return moves.map(m => m(peg)).filter(moveOk); 
    
    function moveOk(m: Move): boolean {
        return (
            getPosition(m.start) === 1 &&
            getPosition(m.jumped) === 1 &&
            getPosition(m.end) === 0
        );
    }
    function getPosition({x, y}: Position): H | undefined {
        if (board[y] === undefined) {
            return undefined;
        }
        return board[y][x];
    } 
}

function leftM(start: Position): Move {
    return {
        start,
        jumped: { ...start, x: start.x - 1 },
        end: { ...start, x: start.x - 2 }, 
    };
}

function rightM(start: Position): Move {
    return {
        start,
        jumped: { ...start, x: start.x + 1 },
        end: { ...start, x: start.x + 2 }, 
    };
}

function upRightM(start: Position): Move {
    return {
        start,
        jumped: { ...start, y: start.y - 1 },
        end: { ...start, y: start.y - 2 }, 
    };
}

function upLefttM(start: Position): Move {
    return {
        start,
        jumped: { y: start.y - 1, x: start.x - 1 },
        end: { y: start.y - 2, x: start.x - 2 }, 
    };
}

function downRightM(start: Position): Move {
    return {
        start,
        jumped: { y: start.y + 1, x: start.x + 1 },
        end: { y: start.y + 2, x: start.x + 2 }, 
    };
}

function downLefttM(start: Position): Move {
    return {
        start,
        jumped: { y: start.y + 1, x: start.x },
        end: { y: start.y + 2, x: start.x }, 
    };
}

const moves = [
    leftM,
    rightM,
    upRightM,
    upLefttM,
    downRightM,
    downLefttM,
];