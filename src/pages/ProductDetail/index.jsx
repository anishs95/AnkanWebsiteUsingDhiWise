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

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

const DetailReviewPage = () => {
  const navigate = useNavigate();
  const { productId } = useParams();
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1);

  function handleNavigate1() {
    window.location.href = "https://accounts.google.com/";
  }


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
  }, []);

  const handleIncrement = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const addToCartButtonCalled = async () => {
      console.log("ADD TO CART CALLED HERE: ");
      console.log("PRODUCT ID : "+ product.id);
      console.log("Quantity : "+ quantity);
      console.log("ProductName : "+ product.name);
      console.log("Color : "+ quantity);
      console.log("unit : "+ product.unit);

      var productDetails = {
        productId: product.id,
        productName: product.name,
        quantity: quantity,
        //color: null,
        unit: product.unit,
      };

      try {
        const response = await CartService.addItemToCart( productDetails);
        setProduct(response.data); // Assuming the response data is an array of products
        console.log("Called GET  CART DETAIL ");
        console.log(response.data);
        
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
       
          toast.error('Something Went Wrong !!!', {
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


  return (
    <>
    
      <div className="bg-gray-50 flex flex-col font-rubik sm:gap-10 md:gap-10 gap-[100px] items-center justify-start mx-auto w-auto sm:w-full md:w-full">   
       <div className="flex flex-col items-start justify-start w-full">
          <div className="flex flex-col items-start justify-start w-full">
            <CartNavbar className="bg-white-A700 flex items-center justify-center md:px-5 px-[75px] py-[15px] w-full" />
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
                <div className="flex flex-col items-start justify-start w-full">
                  <div className="flex flex-row gap-[19px] items-start justify-start w-[337px]">
                    <div className="border border-black-900 border-solid flex flex-row gap-[15px] items-center justify-start p-2.5 w-[38%]">
                      <Img
                        className="common-pointer h-6 ml-1 w-6"
                        src={quantity > 1 ?minusImage: minusImageGrey}
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
                      className="common-pointer bg-black-900 flex-1 justify-center sm:pl-5 pl-[25px] pr-[13px] py-[11px] text-lg text-white-A700 tracking-[-0.50px] w-auto"
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

        {/* // Code included for comments and related products  */}

        {/* <div className="flex flex-col font-josefinsans items-start justify-start md:px-10 sm:px-5 px-[75px] w-full">
          <div className="flex md:flex-col flex-row gap-[50px] items-start justify-start max-w-[1290px] mx-auto w-full">
            <div className="flex flex-1 flex-col gap-[50px] items-start justify-start w-full">
              <div className="flex flex-col gap-[49px] items-start justify-start w-full">
                <div className="flex flex-col items-center justify-start w-full">
                  <div className="flex flex-row gap-[50px] items-start justify-start w-full md:w-full">
                    <Text
                      className="common-pointer text-2xl md:text-[22px] text-gray-500 sm:text-xl tracking-[-0.50px] w-auto"
                      size="txtJosefinSansRomanBold24Gray500"
                      onClick={() => navigate("/shopdetaildescription")}
                    >
                      Description
                    </Text>
                    <div className="flex flex-col gap-2 items-start justify-start w-auto">
                      <Text
                        className="text-2xl md:text-[22px] text-bluegray-900 sm:text-xl tracking-[-0.50px] w-auto"
                        size="txtJosefinSansRomanBold24"
                      >
                        Review
                      </Text>
                      <Line className="bg-bluegray-900 h-1.5 w-full" />
                    </div>
                  </div>
                </div>
                <List
                  className="flex flex-col font-rubik gap-[30px] items-start w-full"
                  orientation="vertical"
                >
                  <div className="flex flex-1 flex-col gap-2.5 items-end justify-start my-0 w-full">
                    <div className="flex flex-row sm:gap-10 items-center justify-between w-full">
                      <div className="flex flex-row gap-[15px] items-center justify-start w-40">
                        <Img
                          className="h-[54px] md:h-auto rounded-[50%] w-[54px]"
                          src="images/img_image_54x54.png"
                          alt="image"
                        />
                        <div className="flex flex-col gap-[5px] items-start justify-start w-[91px]">
                          <Text
                            className="text-black-900 text-sm tracking-[-0.50px] w-auto"
                            size="txtRubikRegular14Black900"
                          >
                            Ralph Edwards
                          </Text>
                          <Text
                            className="text-bluegray-400 text-xs tracking-[-0.50px] w-auto"
                            size="txtRubikRegular12"
                          >
                            2 minutes ago
                          </Text>
                        </div>
                      </div>
                      <Img
                        className="h-4 w-32"
                        src="images/img_star_orange_400.svg"
                        alt="star"
                      />
                    </div>
                    <Text
                      className="leading-[35.00px] max-w-[565px] md:max-w-full text-black-900 text-sm tracking-[-0.50px]"
                      size="txtRubikRegular14Black900"
                    >
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. A
                      justo turpis massa tristique augue dignissim volutpat.
                      Quis ultricies eu libero tortor dictumst.
                    </Text>
                  </div>
                  <div className="flex flex-1 flex-col gap-2.5 items-end justify-start my-0 w-full">
                    <div className="flex flex-row sm:gap-10 items-center justify-between w-full">
                      <div className="flex flex-row gap-[15px] items-center justify-start w-40">
                        <Img
                          className="h-[54px] md:h-auto rounded-[50%] w-[54px]"
                          src="images/img_image_54x54.png"
                          alt="image"
                        />
                        <div className="flex flex-col gap-[5px] items-start justify-start w-[91px]">
                          <Text
                            className="text-black-900 text-sm tracking-[-0.50px] w-auto"
                            size="txtRubikRegular14Black900"
                          >
                            Ralph Edwards
                          </Text>
                          <Text
                            className="text-bluegray-400 text-xs tracking-[-0.50px] w-auto"
                            size="txtRubikRegular12"
                          >
                            2 minutes ago
                          </Text>
                        </div>
                      </div>
                      <Img
                        className="h-4 w-32"
                        src="images/img_star_orange_400.svg"
                        alt="star"
                      />
                    </div>
                    <Text
                      className="leading-[35.00px] max-w-[565px] md:max-w-full text-black-900 text-sm tracking-[-0.50px]"
                      size="txtRubikRegular14Black900"
                    >
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. A
                      justo turpis massa tristique augue dignissim volutpat.
                      Quis ultricies eu libero tortor dictumst.
                    </Text>
                  </div>
                </List>
              </div>
              <div className="flex flex-col font-raleway gap-6 items-center justify-start w-full">
                <Text
                  className="text-2xl md:text-[22px] text-black-900 text-center sm:text-xl tracking-[-0.50px] w-full"
                  size="txtRalewayBold24"
                >
                  Write your review
                </Text>
                <div className="flex flex-col gap-8 items-start justify-start w-full md:w-full">
                  <div className="flex flex-col gap-[50px] items-start justify-start w-full">
                    <div className="flex flex-col gap-[17px] items-start justify-start w-full">
                      <Text
                        className="text-black-900 text-lg tracking-[-0.50px] w-full"
                        size="txtRalewayRomanSemiBold18"
                      >
                        Your Rating
                      </Text>
                      <Img
                        className="h-4 w-32"
                        src="images/img_star_bluegray_100.svg"
                        alt="star"
                      />
                    </div>
                    <div className="flex flex-col gap-[31px] items-start justify-start w-full">
                      <div className="flex md:flex-col flex-row gap-4 items-start justify-start w-full">
                        <div className="flex flex-1 flex-col gap-[17px] items-start justify-start w-full">
                          <Text
                            className="text-black-900 text-lg tracking-[-0.50px] w-auto"
                            size="txtRalewayRomanSemiBold18"
                          >
                            Your Name
                          </Text>
                          <Input
                            name="frame48096015"
                            placeholder="Write your name here...."
                            className="font-rubik p-0 placeholder:text-gray-500 sm:pr-5 text-gray-500 text-left text-sm tracking-[-0.50px] w-full"
                            wrapClassName="border border-bluegray-100 border-solid pl-[18px] pr-[35px] py-5 w-full"
                            type="text"
                          ></Input>
                        </div>
                        <div className="flex flex-1 flex-col gap-[17px] items-start justify-start w-full">
                          <Text
                            className="text-black-900 text-lg tracking-[-0.50px] w-auto"
                            size="txtRalewayRomanSemiBold18"
                          >
                            Your Email
                          </Text>
                          <Input
                            name="frame48096015_One"
                            placeholder="Write your email here...."
                            className="font-rubik p-0 placeholder:text-gray-500 sm:pr-5 text-gray-500 text-left text-sm tracking-[-0.50px] w-full"
                            wrapClassName="border border-bluegray-100 border-solid pl-[18px] pr-[35px] py-5 w-full"
                            type="email"
                          ></Input>
                        </div>
                      </div>
                      <div className="flex flex-col gap-[17px] items-start justify-start w-full">
                        <Text
                          className="text-black-900 text-lg tracking-[-0.50px] w-full"
                          size="txtRalewayRomanSemiBold18"
                        >
                          Your Review
                        </Text>
                        <div className="border border-bluegray-100 border-solid flex flex-col font-rubik h-[218px] md:h-auto items-start justify-start p-4 w-full">
                          <Text
                            className="text-gray-500 text-sm tracking-[-0.50px] w-auto"
                            size="txtRubikRegular14"
                          >
                            Write your review here....
                          </Text>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col font-poppins gap-[30px] items-start justify-start w-full">
                    <CheckBox
                      className="italic leading-[normal] sm:pr-5 text-gray-500 text-left text-sm tracking-[-0.50px]"
                      inputClassName="border border-bluegray-100 border-solid h-[18px] mr-[5px] w-[18px]"
                      name="savemynameemail_One"
                      id="savemynameemail_One"
                      label="Save my name, email, and website in this browser for the next time I comment."
                    ></CheckBox>
                    <Button className="bg-bluegray-900 border-2 border-bluegray-900 border-solid cursor-pointer font-medium leading-[normal] min-w-[155px] py-[13px] text-base text-center text-white-A700 tracking-[-0.50px]">
                      Submit
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-1 flex-col font-poppins gap-[21px] items-center justify-start w-full">
              <div className="bg-gray-53 flex flex-col items-start justify-start md:px-10 sm:px-5 px-[43px] py-6 w-full">
                <div className="flex sm:flex-col flex-row gap-[42px] items-start justify-start w-full">
                  <div className="flex flex-1 flex-col gap-[23px] items-start justify-start w-full">
                    <div className="flex flex-col gap-[31px] items-start justify-start w-full">
                      <Text
                        className="text-bluegray-900 text-lg tracking-[-0.50px] w-full"
                        size="txtRubikRegular18Bluegray900"
                      >
                        Living Room
                      </Text>
                      <Text
                        className="max-w-[313px] md:max-w-full text-4xl sm:text-[32px] md:text-[34px] text-black-900 tracking-[-0.50px]"
                        size="txtRalewayBold36Black900"
                      >
                        The best foam padded chair
                      </Text>
                    </div>
                    <Button className="border-2 border-bluegray-900 border-solid cursor-pointer font-medium leading-[normal] min-w-[155px] py-[13px] text-base text-bluegray-900 text-center tracking-[-0.50px]">
                      Shop Now
                    </Button>
                  </div>
                  <Img
                    className="h-[301px] md:h-auto max-h-[301px] object-cover sm:w-[]"
                    src="images/img_sammoghadamkh.png"
                    alt="sammoghadamkh"
                  />
                </div>
              </div>
              <PagerIndicator
                className="flex h-[15px] justify-center w-[75px]"
                count={3}
                activeCss="inline-block cursor-pointer rounded-[50%] h-[15px] bg-bluegray-900 w-[15px]"
                activeIndex={1}
                inactiveCss="inline-block cursor-pointer rounded-[50%] h-[15px] bg-gray-200 w-[15px]"
                selectedWrapperCss="inline-block md:ml-[0] mx-[7.50px] sm:ml-[0]"
                unselectedWrapperCss="inline-block md:ml-[0] mx-[7.50px] sm:ml-[0]"
              />
            </div>
          </div>
        </div> */}
        {/* <div className="flex flex-col font-raleway items-center justify-start md:px-10 sm:px-5 px-[75px] w-full">
          <div className="flex flex-col gap-[43px] items-center justify-start max-w-[1290px] mx-auto w-full">
            <Text
              className="sm:text-4xl md:text-[38px] text-[40px] text-black-900 text-center tracking-[-0.50px] w-auto"
              size="txtRalewayBold40"
            >
              Related Products
            </Text>
            <div className="flex flex-col font-rubik gap-[43px] items-center justify-start w-full">
              <Slider
                autoPlay
                autoPlayInterval={2000}
                activeIndex={sliderState}
                responsive={{
                  0: { items: 1 },
                  550: { items: 1 },
                  1050: { items: 1 },
                }}
                onSlideChanged={(e) => {
                  setsliderState(e?.item);
                }}
                ref={sliderRef}
                className="w-full"
                items={[...Array(3)].map(() => (
                  <React.Fragment key={Math.random()}>
                    <List
                      className="sm:flex-col flex-row gap-[19px] grid sm:grid-cols-1 md:grid-cols-2 grid-cols-4 justify-center mx-2.5"
                      orientation="horizontal"
                    >
                      {homepageCardproductPropList1.map((props, index) => (
                        <React.Fragment key={`HomepageCardproduct${index}`}>
                          <HomepageCardproduct
                            className="flex flex-col gap-4 items-start justify-start w-full"
                            {...props}
                          />
                        </React.Fragment>
                      ))}
                    </List>
                  </React.Fragment>
                ))}
                renderDotsItem={({ isActive }) => {
                  if (isActive) {
                    return (
                      <div className="inline-block cursor-pointer rounded-[50%] h-[15px] bg-bluegray-900 w-[15px]" />
                    );
                  }
                  return (
                    <div
                      className="inline-block cursor-pointer rounded-[50%] h-[15px] bg-gray-200 w-[15px]"
                      role="button"
                      tabIndex={0}
                    />
                  );
                }}
              />
              <PagerIndicator
                className="flex gap-[15px] h-[15px] items-start justify-center max-w-[1289px] w-full"
                count={3}
                activeCss="inline-block cursor-pointer rounded-[50%] h-[15px] bg-bluegray-900 w-[15px]"
                activeIndex={sliderState}
                inactiveCss="inline-block cursor-pointer rounded-[50%] h-[15px] bg-gray-200 w-[15px]"
                sliderRef={sliderRef}
                selectedWrapperCss="inline-block"
                unselectedWrapperCss="inline-block"
              />
            </div>
          </div>
        </div> */}
        {/* <div className="flex flex-col font-rubik items-start justify-start max-w-[1428px] mx-auto md:px-5 w-full">
          <CartColumnframe48095972 className="bg-gradient  flex flex-col gap-2 items-start justify-start max-w-[1278px] md:pl-10 sm:pl-5 pl-[59px] py-[46px] w-full" />
        </div> */}

        <CartSectionfooter className="bg-black-900 flex font-raleway gap-2 items-center justify-center md:px-5 px-[75px] py-[50px] w-full" />
      </div>
    </>
  );
};

export default DetailReviewPage;
