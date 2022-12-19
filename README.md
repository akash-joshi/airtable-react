## What is this?



https://user-images.githubusercontent.com/22196279/208398569-cfdf6e68-8498-4f41-98c7-d930b9ec5cf3.mov



A demonstration of my React + Typescript skills, fetching data from an Airtable base on the server-side and displaying an analytics dashboard based on it.

## Analytics Views Provided

1. Total Orders Sold
2. Orders in Current Month - Gives analyst context for orders in current month. For now, it's all orders in current month regardless of year because the orders are only till 2021.
3. Orders in Progress
4. Total Revenue generated till date
5. Top 3 products sold to date - Gives analyst context on the best-selling products so they can double-down on it.
6. Products Least Sold - Gives analyst context on the worst-selling products so they can either try to improve sales, or stop selling the product completely.
7. Sales Trend - Month-over-month sales trend to provide the analyst context over current sales trends.
8. Revenue Trend - Same reasoning as above.
9. A view of recent orders as Table or Airtable, according to the analyst's preference.

## Improvements

1. Improve types used within the app (simplify and combine types).
2. Use `getStaticProps` instead to avoid repeat calls (prevent running out of API requests).

## Using Docker

1. [Install Docker](https://docs.docker.com/get-docker/) on your machine.
1. Build your container: `docker build -t nextjs-docker .`.
1. Run your container: `docker run -p 3000:3000 nextjs-docker`.

You can view your images created with `docker images`.

## Running Locally

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.
