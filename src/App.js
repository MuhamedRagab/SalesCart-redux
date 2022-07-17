import React, { useEffect } from "react";
import Navbar from "./components/Navbar";
import CartContainer from "./components/CartContainer";
import Modal from "./components/Modal";
import { useDispatch, useSelector } from "react-redux";
import { calulateTotal, fetchCart } from "./redux/cartSlice";
const App = () => {
  const dispatch = useDispatch();
  const { cartItems, isLoading, isError } = useSelector((state) => state.cart);
  const { isOpen } = useSelector((state) => state.modal);
  useEffect(() => dispatch(calulateTotal()), [cartItems, dispatch]);
  useEffect(() => dispatch(fetchCart()), [dispatch]);

  if (isLoading) {
    return (
      <div className="loading">
        <h1>Loading...</h1>
      </div>
    );
  }

  return (
    <main>
      {isOpen && <Modal />}
      <Navbar />
      <CartContainer />
    </main>
  );
};

export default App;
