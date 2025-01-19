/* eslint-disable react-refresh/only-export-components */

import { Filters, PaginationContainer, ProductContainer } from "../components";
import { customFetch } from "../utils";

const url = "/products";

const allProductQuery = (queryParams) => {
  const { search, category, company, sort, price, shipping, page } =
    queryParams;
  return {
    queryKey: [
      "products",
      search ?? "",
      category ?? "all",
      company ?? "all",
      sort ?? "a-z",
      price ?? 100000,
      shipping ?? false,
      page ?? 1,
    ],
    queryFn: () => customFetch(url, {
      params: queryParams,
    })
  };
};

export const loader =
  (queryClient) =>
  async ({ request }) => {
    const params = Object.fromEntries([
      ...new URL(request.url).searchParams.entries(),
    ]);

    const response = await queryClient.ensureQueryData(allProductQuery(params))
    const meta = response.data.meta;
    const products = response.data.data;
    return { products, meta, params };
  };

const Products = () => {
  return (
    <>
      <Filters />
      <ProductContainer />
      <PaginationContainer />
    </>
  );
};
export default Products;
