import { useMemo } from "react";

export type AirtableRow = {
  order_id: number;
  order_placed: string;
  product_name: string;
  price: number;
  first_name: string;
  last_name: string;
  address: string;
  email: string;
  order_status: string;
};

export function useAirtableData(airtableRows: Array<AirtableRow>): {
  ordersThisMonth: number;
  ordersInProgress: number;
  totalRevenue: number;
  topProducts: Array<[string, number]>;
  bottomProducts: Array<[string, number]>;
  chartData: {
    labels: Array<string>;
    datasets: {
      label: string;
      data: Array<string>;
      borderColor: string;
      backgroundColor: string;
    }[];
  };
} {
  return useMemo(() => {
    const currentMonth = new Date().getMonth();

    let ordersThisMonth = 0;
    let ordersInProgress = 0;
    let totalRevenue = 0;

    const ordersMap: Record<string, number> = {};

    const labelsSet = new Set();

    const revenueDataMap = {};
    const salesDataMap = {};

    for (const airtableRow of airtableRows) {
      const orderDate = new Date(airtableRow.order_placed);
      if (orderDate.getMonth() === currentMonth) {
        ordersThisMonth++;
      }

      if (airtableRow.order_status === "in_progress") {
        ordersInProgress++;
      }

      if (!ordersMap[airtableRow.product_name]) {
        ordersMap[airtableRow.product_name] = 0;
      }

      ordersMap[airtableRow.product_name]++;

      totalRevenue += airtableRow.price;

      const dateLabel = `${
        orderDate.getMonth() + 1
      }/${orderDate.getFullYear()}`;

      labelsSet.add(dateLabel);

      if (!revenueDataMap[dateLabel]) {
        revenueDataMap[dateLabel] = 0;
      }
      revenueDataMap[dateLabel] += airtableRow.price;

      if (!salesDataMap[dateLabel]) {
        salesDataMap[dateLabel] = 0;
      }
      salesDataMap[dateLabel]++;
    }

    const ordersByProduct = Object.entries(ordersMap).sort(
      (orderA, orderB) => orderB[1] - orderA[1]
    );

    const topProducts = ordersByProduct.slice(0, 3);
    const bottomProducts = ordersByProduct.slice(
      ordersByProduct.length - 3,
      ordersByProduct.length
    );

    console.log({ revenueDataMap, salesDataMap });

    const datasets: {
      label: string;
      data: Array<string>;
      borderColor: string;
      backgroundColor: string;
    }[] = [
      {
        label: "Revenue (in £)",
        data: Object.values(revenueDataMap).reverse() as string[],
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "Sales",
        data: Object.values(salesDataMap).reverse() as string[],
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ];

    return {
      ordersThisMonth,
      ordersInProgress,
      totalRevenue,
      topProducts,
      bottomProducts,
      chartData: {
        labels: Array.from(labelsSet).reverse() as string[],
        datasets,
      },
    };
  }, [airtableRows]);
}
