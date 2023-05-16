import { useState } from 'react'
import './App.css';
import { getSolutions, makeStarter } from './lib/solver';
import { BoardDisplay } from './components/BoardDisplay';
import SolutionsDisplay from './components/SolutionsDisplay';

function App() {
  const [rows, setRows] = useState<number>(3);
  const [solutions, setSolutions] = useState<undefined | "solving" | Solutions>(undefined);
  function incRows() {
    if (rows < 5) {
      setRows(r => r + 1);
      setSolutions(undefined);
    }
  }
  function decRows() {
    if (rows > 3) {
      setRows(r => r - 1);
      setSolutions(undefined);
    }
  }
  function solve() {
    setSolutions("solving");
    setTimeout(() => {
      setSolutions(getSolutions(rows))
    }, 100);
  }
  return (
    <>
      <h1>Peg Solitaire Solver</h1>
      <p>A brute-force peg-solitare solver with an interactive playground to explore the solutions - <a href="https://github.com/adueck/peg-solitare-solver">Source Code</a></p>
      <div style={{ marginBottom: "2rem" }}> 
        <button onClick={decRows}>-</button>
          <span style={{ margin: "0 2rem" }}>Rows: {rows}</span>
        <button onClick={incRows}>+</button>
      </div>
      {solutions !== "solving" && <button onClick={solve}>Solve</button>}
      {rows === 5 && solutions === undefined && <p>Warning: Will take a LOT of time / memory</p>}
      <div>
        {rows === 5 && solutions === "solving" && <samp>solving...</samp>}
      </div>
      {solutions === undefined || solutions === "solving"
        ? <BoardDisplay board={makeStarter(rows)} />
        : <SolutionsDisplay solutions={solutions} />}
    </>
  )
}

export default App
