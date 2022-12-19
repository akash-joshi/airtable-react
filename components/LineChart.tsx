import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { Box } from "@mantine/core";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

export function TrendsChart({
  labels,
  datasets,
}: {
  labels: Array<string>;
  datasets: {
    label: string;
    data: Array<string>;
    borderColor: string;
    backgroundColor: string;
  }[];
}) {
  return (
    <Box sx={{ maxHeight: "300px" }}>
      <Line
        options={{
          plugins: {
            legend: {
              position: "top" as const,
            },
          },
          maintainAspectRatio: false,
        }}
        height={"300px"}
        data={{
          labels,
          datasets,
        }}
      />
    </Box>
  );
}
