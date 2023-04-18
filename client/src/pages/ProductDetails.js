import React, { useState, useEffect } from "react";
import Layout from "./../components/Layout/Layout";
import axios from "axios";
import { useCart } from "../context/cart";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import "../styles/ProductDetailsStyles.css";

const ProductDetails = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [cart, setCart] = useCart();
  const [quantities, setQuantities] = useState({});

  useEffect(() => {
    if (params?.slug) getProduct();
  }, [params?.slug]);
  //getProduct
  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/get-product/${params.slug}`
      );
      setProduct(data?.product);
      getSimilarProduct(data?.product._id, data?.product.category._id);
    } catch (error) {
      console.log(error);
    }
  };
  //get similar product
  const getSimilarProduct = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/related-product/${pid}/${cid}`
      );
      setRelatedProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <div className="row container product-details">
        <div className="col-md-6">
          <img
            src={`/api/v1/product/product-photo/${product._id}`}
            className="card-img-top"
            alt={product.name}
            height="392"
            width="350px"
          />
        </div>
        <div className="col-md-6 product-details-info">
          <h1 className="text-center">Product Details</h1>
          <hr />
          <h6>Name : {product.name}</h6>
          <h6>Description : {product.description}</h6>
          <h6>
            Price :
            {product?.isOnSale ? (
              <span className="onsale-price">
                {product?.salePrice?.toLocaleString("en-US", {
                  style: "currency",
                  currency: "USD",
                })}
              </span>
            ) : (
              <span>
                {product?.price?.toLocaleString("en-US", {
                  style: "currency",
                  currency: "USD",
                })}
              </span>
            )}
          </h6>
          <h6>Category : {product?.category?.name}</h6>
          <input
            className="qtyBox qtyBox-pr-details"
            type="number"
            min="1"
            value={quantities[product?._id] || 1}
            onChange={(e) =>
              setQuantities({
                ...quantities,
                [product?._id]: parseInt(e.target.value),
              })
            }
          />
          <button
            className="btn btn-secondary ms-1"
            onClick={() => {
              setCart([...cart, product]);
              localStorage.setItem("cart", JSON.stringify([...cart, product]));
              toast.success("Item Added to cart");
            }}
          >
            ADD TO CART
          </button>
        </div>
      </div>
      <hr />
      <div className="row container similar-products">
        <h4>Similar Products ➡️</h4>
        {relatedProducts.length < 1 && (
          <p className="text-center">No Similar Products found</p>
        )}
        <div className="d-flex flex-wrap">
          {relatedProducts?.map((p) => (
            <div className="card m-2" key={p._id}>
              <div
                onClick={() => navigate(`/product/${p.slug}`)}
                className="product-photo"
              >
                <img
                  src={`/api/v1/product/product-photo/${p._id}`}
                  className="card-img-top"
                  alt={p.name}
                />
              </div>

              <div className="card-body">
                <div className="card-name-price">
                  <h5 className="card-title">{p.name}</h5>
                  <h5 className="card-title card-price">
                    {p.price.toLocaleString("en-US", {
                      style: "currency",
                      currency: "USD",
                    })}
                  </h5>
                </div>
                <p className="card-text ">
                  {p.description.substring(0, 60)}...
                </p>
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
                <div className="card-name-price">
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
    </Layout>
  );
};

export default ProductDetails;
