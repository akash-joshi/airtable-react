import { useMemo, useState } from "react";
import {
  createStyles,
  Table,
  ScrollArea,
  UnstyledButton,
  Group,
  Text,
  Center,
  TextInput,
  Box,
} from "@mantine/core";
import { keys } from "@mantine/utils";
import {
  IconSelector,
  IconChevronDown,
  IconChevronUp,
  IconSearch,
  IconMenuOrder,
} from "@tabler/icons";
import { AirtableRow } from "./useAirtableData";

const PAGE_SIZE = 5;

const useStyles = createStyles((theme) => ({
  th: {
    padding: "0 !important",
  },

  control: {
    width: "100%",
    padding: `${theme.spacing.xs}px ${theme.spacing.md}px`,

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
    },
  },

  icon: {
    width: 21,
    height: 21,
    borderRadius: 21,
  },
}));

interface TableSortProps {
  airtableRows: Array<AirtableRow>;
}

interface ThProps {
  children: React.ReactNode;
  reversed: boolean;
  sorted: boolean;
  onSort(): void;
}

function Th({ children, reversed, sorted, onSort }: ThProps) {
  const { classes } = useStyles();
  const Icon = sorted
    ? reversed
      ? IconChevronUp
      : IconChevronDown
    : IconSelector;
  return (
    <th className={classes.th}>
      <UnstyledButton onClick={onSort} className={classes.control}>
        <Group position="apart">
          <Text weight={500} size="sm">
            {children}
          </Text>
          <Center className={classes.icon}>
            <Icon size={14} stroke={1.5} />
          </Center>
        </Group>
      </UnstyledButton>
    </th>
  );
}

function filterData(data: AirtableRow[], search: string) {
  const query = search.toLowerCase().trim();
  return data.filter((item) =>
    keys(data[0]).some((key) =>
      item[key].toString().toLowerCase().includes(query)
    )
  );
}

function sortData(
  data: AirtableRow[],
  payload: {
    sortBy: keyof AirtableRow | null;
    reversed: boolean;
    search: string;
  }
) {
  const { sortBy } = payload;

  if (!sortBy) {
    return filterData(data, payload.search);
  }

  return filterData(
    [...data].sort((a, b) => {
      if (payload.reversed) {
        return b[sortBy].toString().localeCompare(a[sortBy].toString());
      }

      return a[sortBy].toString().localeCompare(b[sortBy].toString());
    }),
    payload.search
  );
}

export function AirtableTable({ airtableRows }: TableSortProps) {
  const [search, setSearch] = useState("");
  const [sortedData, setSortedData] = useState(airtableRows);
  const [sortBy, setSortBy] = useState<keyof AirtableRow | null>(
    "order_placed"
  );
  const [reverseSortDirection, setReverseSortDirection] = useState(true);

  const setSorting = (field: keyof AirtableRow) => {
    const reversed = field === sortBy ? !reverseSortDirection : false;
    setReverseSortDirection(reversed);
    setSortBy(field);
    setSortedData(sortData(airtableRows, { sortBy: field, reversed, search }));
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget;
    setSearch(value);
    setSortedData(
      sortData(airtableRows, {
        sortBy,
        reversed: reverseSortDirection,
        search: value,
      })
    );
  };

  const orders = useMemo(() => {
    return sortedData.slice(0, 5).map((order) => (
      <tr key={order.order_id}>
        <td>{order.order_id}</td>
        <td>{order.order_placed}</td>
        <td>{order.product_name}</td>
        <td>{order.price}</td>
        <td>{order.first_name}</td>
        <td>{order.last_name}</td>
        <td>{order.address}</td>
        <td>{order.order_status}</td>
      </tr>
    ));
  }, [sortedData]);

  return (
    <Box>
      <TextInput
        placeholder="Search by any field"
        mb="md"
        icon={<IconSearch size={14} stroke={1.5} />}
        value={search}
        onChange={handleSearchChange}
      />
      <ScrollArea>
        <Table
          horizontalSpacing="md"
          verticalSpacing="xs"
          sx={{ tableLayout: "fixed", minWidth: 700, animation: "fadeIn 1s" }}
        >
          <thead>
            <tr>
              <Th
                sorted={sortBy === "order_id"}
                reversed={reverseSortDirection}
                onSort={() => setSorting("order_id")}
              >
                Order ID
              </Th>
              <Th
                sorted={sortBy === "order_placed"}
                reversed={reverseSortDirection}
                onSort={() => setSorting("order_placed")}
              >
                Order Placed
              </Th>
              <Th
                sorted={sortBy === "product_name"}
                reversed={reverseSortDirection}
                onSort={() => setSorting("product_name")}
              >
                Product Name
              </Th>
              <Th
                sorted={sortBy === "price"}
                reversed={reverseSortDirection}
                onSort={() => setSorting("price")}
              >
                Price
              </Th>
              <Th
                sorted={sortBy === "first_name"}
                reversed={reverseSortDirection}
                onSort={() => setSorting("first_name")}
              >
                First Name
              </Th>
              <Th
                sorted={sortBy === "last_name"}
                reversed={reverseSortDirection}
                onSort={() => setSorting("last_name")}
              >
                Last Name
              </Th>
              <Th
                sorted={sortBy === "address"}
                reversed={reverseSortDirection}
                onSort={() => setSorting("address")}
              >
                Address
              </Th>
              <Th
                sorted={sortBy === "order_status"}
                reversed={reverseSortDirection}
                onSort={() => setSorting("order_status")}
              >
                Order Status
              </Th>
            </tr>
          </thead>
          <tbody>
            {orders.length > 0 ? (
              orders
            ) : (
              <tr>
                <td colSpan={Object.keys(airtableRows[0]).length}>
                  <Text weight={500} align="center">
                    Nothing found
                  </Text>
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </ScrollArea>
    </Box>
  );
}
