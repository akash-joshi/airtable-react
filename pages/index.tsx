import {
  Box,
  Title,
  Text,
  Card,
  Group,
  Switch,
  Grid,
  List,
} from "@mantine/core";
import Airtable from "airtable";
import { AirtableRow, useAirtableData } from "../components/useAirtableData";
import { AirtableTable } from "../components/AirtableTable";
import { useState } from "react";
import {
  IconBasket,
  IconBuildingBank,
  IconCalendarStats,
  IconListDetails,
} from "@tabler/icons";
import CountUp from "react-countup";
import { TrendsChart } from "../components/LineChart";

const BASE_ID = "app8wLQrrIMrnn673";
const TABLE_ID = "tblZBNaHCGVfA9xw1";

const data = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

export default function Home({
  airtableRows,
}: {
  airtableRows: Array<AirtableRow>;
}) {
  const [showAirtable, setShowAirtable] = useState(false);

  const {
    bottomProducts,
    ordersInProgress,
    ordersThisMonth,
    topProducts,
    totalRevenue,
    chartData: { labels, datasets },
  } = useAirtableData(airtableRows);

  return (
    <Box>
      <Box
        component="main"
        px={15}
        my={"1em"}
        sx={{ maxWidth: 1000, margin: "0 auto" }}
      >
        <Box sx={{ textAlign: "center" }} mb={"1em"}>
          <Title order={1}>
            Welcome to{" "}
            <Text
              display={"inline"}
              variant="gradient"
              gradient={{ from: "#f12711", to: "#f5af19", deg: 90 }}
            >
              Purrfect Creations
            </Text>
          </Title>
          <Title color={"gray.8"} order={2}>
            Here are your latest analytics!
          </Title>
        </Box>

        <Grid>
          <Grid.Col md={6}>
            <Card withBorder>
              <Box
                display={"flex"}
                sx={(theme) => ({
                  justifyContent: "space-between",
                  color: theme.colors.pink[5],
                  fontSize: "1.5rem",
                  alignItems: "center",
                })}
              >
                <Text
                  sx={{ fontFamily: "'Poppins', sans-serif", fontWeight: 500 }}
                >
                  Total Orders{" "}
                </Text>

                <IconListDetails height={"1em"} width={"1em"} />
              </Box>
              <Text color={"gray.9"} sx={{ fontSize: "1.25rem" }}>
                <CountUp duration={0.75} end={airtableRows.length} />
              </Text>
            </Card>
          </Grid.Col>
          <Grid.Col md={6}>
            <Card withBorder>
              <Box
                display={"flex"}
                sx={(theme) => ({
                  justifyContent: "space-between",
                  color: theme.colors.violet[5],
                  fontSize: "1.5rem",
                  alignItems: "center",
                })}
              >
                <Text
                  sx={{ fontFamily: "'Poppins', sans-serif", fontWeight: 500 }}
                >
                  Orders in{" "}
                  {new Date().toLocaleString("default", { month: "long" })}
                </Text>

                <IconCalendarStats height={"1em"} width={"1em"} />
              </Box>
              <Text color={"gray.9"} sx={{ fontSize: "1.25rem" }}>
                <CountUp duration={0.75} end={ordersThisMonth} />
              </Text>
            </Card>
          </Grid.Col>
          <Grid.Col md={6}>
            <Card withBorder>
              <Box
                display={"flex"}
                sx={(theme) => ({
                  justifyContent: "space-between",
                  color: theme.colors.cyan[5],
                  fontSize: "1.5rem",
                  alignItems: "center",
                })}
              >
                <Text
                  sx={{ fontFamily: "'Poppins', sans-serif", fontWeight: 500 }}
                >
                  Orders in Progress
                </Text>

                <IconBasket height={"1em"} width={"1em"} />
              </Box>
              <Text color={"gray.9"} sx={{ fontSize: "1.25rem" }}>
                <CountUp duration={0.75} end={ordersInProgress} />
              </Text>
            </Card>
          </Grid.Col>
          <Grid.Col md={6}>
            <Card withBorder>
              <Box
                display={"flex"}
                sx={(theme) => ({
                  justifyContent: "space-between",
                  color: theme.colors.yellow[5],
                  fontSize: "1.5rem",
                  alignItems: "center",
                })}
              >
                <Text
                  sx={{ fontFamily: "'Poppins', sans-serif", fontWeight: 500 }}
                >
                  Revenue to date
                </Text>

                <IconBuildingBank height={"1em"} width={"1em"} />
              </Box>
              <Text color={"gray.9"} sx={{ fontSize: "1.25rem" }}>
                £
                <CountUp
                  duration={0.75}
                  end={totalRevenue}
                  separator={","}
                  decimals={2}
                />
              </Text>
            </Card>
          </Grid.Col>
          <Grid.Col md={6}>
            <Card withBorder>
              <Text
                sx={(theme) => ({
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: 500,
                  color: theme.colors.green[5],
                  fontSize: "1.5rem",
                })}
              >
                Top Products 🔥
              </Text>
              <List sx={{ animation: "fadeIn 1s" }}>
                {topProducts.map((topProduct) => (
                  <List.Item key={topProduct[0]}>
                    {topProduct[0]} - {topProduct[1]} sales
                  </List.Item>
                ))}
              </List>
            </Card>
          </Grid.Col>
          <Grid.Col md={6}>
            <Card withBorder>
              <Text
                sx={(theme) => ({
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: 500,
                  color: theme.colors.red[5],
                  fontSize: "1.5rem",
                })}
              >
                Products Least Sold 📉
              </Text>
              <List sx={{ animation: "fadeIn 1s" }}>
                {bottomProducts.reverse().map((bottomProduct) => (
                  <List.Item key={bottomProduct[0]}>
                    {bottomProduct[0]} - {bottomProduct[1]} sales
                  </List.Item>
                ))}
              </List>
            </Card>
          </Grid.Col>
        </Grid>

        <Title color={"gray.7"} order={3} align={"center"} mt={"1em"}>
          Sales Trend
        </Title>

        <TrendsChart datasets={[datasets[1]]} labels={labels} />

        <Title color={"gray.7"} order={3} align={"center"} mt={"1em"}>
          Revenue Trend
        </Title>

        <TrendsChart datasets={[datasets[0]]} labels={labels} />

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "1.5em",
            marginBottom: "0.75em",
          }}
        >
          <Title color={"gray.8"} order={3}>
            Recent Orders
          </Title>
          <Group position="right">
            View as Airtable
            <Switch
              checked={showAirtable}
              onChange={() => setShowAirtable(!showAirtable)}
              size="md"
            />
          </Group>
        </Box>

        {showAirtable ? (
          <iframe
            className="airtable-embed"
            src="https://airtable.com/embed/shrhhn40SSOHBQ0ko?backgroundColor=cyan&viewControls=on"
            width="100%"
            height="533"
            style={{ background: "transparent", border: "1px solid #ccc" }}
          ></iframe>
        ) : (
          <Card withBorder>
            <AirtableTable airtableRows={airtableRows} />
          </Card>
        )}
      </Box>
    </Box>
  );
}

// this runs on the server
export async function getServerSideProps() {
  const base = new Airtable({
    apiKey: process.env.AIRTABLE_apiKey,
  }).base(BASE_ID);

  const airtableRows: Array<AirtableRow> = [];

  await base<AirtableRow>(TABLE_ID)
    .select({
      view: "Grid view",
      sort: [{ field: "order_placed", direction: "desc" }],
    })
    .eachPage(function page(records, fetchNextPage) {
      // This function (`page`) will get called for each page of records.

      records.forEach(function (record) {
        airtableRows.push(record.fields);
      });

      // To fetch the next page of records, call `fetchNextPage`.
      // If there are more records, `page` will get called again.
      // If there are no more records, `done` will get called.
      fetchNextPage();
    });

  return {
    props: { airtableRows }, // will be passed to the page component as props
  };
}
