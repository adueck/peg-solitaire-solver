export function organizeSolutions(paths: GameState[]): Solutions {
    const o: Record<number, GameState[]> = {};
    paths.forEach(p => {
        const n = finishesWith(p);
        if (n in o) {
            o[n].push(p);
        } else {
            o[n] = [p];
        }
    });
    const totalLength = paths.length;
    return Object.keys(o).map(k => parseInt(k)).map(n => (
        {
            leaves: n,
            paths: o[n],
            chance: +((o[n].length / totalLength) * 100).toFixed(2),
        }
    ));
}

function finishesWith(p: GameState): number {
    const last = p[p.length - 1];
    let total = 0;
    for (let row of last) {
        for (let col of row) {
            if (col === 1) {
                total++;
            }
        } 
    }
    return total;
}