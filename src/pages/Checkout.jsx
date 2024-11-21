import { useSelector } from "react-redux";
import { CheckoutForm, SectionTitle, CartTotals } from "../components";
import { toast } from "react-toastify";
import { redirect } from "react-router-dom";

export const loader = (store) => () => {
  const user = store.getState().userState.user;

  if (!user) {
    toast.warn("You must be logged in to checkout");
    return redirect("/login");
  }
  return null;
};

const Checkout = () => {
  const cartTotal = useSelector((state) => state.cartState.cartTotal);
  const cartItems = useSelector((state) => state.cartState.cartItems);

  if (cartTotal === 0 || cartItems.length === 0) {
    return <SectionTitle text="Your cart is empty" />;
  }

  return (
    <div className="align-element">
      <SectionTitle text="Place Your Order" />
      <div className="mt-8 grid gap-8 md:grid-cols-2 items-start">
        <CheckoutForm />
        <CartTotals />
      </div>
    </div>
  );
};

export default Checkout;
