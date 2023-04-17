import React, { useState } from "react";
import Layout from "./../components/Layout/Layout";
import { useSearch } from "../context/search";
import { useCart } from "../context/cart";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
const Search = () => {
  const [values, setValues] = useSearch();
  const [cart, setCart] = useCart();
  const navigate = useNavigate();
  const [quantities, setQuantities] = useState({});
  return (
    <Layout title={"Search results"}>
      <div className="container">
        <div className="text-center">
          <h1>Search Resuts</h1>
          <h6>
            {values?.results.length < 1
              ? "No Products Found"
              : `Found ${values?.results.length} products`}
          </h6>
          <div className="d-flex flex-wrap mt-4">
            {values?.results.map((p) => (
              <div key={p._id} className="card m-2" style={{ width: "18rem" }}>
                <img
                  src={`/api/v1/product/product-photo/${p._id}`}
                  className="card-img-top"
                  alt={p.name}
                />
                <div className="card-body">
                  <h5 className="card-title">{p.name}</h5>
                  <p className="card-text">
                    {p.description.substring(0, 30)}...
                  </p>
                  <div className="price-box">
                    <p className="card-text onsale-price">${p.salePrice}</p>
                    <p className="card-text old-price">${p.price}</p>
                  </div>
                  <div className="card-name-price">
                    <input
                      className="qtyBox"
                      type="number"
                      min="1"
                      value={quantities[p._id] || 1}
                      onChange={(e) =>
                        setQuantities({
                          ...quantities,
                          [p._id]: parseInt(e.target.value),
                        })
                      }
                    />

                    <div className="pr-buttons">
                      <button
                        className="btn btn-info ms-1"
                        onClick={() => navigate(`/product/${p.slug}`)}
                      >
                        More Details
                      </button>

                      <button
                        className="btn btn-dark ms-1"
                        onClick={() => {
                          setCart([
                            ...cart,
                            { ...p, quantity: quantities[p._id] || 1 },
                          ]);
                          localStorage.setItem(
                            "cart",
                            JSON.stringify([
                              ...cart,
                              { ...p, quantity: quantities[p._id] || 1 },
                            ])
                          );
                          toast.success("Item Added to cart");
                        }}
                      >
                        ADD TO CART
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Search;
