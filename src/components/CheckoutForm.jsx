import { Form, redirect } from "react-router-dom";
import FormInput from "./FormInput";
import SubmitBtn from "./SubmitBtn";
import { customFetch, formatPrice } from "../utils";
import { toast } from "react-toastify";
import { clearCart } from "../featured/cart/cartSlice";

export const action =
  (store, queryClient) =>
  async ({ request }) => {
    try {
      const formData = await request.formData();
      const { name, address } = Object.fromEntries(formData);
      const user = store.getState().userState.user;

      const { cartItems, orderTotal, numItemsInCart } =
        store.getState().cartState;

      const info = {
        name,
        address,
        chargeTotal: orderTotal,
        orderTotal: formatPrice(orderTotal),
        cartItems,
        numItemsInCart,
      };

      if (!user?.token) {
        toast.error("You are not authenticated. Please log in.");
        return redirect("/login");
      }

      const response = await customFetch.post(
        "/orders",
        { data: info },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      store.dispatch(clearCart());
      toast.success("Order placed successfully");
      return redirect("/orders");
    } catch (error) {
      console.error("Error placing order:", error);

      const errorMessage =
        error?.response?.data?.error?.message ||
        "There was an error placing your order";

      if (error?.response?.status === 401 || error?.response?.status === 403) {
        toast.error("Authentication error. Please log in again.");
        return redirect("/login");
      }

      toast.error(errorMessage);
      return null;
    }
  };

const CheckoutForm = () => {
  return (
    <Form method="POST" className="flex flex-col gap-y-4">
      <h4 className="font-medium text-xl capitalize">Shipping Information</h4>
      <FormInput label="First Name" name="name" type="text" required />
      <FormInput label="Address" name="address" type="text" required />
      <div className="mt-4">
        <SubmitBtn text="Place Your Order" />
      </div>
    </Form>
  );
};

export default CheckoutForm;
