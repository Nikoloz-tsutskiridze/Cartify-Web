import { Filters, PaginationContainer, ProductsContainer } from "../components";
import { customFetch } from "../utils";

const url = "/products";

export const loader = async function ({ request }) {
  const params = Object.fromEntries([
    ...new URL(request.url).searchParams.entries(),
  ]);
  const response = await customFetch(url, { params });
  const products = response.data.data;
  const meta = response.data.meta;

  return { meta, products, params };
};

function Products() {
  return (
    <div className="align-element">
      <Filters />
      <ProductsContainer />
      <PaginationContainer />
    </div>
  );
}

export default Products;
