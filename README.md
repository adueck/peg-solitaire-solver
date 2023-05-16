# Peg Solitaire Solver

A brute-force peg solitare solver with an interactive playground to explore the solutions.

[Live Demo](https://adueck.github.io/peg-solitaire-solver)

### The Algorithm

A simple, recursive, brute force algorithm that finds all the possible ways to play the game.

```ts
/**
 * given a state of the game, returns an array of all the possible
 * ways that the game could be played out.
 * (Done with a brutally slow but beautifully recursive and simple algorithm)
 * 
 * @param gs GameState - an array of the board positions played in order
 * @returns an array all the possible ways the game could be played and finished
 */
function solve(gs: GameState): GameState[] {
    // the current board is the last in the list of boards
    // that have been played
    const current = gs[gs.length - 1];
    // find out what possible moves there are by searching the current board
    const moves = allPossibleMoves(current);
    return moves.length === 0
        // if there's no possible moves:
        // you reached the end of this game path.
        // Return the current game state as there are no other
        // possible ways the game could be played out
        ? [gs]
        // if there are maves to be made:
        // create a new path with each possible move,
        // and continue playing down all the new paths
        : moves.map(m => (
            [...gs, applyMove(current, m)]
        )).flatMap(solve);
}
```

For a more advanced approach to the same problem, see [this blog post](https://blogs.sas.com/content/operations/2015/05/20/dinner-with-a-side-order-of-optimization/).

### Development

```
yarn
yarn dev
```
