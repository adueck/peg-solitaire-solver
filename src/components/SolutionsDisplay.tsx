import { useEffect, useState } from "react";
import { BoardDisplay } from "./BoardDisplay";
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

export default function SolutionsDisplay({ solutions }: { solutions: Solutions }) {
    const [nIndex, setNIndex] = useState<number | undefined>(undefined);
    return <div style={{ margin: "2rem 0", display: "flex", flexDirection: "row", justifyContent: "space-between", flexWrap: "wrap" }}>  
        <table style={{ margin: "0 2rem" }}>
            <thead>
                <tr>
                    <th style={{ padding: "0 1rem" }}>Pegs Left</th>
                    <th style={{ padding: "0 1rem" }}>Solutions</th>
                    <th>Chance</th>
                </tr>
            </thead>
            <tbody>
                {solutions.map((s, i) => <tr key={i} onClick={() => setNIndex(i)}>
                    <td style={{ color: i === nIndex ? "red" : "blue" }}>{s.leaves}</td>
                    <td>{s.paths.length}</td>
                    <td>{s.chance}%</td>
                </tr>)}
            </tbody>
        </table>
        {nIndex !== undefined
            ? <GameViewer paths={solutions[nIndex].paths} />
            : <div>Select a line from the table of solutions</div>}
    </div>;
}

function GameViewer({ paths }: { paths: GameState[] }) {
    const [moveNo, setMoveNo] = useState<number>(0);
    const [solutionNo, setSolutionNo] = useState<number>(0);
    useEffect(() => {
        setMoveNo(0);
        setSolutionNo(0);
    }, [paths]);
    const p = paths[solutionNo];
    function forward() {
        setMoveNo(s => s < p.length - 1 ? s + 1 : s);
    }
    function back() {
        setMoveNo(s => s > 0 ? s - 1 : s);
    }
    function sliderChange(x: number | number[]) {
        const n = Array.isArray(x) ? x[0] : x;
        setMoveNo(0);
        setSolutionNo(n);
    }
    return <div style={{ marginTop: "1rem" }}>
        <div>Solution Number: {solutionNo + 1} </div>
        <div style={{ margin: "1rem 0" }}>
            <Slider
                min={0}
                max={paths.length - 1}
                onChange={sliderChange}
                value={solutionNo}
            />
        </div>
        <div style={{ marginBottom: "2rem" }}> 
            <button onClick={back}>{`<<`}</button>
                <span style={{ margin: "0 2rem" }}>Move: {moveNo}</span>
            <button onClick={forward}>{`>>`}</button>
        </div>
        {p[moveNo] && <BoardDisplay board={p[moveNo]} />}
    </div>;
}