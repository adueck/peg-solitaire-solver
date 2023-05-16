type H = 0 | 1;

type Board = H[][];

type GameState = Board[];

type Position = {
    x: number,
    y: number,
};

type Move = {
    start: Position,
    jumped: Position,
    end: Position,
};

type Solutions = { leaves: number, chance: number, paths: GameState[] }[];

