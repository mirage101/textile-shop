import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useCart } from "../context/cart";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const ProductsOnSale = ({ nolimit }) => {
  const [productsOnSale, setProductsOnSale] = useState([]);
  const navigate = useNavigate();
  const [cart, setCart] = useCart();
  const [quantities, setQuantities] = useState({});
  const fetchProductsOnSale = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/get-product/onsale");
      if (data?.success) {
        setProductsOnSale(data.productsOnSale);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProductsOnSale();
  }, []);

  return (
    <div className="products-sale">
      <h2>Products on Sale</h2>
      <div className="products">
        {!nolimit //show only 6 on first page
          ? productsOnSale.slice(0, 6).map((p) => (
              <div className="card m-2" style={{ width: "18rem" }} key={p._id}>
                <img
                  src={`/api/v1/product/product-photo/${p._id}`}
                  className="card-img-top"
                  alt={p.name}
                />
                <div className="card-body">
                  <h5 className="card-title">{p.name}</h5>
                  <p className="card-text">{p.description}</p>
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
                    metres
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
            ))
          : //show all products
            productsOnSale.map((p) => (
              <Link
                key={p._id}
                to={`/product/${p.slug}`}
                className="product-link"
              >
                <div className="card m-2" style={{ width: "18rem" }}>
                  <img
                    src={`/api/v1/product/product-photo/${p._id}`}
                    className="card-img-top"
                    alt={p.name}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{p.name}</h5>
                    <p className="card-text">{p.description}</p>
                    <p className="card-text card-price">
                      ${p.salePrice} <span>${p.price}</span>
                    </p>
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
              </Link>
            ))}
      </div>
    </div>
  );
};

export default ProductsOnSale;
