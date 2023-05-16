import { useState } from 'react'
import './App.css';
import { getSolutions, makeStarter } from './lib/solver';
import { BoardDisplay } from './components/BoardDisplay';
import SolutionsDisplay from './components/SolutionsDisplay';
const maxRows = 5;
const minRows = 3;

function App() {
  const [rows, setRows] = useState<number>(3);
  const [solutions, setSolutions] = useState<undefined | "solving" | Solutions>(undefined);
  function incRows() {
    if (rows < maxRows) {
      setRows(r => r + 1);
      setSolutions(undefined);
    }
  }
  function decRows() {
    if (rows > minRows) {
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
      <p>A brute-force peg-solitaire solver with an interactive playground to explore the solutions - <a href="https://github.com/adueck/peg-solitare-solver">Source Code</a></p>
      <div style={{ marginBottom: "2rem", marginTop: "2rem" }}> 
        <button onClick={decRows}>-</button>
          <span style={{ margin: "0 2rem" }}>Rows: {rows}</span>
        <button onClick={incRows}>+</button>
      </div>
      {solutions !== "solving" && <button onClick={solve}>Solve</button>}
      {rows === 5 && solutions === undefined && <p>Warning: Will take a lot of time / memory</p>}
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
