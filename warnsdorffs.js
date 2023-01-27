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
    previousMoves.push(`${x},${y}`);
    board[y*GAME_BOARD_SIZE+x] = 1;

    if(previousMoves.length === GAME_BOARD_SIZE*GAME_BOARD_SIZE){
        return previousMoves
    }

    const nextPositions = getNextMoves(x, y).filter(([nextX, nextY]) => isValidMove(nextX, nextY, board));
    if(nextPositions.length === 0){
        throw new Error("invalid configuration");
    }
    const [minimumDegree] = nextPositions.sort(([xA, yA], [xB, yB]) => getDegree(xA, yA, board) - getDegree(xB, yB, board));
    const [nextX, nextY] = minimumDegree;

    return solve(nextX, nextY, previousMoves, board);
}

const metrics = {
    valid: 0,
    invalid: 0
}

for(let i = 0; i < GAME_BOARD_SIZE*GAME_BOARD_SIZE; i += 1){
    const x = i % GAME_BOARD_SIZE;
    const y = Math.floor(i / GAME_BOARD_SIZE);

    try{
        const result = solve(x, y, [], Array(GAME_BOARD_SIZE*GAME_BOARD_SIZE).fill(0));

        metrics.valid += 1;
    }catch(_){
        metrics.invalid += 1
        console.log(`invalid ${x},${y}`);
    }
}

console.log(`Success rate: ${metrics.valid /( metrics.valid+metrics.invalid)}`);