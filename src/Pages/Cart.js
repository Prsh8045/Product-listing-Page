import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { remove } from "../Store/CartSlice";

const Cart = () => {
  const dispatch = useDispatch();
  const Products = useSelector((state) => state.Cart);
  const handleRemove = (Productid) => {
    dispatch(remove(Productid));
  };
  return (
    <>
      <h3>Cart</h3>
      <div className="CartWrapper">
        {Products.map((Product) => (
          <div className="CartCard">
            <img src={Product.images[2]} alt="" />
            <h5>{Product.title}</h5>
            <h5>{Product.price}</h5>
            <button onClick={() => handleRemove(Product.id)} className="btn">
              Remove
            </button>
          </div>
        ))}
      </div>
    </>
  );
};

export default Cart;
