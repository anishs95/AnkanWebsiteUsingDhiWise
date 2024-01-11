import React, {useEffect} from "react";

import { Button, Img, Line, List, Text } from "components";
import CartNavbar from "components/CartNavbar";
import CartSectionfooter from "components/CartSectionfooter";
import successOrder from "assets/images/successOrder.png";

import { useLocation, useNavigate, useParams } from "react-router-dom";

const SummaryPage = () => {
  const location = useLocation();
  const { padeId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("CHEKOUT VALUE : "+ padeId);
      } catch (error) {
       
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <div className="bg-gray-50 flex flex-col font-rubik sm:gap-10 md:gap-10 gap-[100px] items-start justify-start mx-auto w-auto sm:w-full md:w-full">
        <div className="flex flex-col items-start justify-start w-full shadow-md">
          <CartNavbar className="bg-white-A700 flex items-center justify-center md:px-5 px-[75px] py-[15px] w-full" />
        </div>
        <div className="flex flex-col items-start justify-center md:px-10 sm:px-5 px-[75px] w-full">
          <div className="flex flex-col gap-[50px] items-center justify-start max-w-[1290px] mx-auto w-full">
            {padeId === '0' && (
              <div className="flex flex-col gap-[13px] items-center justify-start w-full">
                <Img
                  className="common-pointer h-20 ml-1 w-20"
                  src={successOrder}
                  alt="minus"
                  //   onClick={handleDecrement}
                />
                <Text
                  className="sm:text-4xl md:text-[38px] text-[40px] text-black-900 text-center tracking-[-0.50px] w-full"
                  size="txtRalewayBold40"
                >
                  Order Success
                </Text>
                <Text
                  className="leading-[35.00px] text-center text-gray-500 text-lg tracking-[-0.50px]"
                  size="txtRubikRegular18Gray500"
                >
                  <>Thanks for Placing Order From Ankan Chem Pvt. Lmt</>
                </Text>
              </div>
            )}

            <div className="flex md:flex-col flex-row font-rubik md:gap-10 gap-[61px] items-start justify-start w-full">
              <List
                className="flex flex-1 flex-col gap-[30px] items-start w-full mt-8"
                orientation="vertical"
              >
                {location.state.items &&
                  location.state.items.map((item, index) => (
                    <div
                      key={index}
                      className="flex flex-1 md:flex-col flex-row gap-5 items-center justify-start w-full border border-gray-300 p-3 shadow-md"
                    >
                      <div className="flex flex-1 sm:flex-col flex-row gap-5 items-center justify-start w-full">
                        <Img
                          className="h-[120px] md:h-auto object-cover w-[120px]"
                          src={item.imageUrl} // replace with the actual property from your API response
                          alt={item.altText} // replace with the actual property from your API response
                        />
                        <div className="flex flex-col gap-1 items-start justify-start w-auto">
                          <Text
                            className="leading-[35.00px] max-w-[294px] md:max-w-full text-black-900 text-xl tracking-[-0.50px]"
                            size="txtRalewayRomanBold20"
                          >
                            {item.productName}{" "}
                            {/* replace with the actual property from your API response */}
                          </Text>
                          <Text
                            className="text-bluegray-800 text-base tracking-[-0.50px] w-auto"
                            size="txtPoppinsBold10"
                          >
                            {`Quantity :- ${item.quantity}`}{" "}
                            {/* replace with the actual property from your API response */}
                          </Text>
                          <Text
                            className="text-bluegray-800 text-base tracking-[-0.50px] w-auto"
                            size="txtPoppinsBold10"
                          >
                            {`Amount :- ₹ ${item.itemTotal}`}{" "}
                            {/* replace with the actual property from your API response */}
                          </Text>
                        </div>
                      </div>

                      <Text
                        className="text-green-900 text-lg tracking-[-0.50px] w-auto"
                        size="txtRubikSemiBold18"
                      >
                        {` ${item.status}`}{" "}
                      </Text>
                    </div>
                  ))}
              </List>
              <div className="flex sm:flex-1 flex-col items-end justify-start sm:px-5 px-[57px] py-[31px] w-auto sm:w-full">
                {/* Order Summary Side Bar */}
                <div className="bg-gray-53 flex flex-col gap-[17px] items-start justify-start w-auto mb-4 p-4 shadow-md  flex-grow">
                  <Text
                    className="text-black-900 text-xl tracking-[-0.50px] w-auto"
                    size="txtRalewayRomanBold20"
                  >
                    Order Summary
                  </Text>
                  <Line className="bg-black-900 h-px w-full" />
                  <div className="flex flex-row items-center justify-between w-full">
                    <Text
                      className="text-black-900 text-base tracking-[-0.50px] w-auto mr-4"
                      size="txtPoppinsSemiBold20"
                    >
                      {`Order Id `}
                    </Text>
                    <Text
                      className="text-black-900 text-base tracking-[-0.50px] w-auto mr-4"
                      size="txtPoppinsSemiBold20"
                    >
                      {``}
                    </Text>
                    <Text
                      className="text-black-100 text-base tracking-[-0.50px] w-auto"
                      size="txtPoppinsSemiBold10"
                    >
                      {`${location.state.id} `}
                    </Text>
                  </div>
                  <div className="flex flex-row items-center justify-between w-full">
                    <Text
                      className="text-black-900 text-base tracking-[-0.50px] w-auto mr-4"
                      size="txtPoppinsSemiBold20"
                    >
                      {`Order Date `}
                    </Text>
                    <Text
                      className="text-black-900 text-base tracking-[-0.50px] w-auto mr-4"
                      size="txtPoppinsSemiBold20"
                    >
                      {``}
                    </Text>
                    <Text
                      className="text-black-100 text-base tracking-[-0.50px] w-auto"
                      size="txtPoppinsSemiBold10"
                    >
                      {`${new Date(location.state.orderDate).toDateString()} `}
                    </Text>
                  </div>
                  <div className="flex flex-row items-center justify-between w-full">
                    <Text
                      className="text-black-900 text-base tracking-[-0.50px] w-auto mr-4"
                      size="txtPoppinsSemiBold20"
                    >
                      {`Payment Mode`}
                    </Text>
                    <Text
                      className="text-black-900 text-base tracking-[-0.50px] w-auto mr-4"
                      size="txtPoppinsSemiBold20"
                    >
                      {``}
                    </Text>
                    <Text
                      className="text-black-100 text-base tracking-[-0.50px] w-auto"
                      size="txtPoppinsSemiBold10"
                    >
                      {`${location.state.modeOfPayment} `}
                    </Text>
                  </div>
                  <div className="flex flex-row items-center justify-between w-full">
                    <Text
                      className="text-black-900 text-base tracking-[-0.50px] w-auto mr-4"
                      size="txtPoppinsSemiBold20"
                    >
                      {`Item Sub-Total `}
                    </Text>
                    <Text
                      className="text-black-900 text-base tracking-[-0.50px] w-auto mr-4"
                      size="txtPoppinsSemiBold20"
                    >
                      {``}
                    </Text>
                    <Text
                      className="text-black-100 text-base tracking-[-0.50px] w-auto"
                      size="txtPoppinsSemiBold10"
                    >
                      {`${location.state.itemSubTotal} `}
                    </Text>
                  </div>
                  <div className="flex flex-row items-center justify-between w-full">
                    <Text
                      className="text-black-900 text-base tracking-[-0.50px] w-auto mr-4"
                      size="txtPoppinsSemiBold20"
                    >
                      {`Discount (-) `}
                    </Text>
                    <Text
                      className="text-black-900 text-base tracking-[-0.50px] w-auto mr-4"
                      size="txtPoppinsSemiBold20"
                    >
                      {``}
                    </Text>
                    <Text
                      className="text-black-100 text-base tracking-[-0.50px] w-auto"
                      size="txtPoppinsSemiBold10"
                    >
                      {`${location.state.discount} `}
                    </Text>
                  </div>
                  <div className="flex flex-row items-center justify-between w-full">
                    <Text
                      className="text-black-900 text-base tracking-[-0.50px] w-auto mr-4"
                      size="txtPoppinsSemiBold20"
                    >
                      {`Shipping Cost `}
                    </Text>
                    <Text
                      className="text-black-900 text-base tracking-[-0.50px] w-auto mr-4"
                      size="txtPoppinsSemiBold20"
                    >
                      {``}
                    </Text>
                    <Text
                      className="text-black-100 text-base tracking-[-0.50px] w-auto"
                      size="txtPoppinsSemiBold10"
                    >
                      {`${location.state.shippingCost} `}
                    </Text>
                  </div>
                  <Line className="bg-black-900 h-px w-full" />
                  <div className="flex flex-row items-center justify-between w-full">
                    <Text
                      className="text-black-900 text-lg tracking-[-0.50px] w-auto mr-4"
                      size="txtPoppinsSemiBold20"
                    >
                      {`Grand Total `}
                    </Text>
                    <Text
                      className="text-black-900 text-lg tracking-[-0.50px] w-auto mr-4"
                      size="txtPoppinsSemiBold20"
                    >
                      {``}
                    </Text>
                    <Text
                      className="text-green-900 text-lg tracking-[-0.50px] w-auto"
                      size="txtPoppinsSemiBold20"
                    >
                      {`₹ ${location.state.grandTotal} `}
                    </Text>
                  </div>
                </div>
                {/* SHIPPING DETAILS */}
                <div className="bg-gray-53 flex flex-col gap-[1px] items-start justify-start w-auto p-4 shadow-md  flex-grow">
                  <Text
                    className="text-black-900 text-xl tracking-[-0.50px] w-auto mb-4"
                    size="txtRalewayRomanBold20"
                  >
                    Shipping Address
                  </Text>
                  <Line className="bg-black-900 h-px w-full" />
                  <div className="flex flex-row items-center justify-between w-full">
                    <Text
                      className="text-black-900 text-base tracking-[-0.50px] w-auto mr-4 mt-4"
                      size="txtPoppinsSemiBold20"
                    >
                      {``}
                    </Text>
                    <Text
                      className="text-black-900 text-base tracking-[-0.50px] w-auto mr-4"
                      size="txtPoppinsSemiBold20"
                    >
                      {``}
                    </Text>
                    <Text
                      className="text-black-100 text-base tracking-[-0.50px] w-auto mt-4"
                      size="txtPoppinsSemiBold10"
                    >
                      {`${location.state.billingAddress.addressLine1} `}
                    </Text>
                  </div>
                  <div className="flex flex-row items-center justify-between w-full">
                    <Text
                      className="text-black-900 text-base tracking-[-0.50px] w-auto mr-4"
                      size="txtPoppinsSemiBold20"
                    >
                      {``}
                    </Text>
                    <Text
                      className="text-black-900 text-base tracking-[-0.50px] w-auto mr-4"
                      size="txtPoppinsSemiBold20"
                    >
                      {``}
                    </Text>
                    <Text
                      className="text-black-100 text-base tracking-[-0.50px] w-auto"
                      size="txtPoppinsSemiBold10"
                    >
                      {`${location.state.billingAddress.addressLine2} `}
                    </Text>
                  </div>
                  <div className="flex flex-row items-center justify-between w-full">
                    <Text
                      className="text-black-900 text-base tracking-[-0.50px] w-auto mr-4"
                      size="txtPoppinsSemiBold20"
                    >
                      {``}
                    </Text>
                    <Text
                      className="text-black-900 text-base tracking-[-0.50px] w-auto mr-4"
                      size="txtPoppinsSemiBold20"
                    >
                      {``}
                    </Text>
                    <Text
                      className="text-black-100 text-base tracking-[-0.50px] w-auto"
                      size="txtPoppinsSemiBold10"
                    >
                      {`${location.state.billingAddress.city} `}
                    </Text>
                  </div>

                  <div className="flex flex-row items-center justify-between w-full">
                    <Text
                      className="text-black-900 text-base tracking-[-0.50px] w-auto mr-4"
                      size="txtPoppinsSemiBold20"
                    >
                      {``}
                    </Text>
                    <Text
                      className="text-black-900 text-base tracking-[-0.50px] w-auto mr-4"
                      size="txtPoppinsSemiBold20"
                    >
                      {``}
                    </Text>
                    <Text
                      className="text-black-100 text-base tracking-[-0.50px] w-auto"
                      size="txtPoppinsSemiBold10"
                    >
                      {`${location.state.billingAddress.district} `}
                    </Text>
                  </div>
                  <div className="flex flex-row items-center justify-between w-full">
                    <Text
                      className="text-black-900 text-base tracking-[-0.50px] w-auto mr-4"
                      size="txtPoppinsSemiBold20"
                    >
                      {``}
                    </Text>
                    <Text
                      className="text-black-900 text-base tracking-[-0.50px] w-auto mr-4"
                      size="txtPoppinsSemiBold20"
                    >
                      {``}
                    </Text>
                    <Text
                      className="text-black-100 text-base tracking-[-0.50px] w-auto"
                      size="txtPoppinsSemiBold10"
                    >
                      {`${location.state.billingAddress.state} `}
                    </Text>
                  </div>
                  <div className="flex flex-row items-center justify-between w-full">
                    <Text
                      className="text-black-900 text-base tracking-[-0.50px] w-auto mr-4"
                      size="txtPoppinsSemiBold20"
                    >
                      {``}
                    </Text>
                    <Text
                      className="text-black-900 text-base tracking-[-0.50px] w-auto mr-4"
                      size="txtPoppinsSemiBold20"
                    >
                      {``}
                    </Text>
                    <Text
                      className="text-black-100 text-base tracking-[-0.50px] w-auto mb-4"
                      size="txtPoppinsSemiBold10"
                    >
                      {`${location.state.billingAddress.zipCode} `}
                    </Text>
                  </div>

                  <Button
                    className="common-pointer bg-bluegray-900 cursor-pointer font-rubik font-semibold leading-[normal] py-3.5 px-4 text-center text-lg text-yellow-100 tracking-[-0.50px] w-full"
                      onClick={() =>{
                        window.history.replaceState(null, '', '/');
                        window.location.replace('/');
                      }}
                    //  onClick={ navigate("/signin", { replace: true })}
                  >
                    Continue Shopping
                  </Button>
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

export default SummaryPage;
