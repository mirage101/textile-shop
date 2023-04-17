import React, { useState, useEffect } from "react";
import Layout from "./../components/Layout/Layout";
import { useCart } from "../context/cart";
import { useAuth } from "../context/auth";
import { useNavigate } from "react-router-dom";
import DropIn from "braintree-web-drop-in-react";
import { AiFillWarning } from "react-icons/ai";
import axios from "axios";
import toast from "react-hot-toast";
import "../styles/CartStyles.css";

const CartPage = () => {
  const [auth, setAuth] = useAuth();
  const [cart, setCart] = useCart();
  const [clientToken, setClientToken] = useState("");
  const [instance, setInstance] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [shippingMethods, setShippingMethods] = useState([]);
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [value, setValue] = useState(1);
  const [quantity, setQuantity] = useState(1);

  // keep track of the selected shipping method
  const [selectedMethod, setSelectedMethod] = useState(null);

  //get selected value of shipping rate
  const [selectedRate, setSelectedRate] = useState(null);

  function handleMethodChange(event) {
    setSelectedRate(parseFloat(event.target.value));
  }

  //total price
  const totalPrice = () => {
    try {
      let total = 0;
      cart?.map((item) => {
        item.isOnSale
          ? (total = total + item.salePrice * item.quantity + selectedRate)
          : (total = total + item.price * item.quantity + selectedRate);
      });
      return total.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
      });
    } catch (error) {
      console.log(error);
    }
  };
  //detele item
  const removeCartItem = (pid) => {
    try {
      let myCart = [...cart];
      let index = myCart.findIndex((item) => item._id === pid);
      myCart.splice(index, 1);
      setCart(myCart);
      localStorage.setItem("cart", JSON.stringify(myCart));
    } catch (error) {
      console.log(error);
    }
  };

  //get payment gateway token
  const getToken = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/braintree/token");
      setClientToken(data?.clientToken);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getToken();
    getShippingMethods();
  }, [auth?.token]);

  //handle payments
  const handlePayment = async () => {
    try {
      setLoading(true);
      const { nonce } = await instance.requestPaymentMethod();
      const { data } = await axios.post("/api/v1/product/braintree/payment", {
        nonce,
        cart,
        quantity: cart.map((product) => parseInt(product.quantity)),
        selectedRate,
        selectedMethod,
      });
      console.log(data);
      setLoading(false);
      localStorage.removeItem("cart");
      setCart([]);
      navigate("/dashboard/user/orders");
      toast.success("Payment Completed Successfully ");
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const getShippingMethods = async () => {
    try {
      const { data } = await axios.get("/api/v1/shipping/");

      if (data?.success) {
        setShippingMethods(data?.shippingMethods);
        console.log(data);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something wwent wrong in getting catgeory");
    }
  };

  function isPaymentDisabled(
    shippingMethods,
    selectedMethod,
    loading,
    instance,
    user
  ) {
    // If there are no shipping methods, the button should be disabled
    if (!shippingMethods || shippingMethods.length === 0) {
      return true;
    }

    // If a shipping method has not been selected, the button should be disabled
    if (!selectedMethod) {
      return true;
    }

    // If the payment is already being processed, the button should be disabled
    if (loading) {
      return true;
    }

    // If the DropIn instance is not available, the button should be disabled
    if (!instance) {
      return true;
    }

    // If the user's address is not available, the button should be disabled
    if (!user?.address) {
      return true;
    }

    // Otherwise, the button should be enabled
    return false;
  }

  return (
    <Layout>
      <div className=" cart-page">
        <div className="row">
          <div className="col-md-12">
            <h1 className="text-center bg-light p-2 mb-1">
              {!auth?.user
                ? "Hello Guest"
                : `Hello  ${auth?.token && auth?.user?.name}`}
              <p className="text-center">
                {cart?.length
                  ? `You Have ${cart.length} items in your cart ${
                      auth?.token ? "" : "please login to checkout !"
                    }`
                  : " Your Cart Is Empty"}
              </p>
            </h1>
          </div>
        </div>
        <div className="container ">
          <div className="row row-cart">
            <div className="col-md-7  p-0 m-0">
              {cart?.map((p) => (
                <div className="row card flex-row" key={p._id}>
                  <div className="col-md-4 cart-image">
                    <img
                      src={`/api/v1/product/product-photo/${p._id}`}
                      className="card-img-top"
                      alt={p.name}
                      width="100%"
                      height={"130px"}
                    />
                  </div>
                  <div className="col-md-4">
                    <p>{p.name}</p>
                    <p>{p.description.substring(0, 30)}</p>
                    {p.isOnSale ? (
                      <p>Price : ${p.salePrice * p.quantity}</p>
                    ) : (
                      <p>Price : ${p.price * p.quantity}</p>
                    )}
                  </div>
                  <div className="col-md-4">x {p.quantity}</div>
                  <div className="col-md-4 cart-remove-btn">
                    <button
                      className="btn btn-danger"
                      onClick={() => removeCartItem(p._id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="col-md-5 cart-summary ">
              <h2>Cart Summary</h2>
              <p>Total | Checkout | Payment</p>
              <hr />
              <h4>Total : {totalPrice()} </h4>
              {auth?.user?.address ? (
                <>
                  <div className="mb-3">
                    <h4>Current Address</h4>
                    <h5>{auth?.user?.address}</h5>
                    <button
                      className="btn btn-outline-warning"
                      onClick={() => navigate("/dashboard/user/profile")}
                    >
                      Update Address
                    </button>
                  </div>
                </>
              ) : (
                <div className="mb-3">
                  {auth?.token ? (
                    <button
                      className="btn btn-outline-warning"
                      onClick={() => navigate("/dashboard/user/profile")}
                    >
                      Update Address
                    </button>
                  ) : (
                    <button
                      className="btn btn-outline-warning"
                      onClick={() =>
                        navigate("/login", {
                          state: "/cart",
                        })
                      }
                    >
                      Plase Login to checkout
                    </button>
                  )}
                </div>
              )}
              <div class="mt-2">
                {clientToken && auth?.token && cart?.length && (
                  <form className="shipping-form">
                    {shippingMethods?.map((m) => (
                      <div key={m._id}>
                        <div className="shipping-method">
                          <input
                            type="radio"
                            name="method"
                            value={m.method}
                            onChange={() => {
                              setSelectedMethod(m.method);
                              setSelectedRate(m.rate);
                            }}
                          />
                          <label htmlFor="shipping">
                            {m.method} - {m.details} - ${m.rate}
                          </label>
                        </div>
                      </div>
                    ))}
                  </form>
                )}
              </div>
              {/* {paymentMethods && paymentMethods.method} */}
              <div className="mt-2">
                {!clientToken || !auth?.token || !cart?.length ? (
                  ""
                ) : (
                  <>
                    <DropIn
                      options={{
                        authorization: clientToken,
                        paypal: {
                          flow: "vault",
                        },
                      }}
                      onInstance={(instance) => setInstance(instance)}
                    />

                    <button
                      className="btn btn-primary"
                      onClick={handlePayment}
                      disabled={isPaymentDisabled(
                        shippingMethods,
                        selectedMethod,
                        loading,
                        instance,
                        auth?.user
                      )}
                    >
                      {loading ? "Processing ...." : "Make Payment"}
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;
