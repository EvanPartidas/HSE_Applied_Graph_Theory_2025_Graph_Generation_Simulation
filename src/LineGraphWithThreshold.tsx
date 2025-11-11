// Example.jsx / Example.tsx
import {
  ChartContainer,
  ChartsReferenceLine,
  ChartsXAxis,
  ChartsYAxis,
  LinePlot,
} from "@mui/x-charts";

export type LineGraphProps = {
  xAxis: { data: number[]; label: string }[];
  series: { data: number[]; label: string; type: "line" }[];
  thresholdXPos: number;
  thresholdLabel: string;
};

export default function LineGraphWithThreshold({
  xAxis,
  series,
  thresholdXPos,
  thresholdLabel,
}: LineGraphProps) {
  return (
    <ChartContainer
      xAxis={xAxis}
      series={series}
      height={300}
      margin={{ left: 50, right: 50, top: 30, bottom: 30 }}
    >
      <LinePlot />
      <ChartsReferenceLine
        x={thresholdXPos} // number | Date | string — vertical line
        label={thresholdLabel}
        labelAlign="start"
        lineStyle={{ stroke: "red", strokeWidth: 2, strokeDasharray: "4 4" }}
        labelStyle={{ fontSize: 20, fill: "red" }}
      />
      <ChartsXAxis />
      <ChartsYAxis />
    </ChartContainer>
  );
}
