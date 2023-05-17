import { useState, useRef, useEffect } from "react";
import { BoardDisplay } from "./BoardDisplay";
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

// TODO: ref to stop

export default function SolutionsDisplay({ solutions }: { solutions: Solutions }) {
    const [nIndex, setNIndex] = useState<number>(0);
    const [moveNo, setMoveNo] = useState<number>(0);
    const [solutionNo, setSolutionNo] = useState<number>(0);
    const playInterval = useRef<number>(null);
    const paths = solutions[nIndex].paths;
    const p = paths[solutionNo] || paths[0];
    useEffect(() => {
        if (playInterval.current) {
            clearInterval(playInterval.current);
        }
    }, []);
    function playSolutions() {
        // @ts-ignore
        playInterval.current = setInterval(advanceGame, 125);
    }
    function stopSolutions() {
        if (playInterval.current) { 
            clearInterval(playInterval.current);
        }
    }
    function endSolutions() {
        // weird thing we have to do due to avoiding closures in advanceGame
        stopSolutions();
        setSolutionNo(paths.length - 1);
        setMoveNo(p.length - 1);
    }
    function advanceGame() {
        setMoveNo(m => {
            setSolutionNo(s => {
                if (m === p.length - 1) {
                    if (s === paths.length - 1 && playInterval.current) {
                        endSolutions();
                        return s;
                    }
                    return s + 1;
                } else {
                    return s;
                }
            });
            if (m < p.length - 1) {
                return m + 1
            } else {
                return 0;
            }
        });
    }
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
    function nIndexChange(n: number) {
        setMoveNo(0);
        setSolutionNo(0);
        setNIndex(n);
    }
    return <div style={{ margin: "2rem 0", display: "flex", flexDirection: "row", justifyContent: "space-between", flexWrap: "wrap" }}>  
        <div>
        {solutions.length > 1 && <div style={{ fontSize: "smaller" }}>Click row to select solution type</div>}
            <table>
                <thead>
                    <tr>
                        <th style={{ padding: "0 1rem" }}>Pegs Left</th>
                        <th style={{ padding: "0 1rem" }}>Solutions</th>
                        <th>Chance</th>
                    </tr>
                </thead>
                <tbody>
                    {solutions.map((s, i) => <tr
                        className="clickable" key={i} onClick={() => nIndexChange(i)}
                        style={(nIndex === i && solutions.length > 1) ? { outline: "thin solid" } : {}}
                    >
                        <td>{s.leaves}</td>
                        <td>{s.paths.length}</td>
                        <td>{s.chance}%</td>
                    </tr>)}
                </tbody>
            </table>
        </div>
        <div style={{ marginTop: "1rem" }}>
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
            <div style={{ marginTop: "2rem" }}>
                <button onClick={() => playSolutions()} style={{ marginRight: "1rem" }}>
                    ⏵ Play
                </button>
                <button onClick={() => stopSolutions()}>
                    ⏹ Stop 
                </button>
            </div>
        </div>
    </div>;
}