const GAME_BOARD_SIZE = process.env['BOARD_SIZE'] || 10;

const getNextMoves = (x, y) => ([
    [x+3, y],
    [x, y-3],
    [x-3, y],
    [x, y+3],

    [x+2, y+2],
    [x-2, y-2],
    [x-2, y+2],
    [x+2, y-2]
]);

const xyToOneD = (x, y) => y*GAME_BOARD_SIZE+x;


const isValidMove = (x, y, board) => {
    if(board[xyToOneD(x, y)]) return false

    return (x >= 0 && x <= GAME_BOARD_SIZE-1) && (y >= 0 && y <= GAME_BOARD_SIZE-1)
};

const solve = (x, y, previousMoves, board) => {
    if(previousMoves.length === GAME_BOARD_SIZE*GAME_BOARD_SIZE) return previousMoves;

    for(const [nextX, nextY] of getNextMoves(x, y)) {
        if(!isValidMove(nextX, nextY, board)) continue;

        previousMoves.push(`${nextX},${nextY}`);
        board[xyToOneD(nextX, nextY)] = 1;
        let result = solve(nextX, nextY, previousMoves, board);
        if(result) return result;
        previousMoves.pop();
        board[xyToOneD(nextX, nextY)] = 0;
    }

    return false;
}

const previousMoves = [`0,0`];
const board = Array(GAME_BOARD_SIZE*GAME_BOARD_SIZE).fill(0);
board[0] = 1;
const result = solve(0, 0, previousMoves, board);

if(!result){
    console.log(`No valid solutions`);
    process.exit(0);
}

console.log({result})
console.log(result.length)