import React, { useEffect, useState, useRef } from "react";

import { useNavigate } from "react-router-dom";

import { Button, Img, Input, Line, List, SelectBox, Text } from "components";
import CartColumnframe48095972 from "components/CartColumnframe48095972";
import CartNavbar from "components/CartNavbar";
import CartSectionfooter from "components/CartSectionfooter";
import CartService from "../../services/cartService";
import minusImage from "assets/images/img_minus_color.svg";
import minusImageGrey from "assets/images/img_minus_grey.svg";
import plusImage from "assets/images/img_plus.svg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [cart, setCart] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [refresh, setRefresh] = useState(true);
  const navigate = useNavigate();
  const [refreshCartNavbar, setRefreshCartNavbar] = useState(false);

  const handleRefreshCartNavbar = () => {
    setRefreshCartNavbar(!refreshCartNavbar);
  };

  const data = { name: "John", age: 30 };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await CartService.getUserCart();
        setCart(response.data);
        setCartItems(response.data.items); // Assuming the response data is an array of products
        console.log("Called GET CART DETAILS");
        console.log(response.data.items);
      } catch (error) {
      

        console.error("Error fetching CART DATA:", error.code);
        console.error("Error fetching CART DATA:", error);
        if (error && error.response && error.response.status === 401) {
          navigate("/signin", { replace: true });
        } else{
          toast.error("Something Went Wrong !!!", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
        }
      }
    };

    fetchData();
  }, [refresh]);

  const handleIncrement = (item) => {
    addOrRemoveToCartButtonCalled(1, item);
  };

  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      addOrRemoveToCartButtonCalled(-1, item);
    }
  };

  const handleDeleteItem = async (item) => {
    var productDetails = {
      productId: item.productId,
      productName: item.productName,
      quantity: item.quantity,
      unit: item.unit,
    };

    console.log("DELETE BUTTON PRESSED :" + JSON.stringify(productDetails));
    try {
      const response = await CartService.deleteItemFromCart(productDetails);
      setCartItems(response.data.items); // Assuming the response data is an array of products
      console.log("Called DELETE ITEM FROM CART ITEMS");
      console.log(response.data.items);
      setRefresh(!refresh);
      handleRefreshCartNavbar();
    } catch (error) {
      toast.error("Something Went Wrong !!!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      //  setRefresh(!refresh);
      console.error("Error  DELETE ITEM FROM CART ITEMS ", error);
      if (error && error.response && error.response.status === 401) {
        navigate("/signin", { replace: true });
      }
    }
  };

  const addOrRemoveToCartButtonCalled = async (addedQuantityValue, item) => {
    console.log("PLUS ONE OR MINUS ONE  TO CART CALLED HERE: ");
    var productDetails = {
      productId: item.productId,
      productName: item.productName,
      quantity: addedQuantityValue,
      unit: item.unit,
    };

    try {
      const response = await CartService.addItemToCart(productDetails);
      console.log("Called GET PLUS ONE OR MINUS ONE  TO CART CALLED HERE: ");
      console.log(response.data);
      setRefresh(!refresh);
      // toast.success('Item added to Cart !!', {
      //   position: "top-right",
      //   autoClose: 5000,
      //   hideProgressBar: false,
      //   closeOnClick: true,
      //   pauseOnHover: true,
      //   draggable: true,
      //   progress: undefined,
      //   theme: "colored",
      //   });
    } catch (error) {
      toast.error("Something Went Wrong !!!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      setRefresh(!refresh);
      console.error("Error fetching CART DATA:", error);
      if (error && error.response && error.response.status === 401) {
        navigate("/signin", { replace: true });
      }
    }
  };

  return (
    <>
      <div className="bg-gray-50 flex flex-col font-rubik sm:gap-10 md:gap-10 gap-[100px] items-start justify-start mx-auto w-auto sm:w-full md:w-full">
        <div className="flex flex-col items-center justify-start w-full">
          <CartNavbar
            className="bg-white-A700 flex items-center justify-center md:px-5 px-[75px] py-[15px] w-full shadow-md"
            refresh={refreshCartNavbar}
            handleRefresh={handleRefreshCartNavbar}
          />
          <div className="flex flex-col font-raleway items-center justify-start pt-[75px] md:px-10 sm:px-5 px-[75px] w-full">
            <div className="flex flex-col gap-[50px] items-center justify-start max-w-[1290px] mx-auto w-full">
              <Text
                className="sm:text-4xl md:text-[38px] text-[40px] text-black-900 text-center tracking-[-0.50px] w-full"
                size="txtRalewayBold40"
              >
                Your Cart
              </Text>
              <div className="flex md:flex-col flex-row font-rubik md:gap-10 gap-[61px] items-center justify-start w-full">
                <List
                  className="flex flex-1 flex-col gap-[30px] items-start w-full"
                  orientation="vertical"
                >
                  {cartItems &&
                    cartItems.map((item, index) => (
                      <div
                        key={index}
                        className="flex flex-1 md:flex-col flex-row gap-[20px] items-center justify-start my-0 w-full shadow-md"
                      >
                        <div className="flex flex-1 sm:flex-col flex-row gap-5 items-center justify-start w-full">
                          <Img
                            className="h-[120px] md:h-auto object-cover w-[120px]"
                            src={item.imageUrl}
                            alt={item.altText}
                          />
                          <div className="flex flex-col gap-2 items-start justify-start w-auto">
                            <Text
                              className="leading-[35.00px] max-w-[200px] md:max-w-full text-black-900 text-xl tracking-[-0.50px]"
                              size="txtRalewayRomanBold20"
                            >
                              {item.productName}
                            </Text>
                            <Text
                              className="text-bluegray-900 text-xl tracking-[-0.50px] w-auto"
                              size="txtPoppinsBold20"
                            >
                              {`₹ ${item.unitPrice}`}
                            </Text>
                          </div>
                        </div>
                        <div className="border border-black-900 border-solid flex flex-col items-start justify-start px-[15px] py-[5px] w-auto">
                          <div className="flex flex-row gap-[10px] items-center justify-start p-2.5 w-[60%]">
                            <Img
                              className="common-pointer h-6 ml-1 w-6"
                              src={
                                item.quantity > 1 ? minusImage : minusImageGrey
                              }
                              alt="minus"
                              onClick={() => handleDecrement(item)}
                            />
                            <Text
                              className="text-black-900 text-lg tracking-[-0.50px]"
                              size="txtRubikRegular18"
                            >
                              {item.quantity}
                            </Text>
                            <Img
                              className="h-6 w-6"
                              src={plusImage}
                              alt="plus"
                              onClick={() => handleIncrement(item)}
                            />
                          </div>
                        </div>
                        <Text
                          className="text-black-900 text-lg tracking-[-0.50px] w-auto"
                          size="txtRubikSemiBold18"
                        >
                          {`₹ ${item.itemTotal}`}
                        </Text>
                        <img
                          className="h-[50px] w-[50px] cursor-pointer mr-2"
                          src="images/img_trash.svg"
                          alt="trash"
                          onClick={() => handleDeleteItem(item)}
                        />
                      </div>
                    ))}
                </List>
                <div className="bg-gray-53 flex sm:flex-1 flex-col items-start justify-start sm:px-5 px-[57px] py-[31px] w-auto sm:w-full shadow-md">
                  <div className="flex flex-col gap-[27px] items-start justify-start w-auto">
                    <Text
                      className="text-black-900 text-xl tracking-[-0.50px] w-auto"
                      size="txtRalewayRomanBold20"
                    >
                      Total Cost
                    </Text>
                    {/*                   
                    <Line className="bg-black-900 h-px w-full" /> */}
                    <div className="flex flex-row items-center justify-between w-full">
                      <Text
                        className="text-black-900 text-xl tracking-[-0.50px] w-auto"
                        size="txtPoppinsSemiBold20"
                      >
                        {`₹ ${cart.totalAmount}`}
                      </Text>
                    </div>
                    <Button
                      className="common-pointer bg-bluegray-900 cursor-pointer font-rubik font-semibold leading-[normal] py-3.5 px-4 text-center text-lg text-yellow-100 tracking-[-0.50px] w-full"
                      onClick={() => navigate("/checkout", { state: cart })}
                      //  onClick={handleCheckout}
                    >
                      Checkout Now
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-start justify-start md:px-10 sm:px-5 px-[75px] w-full"></div>
        <CartSectionfooter className="bg-black-900 flex font-raleway gap-2 items-center justify-center md:px-5 px-[75px] py-[50px] w-full" />
      </div>
    </>
  );
};

export default CartPage;
