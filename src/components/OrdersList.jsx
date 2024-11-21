import { useLoaderData } from "react-router-dom";
import day from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";

day.extend(advancedFormat);

const OrdersList = () => {
  const { orders, meta } = useLoaderData();

  if (orders.length === 0) {
    return <p className="text-center mt-4">No orders found.</p>;
  }

  return (
    <div className="mt-8">
      <h4 className="mb-4 capitalize">Total Orders: {meta.pagination.total}</h4>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          <caption className="sr-only">List of Orders</caption>
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Address</th>
              <th scope="col">Products</th>
              <th scope="col">Cost</th>
              <th scope="col" className="hidden sm:block">
                Date
              </th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => {
              const id = order.id;
              const { name, address, numItemsInCart, orderTotal, createdAt } =
                order.attributes;
              const date = day(createdAt).format("hh:mm A - MMM Do, YYYY");
              const formattedCost = new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
              }).format(orderTotal);

              return (
                <tr key={id}>
                  <td>{name}</td>
                  <td>{address}</td>
                  <td>{numItemsInCart}</td>
                  <td>{formattedCost}</td>
                  <td className="hidden sm:block">{date}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrdersList;
