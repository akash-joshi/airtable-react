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
import faker from "faker";
import { Box, Title } from "@mantine/core";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

const labels = ["January", "February", "March", "April", "May", "June", "July"];

export const data = {
  labels,
  datasets: [
    {
      label: "Dataset 1",
      data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
      borderColor: "rgb(255, 99, 132)",
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
    {
      label: "Dataset 2",
      data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
      borderColor: "rgb(53, 162, 235)",
      backgroundColor: "rgba(53, 162, 235, 0.5)",
    },
  ],
};

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
