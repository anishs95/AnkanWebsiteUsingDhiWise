import React, { useEffect, useState, useRef } from "react";

import { useNavigate, useParams } from "react-router-dom";
import {
  Button,
  CheckBox,
  Img,
  Input,
  Line,
  List,
  PagerIndicator,
  SelectBox,
  Slider,
  Text,
} from "components";

import CartNavbar from "components/CartNavbar";
import CartSectionfooter from "components/CartSectionfooter";
import ProductService from "../../services/productService";
import CartService from "../../services/cartService";
import minusImage from "assets/images/img_minus_color.svg";
import minusImageGrey from "assets/images/img_minus_grey.svg";
import plusImage from "assets/images/img_plus.svg";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faClose } from "@fortawesome/free-solid-svg-icons";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import fileDownload from "js-file-download";

const DetailReviewPage = () => {
  const navigate = useNavigate();
  const { productId } = useParams();
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [consumptionQuantity, setConsumptionQuantity] = useState(0);
  const [consumptionResult, setConsumptionResult] = useState();
  const [consumptionErrorResult, setConsumptionErrorResult] = useState();
  const [refresh, setRefresh] = useState(true);
  const [refreshCartNavbar, setRefreshCartNavbar] = useState(false);

  const handleRefreshCartNavbar = () => {
    setRefreshCartNavbar(!refreshCartNavbar);
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await ProductService.getProduct(productId);
        setProduct(response.data); // Assuming the response data is an array of products
        console.log("Called GET  PRODUCTS DETAIL ");
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };

    fetchData();
  }, [refresh]);

  const handleIncrement = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleDownload = (url, filename) => {
    axios
      .get(url, {
        responseType: "arraybuffer",
      })
      .then((response) => {
        // Create a Blob from the array buffer
        const blob = new Blob([response.data], { type: "application/pdf" });

        // Create a link element
        const link = document.createElement("a");

        // Set the href attribute with the object URL of the Blob
        link.href = window.URL.createObjectURL(blob);

        // Set the download attribute with the desired file name
        link.download = filename || "download.pdf";

        // Append the link to the body
        document.body.appendChild(link);

        // Trigger a click on the link to start the download
        link.click();

        // Remove the link from the DOM
        document.body.removeChild(link);
      })
      .catch((error) => {
        console.error("Error downloading PDF:", error.message);
      });
  };

  const calculateConsumption = async () => {
    try {
      console.log("Consumption calculated for : " + consumptionQuantity);
      const response = await ProductService.calculateConsumption(
        productId,
        consumptionQuantity
      );
      setConsumptionResult(response.data);
      console.log("Consumption Result Got " + response.data);
    } catch (error) {
      setConsumptionErrorResult("Not Found! Contact Ankan For Calculation");
    }
  };

  const addToCartButtonCalled = async () => {
    console.log("ADD TO CART CALLED HERE: ");
    console.log("PRODUCT ID : " + product.id);
    console.log("Quantity : " + quantity);
    console.log("ProductName : " + product.name);
    console.log("Color : " + quantity);
    console.log("unit : " + product.unit);

    var productDetails = {
      productId: product.id,
      productName: product.name,
      quantity: quantity,
      //color: null,
      unit: product.unit,
    };

    try {
      const response = await CartService.addItemToCart(productDetails);
      // setProduct(response.data); // Assuming the response data is an array of products
      // console.log("Called GET  CART DETAIL ");
      // console.log(response.data);

      toast.success("Item added to Cart !!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
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

      console.error("Error fetching CART DATA:", error.code);
      console.error("Error fetching CART DATA:", error);
    }
  };

  const consumptionModel = (close) => {
    return (
      <div className="modal">
        <div className="close-icon" onClick={() => close()}>
          <FontAwesomeIcon icon={faClose} />
        </div>
        <div
          className="content"
          style={{
            textAlign: "center",
            padding: "20px",
            fontSize: 20,
            fontWeight: "bold",
          }}
        >
          Consumption Calculation
        </div>
        <div className="flex flex-1 flex-col gap-3 items-start justify-start w-full p-10">
          <Text
            className="text-black-900 text-xl "
            // /  size="txtRalewayRomanRegular20Black900"
          >
            AREA
          </Text>
          <div className="w-1/2 mx-auto justify-center items-center">
            <Input
              name="frame48096050"
              value={consumptionQuantity}
              onChange={(e) => setConsumptionQuantity(e)}
              placeholder="in sq.feet"
              wrapClassName="border border-bluegray-100 justify-center items-center border-solid pl-[22px] pr-[35px] py-[18px] w-full"
              type="number"
            />
          </div>
          <button
            className="mx-auto justify-center items-center mt-5"
            style={{
              backgroundColor: "blue",
              color: "white",
              padding: "10px 20px",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
            onClick={() => calculateConsumption()}
          >
            Calculate
          </button>
          {consumptionResult && (
            <div>
              <Text
                style={{
                  fontSize: 30,
                }}
              >
                {consumptionResult} Bags Required.
              </Text>
              <Text
                style={{
                  paddingTop: 10,
                  fontSize: 10,
                  color: "red",
                }}
              >
                * Suggestions are based on standard conditions, actual can be
                vary.
              </Text>
            </div>
          )}
          {consumptionErrorResult && (
            <div>
              <Text
                style={{
                  fontSize: 20,
                  color: "red",
                }}
              >
                {consumptionErrorResult}
              </Text>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="bg-gray-50 flex flex-col font-rubik sm:gap-10 md:gap-10 gap-[100px] items-center justify-start mx-auto w-auto sm:w-full md:w-full">
        <div className="flex flex-col items-start justify-start w-full">
          <div className="flex flex-col items-start justify-start w-full shadow-md">
            <CartNavbar
              className="bg-white-A700 flex items-center justify-center md:px-5 px-[75px] py-[15px] w-full"
              refresh={refreshCartNavbar}
              handleRefresh={handleRefreshCartNavbar}
            />
          </div>
          <ToastContainer />
          <div className="flex flex-col items-start justify-start pt-[75px] md:px-10 sm:px-5 px-[75px] w-full">
            <div className="flex md:flex-col flex-row gap-[47px] items-center justify-start max-w-[1290px] mx-auto w-full">
              {product.imageUris && (
                <>
                  <Img
                    className="flex-1 md:flex-none md:h-[595px] sm:h-auto h-full max-h-[595px] object-cover sm:w-[] md:w-[]"
                    src={product.imageUris[0]}
                    alt="rectangle1475"
                  />
                </>
              )}

              <div className="flex flex-1 flex-col gap-[30px] items-start justify-start w-full">
                <div className="flex flex-col gap-[33px] items-start justify-start w-full">
                  <Text
                    className="max-w-[621px] md:max-w-full md:text-3xl sm:text-[28px] text-[32px] text-black-900 tracking-[-0.50px]"
                    size="txtRalewayRomanBold32Black900"
                  >
                    {product.name}
                  </Text>

                  <Text
                    className="text-4xl sm:text-[32px] md:text-[34px] text-bluegray-900 tracking-[-0.50px] w-full"
                    size="txtRubikBold36"
                  >
                    ₹ {product.price}
                  </Text>
                  <div className="flex flex-col font-rubik gap-5 items-start justify-start w-full">
                    <Text
                      className="text-black-900 text-lg tracking-[-0.50px] w-full"
                      size="txtRubikSemiBold18"
                    >
                      <span className="text-gray-500 font-rubik text-left font-normal">
                        Size :
                      </span>
                      <span className="text-black-900 font-rubik text-left font-normal">
                        {" "}
                        {product.quantity} {product.unit}
                      </span>
                    </Text>
                    <Text
                      className="text-black-900 text-lg tracking-[-0.50px] w-full"
                      size="txtRubikSemiBold18"
                    >
                      <span className="text-gray-500 font-rubik text-left font-normal">
                        Brand :
                      </span>
                      <span className="text-black-900 font-rubik text-left font-normal">
                        {" "}
                        {product.brand}
                      </span>
                      <span className="text-black-900 font-rubik text-left font-semibold">
                        {" "}
                      </span>
                    </Text>
                  </div>
                  <Text
                    className="leading-[35.00px] max-w-[621px] md:max-w-full text-gray-500 text-lg tracking-[-0.50px]"
                    size="txtRubikRegular18Gray500"
                  >
                    {product.description}
                  </Text>
                </div>
                {product.dataSheetUri && (
                  <button
                    style={{ color: "red" }}
                    onClick={() => {
                      handleDownload(product.dataSheetUri, "test-download.jpg");
                    }}
                  >
                    Download DataSheet
                  </button>
                )}

                <div>
                  <Popup
                    trigger={
                      <button
                        style={{
                          backgroundColor: "blue",
                          color: "white",
                          padding: "10px 20px",
                          border: "none",
                          borderRadius: "5px",
                          //   marginLeft: "10px", // Add left padding here
                          cursor: "pointer",
                        }}
                        //    onClick={() => handleFiltering(close)}
                      >
                        Calculate Quantity Required ?
                      </button>
                    }
                    modal
                    nested
                  >
                    {(close) => consumptionModel(close)}
                  </Popup>
                </div>
                <div className="flex flex-col items-start justify-start w-full">
                  <div className="flex flex-row gap-[19px] items-start justify-start w-[337px]">
                    <div className="border border-black-900 border-solid flex flex-row gap-[15px] items-center justify-start p-2.5 w-[38%]">
                      <Img
                        className="common-pointer h-6 ml-1 w-6"
                        src={quantity > 1 ? minusImage : minusImageGrey}
                        alt="minus"
                        onClick={handleDecrement}
                      />
                      <Text
                        className="text-black-900 text-lg tracking-[-0.50px]"
                        size="txtRubikRegular18"
                      >
                        {quantity}
                      </Text>
                      <Img
                        className="h-6 w-6"
                        src={plusImage}
                        alt="plus"
                        onClick={handleIncrement}
                      />
                    </div>

                    <Text
                      className="common-pointer bg-black-900 flex-1  justify-center sm:pl-5 pl-[25px] pr-[13px] py-[11px] text-lg text-white-A700 tracking-[-0.50px] w-auto"
                      size="txtRubikRegular18WhiteA700"
                      onClick={() => addToCartButtonCalled()}
                    >
                      Add to Cart
                    </Text>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <CartSectionfooter className="bg-black-900 flex font-raleway gap-2 items-center justify-center md:px-5 px-[75px] py-[50px] w-full" />
      </div>
    </>
  );
};
export default DetailReviewPage;
