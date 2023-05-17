import { useState } from 'react'
import './App.css';
import { getSolutions, makeStarter } from './lib/solver';
import { BoardDisplay } from './components/BoardDisplay';
import SolutionsDisplay from './components/SolutionsDisplay';
const maxRows = 5;
const minRows = 3;

function App() {
  const [rows, setRows] = useState<number>(3);
  const [startingPos, setStartingPos] = useState<number>(0);
  const [solutions, setSolutions] = useState<undefined | "solving" | Solutions>(undefined);
  function incRows() {
    if (rows < maxRows) {
      setRows(r => r + 1);
      setSolutions(undefined);
      setStartingPos(0);
    }
  }
  function decRows() {
    if (rows > minRows) {
      setRows(r => r - 1);
      setSolutions(undefined);
      setStartingPos(0);
    }
  }
  function incStartingPos() {
    const maxPos = rows - 2;
    if (startingPos < maxPos) {
      setStartingPos(p => p + 1);
    } else {
      setStartingPos(0);
    }
    setSolutions(undefined);
  }
  function solve() {
    setSolutions("solving");
    setTimeout(() => {
      setSolutions(getSolutions(rows, startingPos))
    }, 100);
  }
  return (
    <>
      <h1>Peg Solitaire Solver</h1>
      <p>A brute-force peg solitaire solver with an interactive playground to explore the solutions</p>
      <p><a href="https://github.com/adueck/peg-solitaire-solver">Source Code</a></p>
      <p><em>Select 5 rows for the full Crackel Barrel game</em></p>
      <div style={{ margin: "1rem 0" }}> 
        <button onClick={decRows}>{rows > minRows ? "-" : '\u00A0'}</button>
          <span style={{ margin: "0 2rem" }}>Rows: {rows}</span>
        <button onClick={incRows} style={{ marginRight: "1rem" }}>{rows < maxRows ? "+" : '\u00A0'}</button>
      </div>
      <div style={{ margin: "1rem 0" }}>
        <span style={{ margin: "0 2rem" }}>Starting Pos:</span>
        <button onClick={incStartingPos}>{`>`}</button>
      </div>
      {solutions !== "solving" && <button onClick={solve}>Solve</button>}
      {rows === 5 && solutions === undefined && <p>Warning: solving will take time</p>}
      <div>
        {rows === 5 && solutions === "solving" && <samp>solving...</samp>}
      </div>
      {solutions === undefined || solutions === "solving"
        ? <BoardDisplay board={makeStarter(rows, startingPos)} />
        : <SolutionsDisplay solutions={solutions} />}
    </>
  )
}

export default App
