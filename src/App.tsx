import { Slider } from "@mui/material";
import { useState } from "react";
import "./App.css";
import { checkConnected, generateGraphErdosRenyi } from "./graph/generate";
import LineGraphWithThreshold from "./LineGraphWithThreshold";

function App() {
  const [hundredGraphData, setHundredGraphData] = useState<number[][]>([]);
  const [connectedGraphData, setConnectedGraphData] = useState<number[][]>([]);
  const [connectedGraphProbability, setConnectedGraphProbability] = useState<number>(0.5);
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
  // For scatter plots we pass series data as array of { x, y } points.
  const seriesData = functionData.map((point) => ({ x: point.x, y: point.y }));

  const generate100Graphs = () => {
    let ret = [];
    for (let i = 0; i < 100; i++) {
      const p = Math.random() * maxXValue + minXValue;
      const graph = generateGraphErdosRenyi(1000, p);
      ret.push([p, checkConnected(graph) ? 1 : 0]);
    }
    console.log(ret);
    setHundredGraphData(ret);
  };

  const generateConnectivityData = () => {
    let ret = [];
    for (let n = 2; n <= 100; n++) {
      const graph = generateGraphErdosRenyi(n, connectedGraphProbability, (g) => checkConnected(g));
      ret.push([n, graph.getEdgeCount()]);
    }
    setConnectedGraphData(ret);
    console.log(ret);
  };

  return (
    <div style={{ display: "flex", flexDirection: "row", gap: "20px" }}>
      <div className="card">
        <h1>100 Graphs of size N=1000</h1>
        <LineGraphWithThreshold
          min={-0.1}
          max={1.1}
          xAxis={[
            {
              data: hundredGraphData.length > 0 ? hundredGraphData.map((d) => d[0]) : xAxisData,
              label: "X-axis",
            },
          ]}
          series={[
            {
              // If generated graph data exists, pass it as [{x,y}] points for scatter.
              data:
                hundredGraphData.length > 0
                  ? hundredGraphData.map((d) => ({ x: d[0], y: d[1] }))
                  : seriesData,
              label: "y = x²",
              type: "scatter",
            },
          ]}
          thresholdXPos={verticalBoundary}
          thresholdLabel="ln(N)/N"
        />
        <button onClick={generate100Graphs}>Generate 100 graphs</button>
      </div>
      <div className="card">
        <h1>{"Graph connectivity threshold size 1<N<=100"} </h1>
        <LineGraphWithThreshold
          xAxis={[
            {
              data: connectedGraphData.length > 0 ? connectedGraphData.map((d) => d[0]) : xAxisData,
              label: "X-axis",
            },
          ]}
          series={[
            {
              // If generated graph data exists, pass it as [{x,y}] points for scatter.
              data:
                connectedGraphData.length > 0
                  ? connectedGraphData.map((d) => ({ x: d[0], y: d[1] }))
                  : seriesData,
              label: "y = x²",
              type: "scatter",
            },
          ]}
        />
        <Slider
          value={connectedGraphProbability}
          onChange={(e, val) => setConnectedGraphProbability(val as number)}
          min={0}
          max={1}
          step={0.01}
        />
        <button onClick={generateConnectivityData}>Simulate n=2,n=100 graphs</button>
      </div>
    </div>
  );
}

export default App;
