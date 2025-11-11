// Example.jsx / Example.tsx
import {
  ChartContainer,
  ChartsReferenceLine,
  ChartsXAxis,
  ChartsYAxis,
  ScatterPlot,
} from "@mui/x-charts";

export type LineGraphProps = {
  xAxis: { data: number[]; label: string }[];
  // allow any series shape (delegate to chart lib types at runtime)
  series: any[];
  thresholdXPos?: number;
  thresholdLabel?: string;
  max?: number;
  min?: number;
};

export default function LineGraphWithThreshold({
  xAxis,
  series,
  thresholdXPos,
  thresholdLabel,
  min,
  max,
}: LineGraphProps) {
  return (
    <ChartContainer
      xAxis={xAxis}
      series={series}
      yAxis={[{ min, max }]}
      height={300}
      margin={{ left: 50, right: 50, top: 30, bottom: 30 }}
    >
      <ScatterPlot />
      {thresholdXPos && (
        <ChartsReferenceLine
          x={thresholdXPos} // number | Date | string — vertical line
          label={thresholdLabel}
          labelAlign="start"
          lineStyle={{ stroke: "red", strokeWidth: 2, strokeDasharray: "4 4" }}
          labelStyle={{ fill: "red", fontSize: 20 }}
        />
      )}
      <ChartsXAxis />
      <ChartsYAxis />
    </ChartContainer>
  );
}
