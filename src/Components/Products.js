import React, { useEffect, useState } from "react";
import { add } from "../Store/CartSlice";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

const Products = () => {
  const { search } = window.location;
  const query = new URLSearchParams(search).get("s");
  const [searchTerm, setsearchTerm] = useState(query || "");

  const history = useHistory();
  const onSubmit = (e) => {
    history.push(`?s=${searchTerm}`);
    e.preventDefault();
  };
  const dispatch = useDispatch();
  const [Products, setProducts] = useState([]);
  const [filter, setfilter] = useState(Products);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch("https://dummyjson.com/products?limit=100");
      const data = await res.json();
      console.log(data.products);
      setProducts(data.products);
      setfilter(data.products);
    };
    fetchProducts();
  }, []);

  const filterProduct = (cat) => {
    const updated = Products.filter((val) => val.category === cat);
    setfilter(updated);
  };
  const handleAdd = (Product) => {
    if (Product.stock < 50) {
      alert("hurry! only a few items left");
    }
    dispatch(add(Product));
  };
  function Showfilter() {
    return (
      <>
        <form
          action="/"
          method="get"
          className="search-main"
          autoComplete="off"
        >
          <label htmlFor="header-search"></label>
          <input
            type="text"
            id="header-search"
            placeholder="search..."
            className="search-text"
            value={searchTerm}
            name="s"
            onChange={(e) => setsearchTerm(e.target.value)}
          />
        </form>
      </>
    );
  }

  const Showproducts = () => {
    return (
      <div className="buttons d-flex justify-content-center mb-5 pb-5">
        <div
          className="btn btn-outline-dark me-2"
          onClick={() => setfilter(Products)}
        >
          All
        </div>
        <div
          className="btn btn-outline-dark me-2"
          onClick={() => filterProduct("smartphones")}
        >
          smartphones
        </div>
        <div
          className="btn btn-outline-dark me-2"
          onClick={() => filterProduct("laptops")}
        >
          laptops
        </div>
        <div
          className="btn btn-outline-dark me-2"
          onClick={() => filterProduct("fragrances")}
        >
          fragrances
        </div>
        <div
          className="btn btn-outline-dark me-2"
          onClick={() => filterProduct("skincare")}
        >
          skincare
        </div>
        <div
          className="btn btn-outline-dark me-2"
          onClick={() => filterProduct("groceries")}
        >
          groceries
        </div>
        <div
          className="btn btn-outline-dark me-2"
          onClick={() => filterProduct("home-decoration")}
        >
          Home decoration
        </div>
        <div
          className="btn btn-outline-dark me-2"
          onClick={() => filterProduct("furniture")}
        >
          furniture
        </div>
        <div
          className="btn btn-outline-dark me-2"
          onClick={() => filterProduct("tops")}
        >
          tops
        </div>
      </div>
    );
  };

  return (
    <>
      <Showproducts />
      {Showfilter()}
      <div className="ProductsWrapper">
        {filter
          .filter((val) => {
            if (searchTerm == "") {
              return val;
            } else if (
              val.category.toLowerCase().includes(searchTerm.toLowerCase())
            ) {
              return val;
            } else if (
              val.brand.toLowerCase().includes(searchTerm.toLowerCase())
            ) {
              return val;
            }
          })
          .map((Product) => (
            <div className="Card" key={Product.id}>
              <img src={Product.images[0]} alt="" />
              <h4>{Product.title}</h4>
              <h4>{Product.price}</h4>
              <button onClick={() => handleAdd(Product)} className="btn">
                Add to Cart
              </button>
            </div>
          ))}
      </div>
    </>
  );
};

export default Products;
