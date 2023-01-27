const sleep = (ms) => new Promise((res) => setTimeout(res, ms));

const drive = async (movelist) => {
    for(const move of movelist){
        const [x,y] = move.split(",")
        document.getElementById(`${y}_${x}`).click();
        await sleep(150);
    }
}

const driveInverse = async (movelist) => {
    for(const move of movelist){
        const [x,y] = move.split(",")
        document.getElementById(`${x}_${y}`).click();
        await sleep(150);
    }
}