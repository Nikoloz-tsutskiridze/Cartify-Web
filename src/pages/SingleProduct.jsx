import { useLoaderData } from "react-router";
import { customFetch, formatPrice, generateAmountOptions } from "../utils";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addItem } from "../featured/cart/cartSlice";

const singleProductQuery = (id) => {
  return {
    queryKey: ["singleProduct", id],
    queryFn: () => customFetch(`/products/${id}`),
  };
};

export const loader = (queryClient) =>
  async function ({ params }) {
    const response = await queryClient.ensureQueryData(
      singleProductQuery(params.id)
    );

    return { product: response.data.data };
  };

function SingleProduct() {
  const { product } = useLoaderData();
  const { image, title, price, description, colors, company } =
    product.attributes;
  const dollarsAmount = formatPrice(price);

  const [productColor, setProductColor] = useState(colors[0]);
  const [amount, setAmount] = useState(1);

  function handleAmount(e) {
    setAmount(parseInt(e.target.value));
  }

  const cartProduct = {
    cartID: product.id + productColor,
    productID: product.id,
    image,
    title,
    price,
    company,
    productColor,
    amount,
  };

  const dispatch = useDispatch();

  function addToCart() {
    dispatch(addItem({ product: cartProduct }));
  }

  return (
    <section className="align-element ">
      <div className="text-md breadcrumbs ">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/products">Products</Link>
          </li>
        </ul>
      </div>

      <div className="mt-6 grid gap-y8 lg:grid-cols-2 lg:gap-x-16">
        <img
          src={image}
          alt={title}
          className="w-96 h-[574px] object-cover rounded-lg lg:w-full"
        />
        <div>
          <div className="flex justify-between">
            <h1 className="capitalize text-3xl font-bold">{title}</h1>
            <button className="btn bg-base-200">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-slate-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
            </button>
          </div>
          <h4 className="text-xl text-slate-500 font-bold mt-2">{company}</h4>
          <p className="mt-3 text-xl">{dollarsAmount}</p>
          <p className="mt-6 leading-8">{description}</p>

          <div className="mt-8">
            <h4 className="text-md font-medium tracking-wider capitalize">
              colors
            </h4>

            <div className="mt-2">
              {colors.map((color) => (
                <button
                  key={color}
                  type="button"
                  className={`badge w-6 h-6 mr-2 ${
                    color === productColor ? "border-2 border-primary" : ""
                  }`}
                  style={{ backgroundColor: color }}
                  onClick={() => setProductColor(color)}
                ></button>
              ))}
            </div>
          </div>

          <div className="form-control w-full max-w-xs">
            <label className="label" htmlFor="amount">
              <h4 className="text-md font-medium tracking-wider capitalize">
                amount
              </h4>
            </label>
            <select
              className="select select-slate-200 w-full max-w-xs text-slate-500 bg-base-200"
              id="amount"
              value={amount}
              onChange={handleAmount}
            >
              {generateAmountOptions(15)}
            </select>
          </div>
          <div className="mt-10">
            <button className="btn btn-active btn-primary " onClick={addToCart}>
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SingleProduct;
