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

const isValidMove = (x, y, board) => {
    if(board[y*GAME_BOARD_SIZE+x]) return false;

    return (x >= 0 && x <= GAME_BOARD_SIZE-1) && (y >= 0 && y <= GAME_BOARD_SIZE-1)
};

const getDegree = (x, y, board) => {
    let count = 0;

    for(const[nextX, nextY] of getNextMoves(x, y)){
        if(isValidMove(nextX, nextY, board)){
            count += 1;
        }
    }

    return count;
}

const solve = (x, y, previousMoves, board) => {
    if(previousMoves.length === GAME_BOARD_SIZE*GAME_BOARD_SIZE){
        return previousMoves
    }

    const nextPositions = getNextMoves(x, y).filter(([nextX, nextY]) => isValidMove(nextX, nextY, board));

    if(nextPositions.length === 0) return false;

    nextPositions.sort(([xA, yA], [xB, yB]) => getDegree(xA, yA, board) - getDegree(xB, yB, board));

    for(const [nextX, nextY] of nextPositions) {
        previousMoves.push(`${x},${y}`);
        board[y*GAME_BOARD_SIZE+x] = 1;
        const result = solve(nextX, nextY, previousMoves, board);
        if(result){
            return result;
        }

        previousMoves.pop();
        board[y*GAME_BOARD_SIZE+x] = 0;
    }

    return false;
}

const metrics = {
    valid: 0,
    invalid: 0
}

for(let i = 0; i < GAME_BOARD_SIZE*GAME_BOARD_SIZE; i += 1){
    const x = i % GAME_BOARD_SIZE;
    const y = Math.floor(i / GAME_BOARD_SIZE);
    const board = Array(GAME_BOARD_SIZE*GAME_BOARD_SIZE).fill(0);
    const previousMoves = [`${x},${y}`];

    board[y*GAME_BOARD_SIZE+x] = 1;
    const result = solve(x, y, previousMoves, board);
    console.log(`testing ${x},${y}`);
    if(result){
        console.log(`\t\tvalid`);
        metrics.valid += 1;
    } else {
        metrics.invalid += 1
        console.log(`\t\tinvalid`);
    }
}

console.log(`Success rate: ${metrics.valid /( metrics.valid+metrics.invalid)}`);