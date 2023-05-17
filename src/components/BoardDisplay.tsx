export function BoardDisplay({ board: b }: { board: Board; }) {
  let t = "";
  for (let i = 0; i < b.length; i++) {
    for (let j = 0; j <= i; j++) {
      t += (b[i][j] === 1 ? "|" : "O") + " ";
    }
    t += "\n";
  }
  return <code><pre style={{ fontSize: "larger" }}>{t}</pre></code>;
}
