import { useState } from "react";
import "./App.css";
import reactLogo from "./assets/react.svg";
import LineGraphWithThreshold from "./LineGraphWithThreshold";
import viteLogo from "/vite.svg";

function App() {
  const [count, setCount] = useState(0);
  const generateFunctionData = (
    func: (x: number) => number,
    rangeStart: number,
    rangeEnd: number,
    numPoints: number
  ) => {
    const data = [];
    const step = (rangeEnd - rangeStart) / (numPoints - 1);
    for (let i = 0; i < numPoints; i++) {
      const x = rangeStart + i * step;
      const y = func(x);
      data.push({ x, y });
    }
    return data;
  };

  const lnOverNFunction = (x: number) => (x == 0 ? 0 : Math.log(x) / x);
  const verticalBoundary = lnOverNFunction(1000);
  const maxXValue = verticalBoundary * 2;
  const minXValue = 0.001;
  const functionData = generateFunctionData(lnOverNFunction, minXValue, maxXValue, 100);
  const xAxisData = functionData.map((point) => point.x);
  const seriesData = functionData.map((point) => point.y);
  console.log(functionData);

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <LineGraphWithThreshold
        xAxis={[{ data: xAxisData, label: "X-axis" }]}
        series={[{ data: seriesData, label: "y = x²", type: "line" }]}
        thresholdXPos={verticalBoundary}
        thresholdLabel="ln(n)/n"
      />
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>count is {count}</button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">Click on the Vite and React logos to learn more</p>
    </>
  );
}

export default App;
