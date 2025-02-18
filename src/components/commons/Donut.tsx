import React from "react";
import { PieChart, Pie, Tooltip, ResponsiveContainer, Cell } from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

export interface Props {
  data: {
    name: string;
    value: number;
  }[];
  width?: number;
  height?: number;
  innerRadius?: number;
  outerRadius?: number;
}

export default function Donut<T>({
  data,
  width = 400,
  height = 400,
  innerRadius = 50,
  outerRadius = 100,
}: Props) {
  return (
    <>
      <div data-testid="donut-graph" />
      <ResponsiveContainer width="100%" height="100%">
        <PieChart width={width} height={height}>
          <Pie
            dataKey="value"
            data={data}
            innerRadius={innerRadius}
            outerRadius={outerRadius}
          >
            {data &&
              data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </>
  );
}
