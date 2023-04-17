import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import UserMenu from "../../components/Layout/UserMenu";
import { useAuth } from "../../context/auth";
import axios from "axios";
import { useCart } from "../../context/cart";
import toast from "react-hot-toast";
const Wishlist = () => {
  const [auth] = useAuth();
  const userId = auth?.user?._id;
  const [products, setProducts] = useState([]);
  const [wishlistItems, setWishlistItems] = useState([]);
  const [productList, setProductList] = useState([]);
  const [cart, setCart] = useCart();

  const getWishlist = async (userId) => {
    try {
      const { data } = await axios.get(`/api/v1/auth/users/${userId}/wishlist`);
      setWishlistItems(data);

      const ids = data.map((item) => item); // extract the _id property from each item
      console.log(ids);
      ids.forEach((id) => {
        console.log(id);
        getProducts(id);
      });
    } catch (error) {
      console.error(error);
    }
  };

  const removeFromWishlist = async (userId, productId) => {
    try {
      await axios.delete(`/api/v1/auth/users/${userId}/wishlist/${productId}`);
      console.log("Product removed from wishlist");
    } catch (error) {
      console.error(error);
    }
  };

  const getProducts = async (id) => {
    if (id) {
      try {
        const { data } = await axios.get(`/api/v1/product/${id}`);
        setProductList((prevProducts) => [...prevProducts, data]);
      } catch (error) {
        console.error(error);
      }
    }
  };

  useEffect(() => {
    getWishlist(userId);
  }, []);

  return (
    <Layout title={"Dashboard - Ecommerce App"}>
      <div className="container-flui m-3 p-3 dashboard">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <div className="card w-75 p-3">
              <h3>Wishlist</h3>

              <div className="wishlisted-products">
                {wishlistItems.map((item) => {
                  const product = productList.find((p) => p._id === item._id);
                  return (
                    <div key={item._id}>
                      <h4>{product?.name}</h4>
                      <div className="wishlist-details">
                        <img
                          src={`/api/v1/product/product-photo/${item.toString()}`}
                          className="card-img-top"
                          alt={product?.name}
                        />
                        <p className="product-description">
                          {product?.description}
                        </p>
                        <p className="product-price">${product?.price}</p>

                        <div className="wishlist-btns">
                          <button
                            onClick={() => removeFromWishlist(userId, item)}
                          >
                            Remove from wishlist
                          </button>
                          <button
                            onClick={() => {
                              setCart([...cart, product]);
                              localStorage.setItem(
                                "cart",
                                JSON.stringify([...cart, product])
                              );
                              toast.success("Item Added to cart");
                            }}
                          >
                            ADD TO CART
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Wishlist;
