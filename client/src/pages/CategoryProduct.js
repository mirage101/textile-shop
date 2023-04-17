import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/CategoryProductStyles.css";
import axios from "axios";
import Spinner from "../components/Spinner";
import { FaHeart, FaHeartBroken } from "react-icons/fa";
import { useAuth } from "../context/auth";
import { useCart } from "../context/cart";
import toast from "react-hot-toast";

const CategoryProduct = () => {
  const [auth, setAuth] = useAuth();
  const [cart, setCart] = useCart();
  const params = useParams();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);

  const [wishlistedProducts, setWishlistedProducts] = useState(() => {
    return auth?.user?.wishlist || [];
  });
  let userId = auth?.user?._id;

  const handleAddToWishlist = async (userId, productId) => {
    if (!wishlistedProducts.includes(productId)) {
      setWishlistedProducts([...wishlistedProducts, productId]);
    }
    try {
      const response = await axios.post(`/api/v1/auth/wishlist/${productId}`, {
        userId: userId,
      });

      setWishlistedProducts([...wishlistedProducts, productId]);
      console.log(response.data);
      console.log("user", userId);
    } catch (error) {
      console.error(error);
    }
  };

  const handleRemoveFromWishlist = async (userId, productId) => {
    setWishlistedProducts(wishlistedProducts.filter((id) => id !== productId));

    try {
      // Send wishlist data to server-side
      const response = await axios.delete(
        `/api/v1/auth/wishlist/${productId}`,
        {
          data: {
            userId: userId,
          },
        }
      );
      console.log(response.data);
      setWishlistedProducts(
        wishlistedProducts.filter((id) => id !== productId)
      );
    } catch (error) {
      console.error(error);
    }
  };

  const isProductInWishlist = (productId) => {
    return wishlistedProducts.includes(productId);
  };

  useEffect(() => {
    if (params?.slug) getProductsByCat();
    localStorage.removeItem(userId);
    localStorage.setItem(userId, JSON.stringify(wishlistedProducts));
  }, [params?.slug, userId, wishlistedProducts]);
  const getProductsByCat = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/product-category/${params.slug}`
      );
      setProducts(data?.products);
      setCategory(data?.category);
    } catch (error) {
      console.log(error);
    }
  };

  // function addToWishlist(product) {
  //   setWishlistItems([...wishlistItems, product]);
  // }

  return (
    <Layout>
      <div className="container mt-3 category">
        <h4 className="text-center">Category - {category?.name} </h4>
        {products.length === 0 ? (
          <Spinner />
        ) : (
          <>
            <h6 className="text-center">{products?.length} products found </h6>
            <div className="row">
              <div className="col-md-9 offset-1">
                <div className="d-flex flex-wrap">
                  {products?.map((p) => (
                    <div className="card m-2" key={p?._id}>
                      {isProductInWishlist(p?._id) ? (
                        <div
                          className="wishlist-icon"
                          onClick={() =>
                            handleRemoveFromWishlist(userId, p._id)
                          }
                        >
                          <FaHeart />
                        </div>
                      ) : (
                        <div
                          className="wishlist-icon"
                          onClick={() => handleAddToWishlist(userId, p._id)}
                        >
                          <FaHeartBroken />
                        </div>
                      )}
                      {/* <div onClick={() => handleAddToWishlist(p._id)} className="wishlist-icon">
                        {isProductInWishlist(p._id) ? <FaHeart /> : <FaHeartBroken />}
                      </div> */}

                      <img
                        src={`/api/v1/product/product-photo/${p._id}`}
                        className="card-img-top"
                        alt={p.name}
                      />
                      <div className="card-body">
                        <div className="card-name-price">
                          <h5 className="card-title">{p.name}</h5>
                        </div>
                        <p className="card-text ">
                          {p.description.substring(0, 60)}...
                        </p>
                        <p className="card-title card-price">
                          {p.price.toLocaleString("en-US", {
                            style: "currency",
                            currency: "USD",
                          })}
                        </p>
                        <div className="card-name-price">
                          <button
                            className="btn btn-info ms-1"
                            onClick={() => navigate(`/product/${p.slug}`)}
                          >
                            More Details
                          </button>
                          <button
                            className="btn btn-dark ms-1"
                            onClick={() => {
                              setCart([...cart, p]);
                              localStorage.setItem(
                                "cart",
                                JSON.stringify([...cart, p])
                              );
                              toast.success("Item Added to cart");
                            }}
                          >
                            ADD TO CART
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                {/* <div className="m-2 p-3">
            {products && products.length < total && (
              <button
                className="btn btn-warning"
                onClick={(e) => {
                  e.preventDefault();
                  setPage(page + 1);
                }}
              >
                {loading ? "Loading ..." : "Loadmore"}
              </button>
            )}
          </div> */}
              </div>
            </div>
          </>
        )}
        {/* {products && (
          
        )} */}
      </div>
    </Layout>
  );
};

export default CategoryProduct;
