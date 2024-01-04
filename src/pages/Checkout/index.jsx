import React, { useState } from "react";

import { Button, Img, Input, Line, SelectBox, Text } from "components";
import CartColumnframe48095972 from "components/CartColumnframe48095972";
import CartNavbar from "components/CartNavbar";
import CartSectionfooter from "components/CartSectionfooter";
import {useLocation, useNavigate} from 'react-router-dom';
import PurchaseService from "../../services/purchaseService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const homeOptionsList = [
  { label: "Option1", value: "option1" },
  { label: "Option2", value: "option2" },
  { label: "Option3", value: "option3" },
];
const unitedStatesUsOptionsList = [
  { label: "Option1", value: "option1" },
  { label: "Option2", value: "option2" },
  { label: "Option3", value: "option3" },
];

const CheckoutPage = () => {
  const navigate = useNavigate();
  const [selectedPayment, setSelectedPayment] = useState("cod");
  const location = useLocation();
  const [addressDetails, setAddressDetails] = useState({
    addressLine1: '',
    addressLine2: '',
    city: '',
    district: '',
    state: '',
    zipCode: '',
  });

  const handlePaymentChange = (event) => {
    setSelectedPayment(event.target.value);
  };

  const handleInputChange = (fieldName, value) => {
    setAddressDetails((prevDetails) => ({
      ...prevDetails,
      [fieldName]: value,
    }));
  };

  const placeOrderButtonClick = async (event) => {
    console.log("Place Order Button Clicked");

    var orderDetail = {
      UserId: "6315b73aec764d5a5c5e74eb",
      LocationId: "6315a5678634010a50742e52",
      UserName: "as",
      LocationName: "Kochi",
      Items: location.state.items,
      BillingAddress: addressDetails,
      ShippingAddress: addressDetails,
      ShippingCost: 0,
      ModeOfPayment: selectedPayment == "cod"? "COD":"UPI",
      Status: 0,
      Discount: 0,
      CouponCode: "",
    };

    console.log("order request : "+ JSON.stringify(orderDetail));

    try {
      const response = await PurchaseService.placeOrder( orderDetail);
     // setProduct(response.data); // Assuming the response data is an array of products
      console.log("Called PURCHSE  DETAIL ");
      console.log(response.data);
      navigate("/summary/0", {state: response.data})
    
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
        <CartNavbar className="bg-white-A700 flex items-center justify-center md:px-5 px-[75px] py-[15px] w-full shadow-md" />
        <div className="flex flex-col font-raleway items-center justify-start md:px-10 sm:px-5 px-[75px] w-full">
          <div className="flex flex-col gap-[50px] items-center justify-start max-w-[1290px] mx-auto w-full">
            <Text
              className="sm:text-4xl md:text-[38px] text-[40px] text-black-900 text-center tracking-[-0.50px] w-full"
              size="txtRalewayBold40"
            >
              Checkout
            </Text>
            <div className="flex md:flex-col flex-row gap-[19px] items-start justify-center w-full">
              <div className="flex flex-1 flex-col gap-[53px] items-start justify-start w-full">
                <div className="flex flex-col gap-9 items-start justify-start w-full">
                  <Text
                    className="text-2xl md:text-[22px] text-black-900 sm:text-xl tracking-[-0.50px] w-full"
                    size="txtRalewayBold24"
                  >
                    Contact Information
                  </Text>
                  <div className="flex flex-col gap-[35px] items-start justify-start w-full">
                    <div className="flex md:flex-col flex-row gap-5 items-start justify-start w-full">
                      <div className="flex flex-1 flex-col gap-3 items-start justify-start w-full">
                        <Text
                          className="text-black-900 text-xl tracking-[-0.50px] w-full"
                          size="txtRalewayRomanRegular20Black900"
                        >
                          Address Line 1
                        </Text>
                        <Input
                          name="frame48096050"
                          value={addressDetails.addressLine1}
                          onChange={(e) => handleInputChange('addressLine1', e)}
                          placeholder=""
                          className="font-rubik leading-[normal] p-0 placeholder:text-gray-500 sm:px-5 text-gray-500 text-left text-sm tracking-[-0.50px] w-full"
                          wrapClassName="border border-bluegray-100 border-solid pl-[22px] pr-[35px] py-[18px] w-full"
                          type="text"
                        ></Input>
                      </div>
                    </div>
                    <div className="flex md:flex-col flex-row gap-5 items-start justify-start w-full">
                      <div className="flex flex-1 flex-col gap-3 items-start justify-start w-full">
                        <Text
                          className="text-black-900 text-xl tracking-[-0.50px] w-full"
                          size="txtRalewayRomanRegular20Black900"
                        >
                          Address Line 2
                        </Text>
                        <Input
                          name="frame48096050"
                          value={addressDetails.addressLine2}
                          onChange={(e) => handleInputChange('addressLine2', e)}
                          placeholder=""
                          className="font-rubik leading-[normal] p-0 placeholder:text-gray-500 sm:px-5 text-gray-500 text-left text-sm tracking-[-0.50px] w-full"
                          wrapClassName="border border-bluegray-100 border-solid pl-[22px] pr-[35px] py-[18px] w-full"
                          type="text"
                        ></Input>
                      </div>
                    </div>
                    <div className="flex md:flex-col flex-row gap-5 items-start justify-start w-full">
                      <div className="flex flex-1 flex-col gap-3 items-start justify-start w-full">
                        <Text
                          className="text-black-900 text-xl tracking-[-0.50px] w-full"
                          size="txtRalewayRomanRegular20Black900"
                        >
                          City
                        </Text>
                        <Input
                          name="frame48096050"
                          value={addressDetails.city}
                          onChange={(e) => handleInputChange('city', e)}
                          placeholder=""
                          className="font-rubik leading-[normal] p-0 placeholder:text-gray-500 sm:px-5 text-gray-500 text-left text-sm tracking-[-0.50px] w-full"
                          wrapClassName="border border-bluegray-100 border-solid pl-[22px] pr-[35px] py-[18px] w-full"
                          type="text"
                        ></Input>
                      </div>
                    </div>
                    <div className="flex md:flex-col flex-row gap-5 items-start justify-start w-full">
                      <div className="flex flex-1 flex-col gap-3 items-start justify-start w-full">
                        <Text
                          className="text-black-900 text-xl tracking-[-0.50px] w-full"
                          size="txtRalewayRomanRegular20Black900"
                        >
                          District
                        </Text>
                        <Input
                          name="frame48096050"
                          value={addressDetails.district}
                          onChange={(e) => handleInputChange('district', e)}
                          placeholder=""
                          className="font-rubik leading-[normal] p-0 placeholder:text-gray-500 sm:px-5 text-gray-500 text-left text-sm tracking-[-0.50px] w-full"
                          wrapClassName="border border-bluegray-100 border-solid pl-[22px] pr-[35px] py-[18px] w-full"
                          type="text"
                        ></Input>
                      </div>
                      <div className="flex flex-1 flex-col gap-3 items-start justify-start w-full">
                        <Text
                          className="text-black-900 text-xl tracking-[-0.50px] w-full"
                          size="txtRalewayRomanRegular20Black900"
                        >
                          State
                        </Text>
                        <Input
                          name="frame48096050"
                          value={addressDetails.state}
                          onChange={(e) => handleInputChange('state', e)}
                          placeholder=""
                          className="font-rubik leading-[normal] p-0 placeholder:text-gray-500 sm:px-5 text-gray-500 text-left text-sm tracking-[-0.50px] w-full"
                          wrapClassName="border border-bluegray-100 border-solid pl-[22px] pr-[35px] py-[18px] w-full"
                          type="text"
                        ></Input>
                      </div>
                    </div>
                    <div className="flex md:flex-col flex-row gap-5 items-start justify-start w-full">
                      <div className="flex flex-1 flex-col gap-3 items-start justify-start w-full">
                        <Text
                          className="text-black-900 text-xl tracking-[-0.50px] w-full"
                          size="txtRalewayRomanRegular20Black900"
                        >
                          Pincode
                        </Text>
                        <Input
                          name="frame48096053"
                          value={addressDetails.zipCode}
                          onChange={(e) => handleInputChange('zipCode', e)}
                          placeholder=""
                          className="font-rubik leading-[normal] p-0 placeholder:text-gray-500 sm:px-5 text-gray-500 text-left text-sm tracking-[-0.50px] w-full"
                          wrapClassName="border border-bluegray-100 border-solid pl-[22px] pr-[35px] py-[18px] w-full"
                          type="number"
                        ></Input>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-9 items-start justify-start w-full">
                  <Text
                    className="text-2xl md:text-[22px] text-black-900 sm:text-xl tracking-[-0.50px] w-full"
                    size="txtRalewayBold24"
                  >
                    Payment Method
                  </Text>
                  <div className="flex sm:flex-col flex-row gap-5 items-start justify-start w-auto sm:w-full">
                    <label className="border border-bluegray-100 border-solid flex flex-row h-[73px] md:h-auto items-center justify-center p-[25px] sm:px-5 w-[155px]">
                      <input
                        type="checkbox"
                        id="cod"
                        name="paymentMethod"
                        value="cod"
                        checked={selectedPayment === "cod"} // Set the default checked state
                        onChange={handlePaymentChange}
                        style={{ marginRight: "20px" }}
                      />
                      <Img
                        className="h-[19px] md:h-auto object-cover w-[60px] sm:w-full"
                        src="images/img_visa.png"
                        alt="cod"
                      />
                    </label>

                    <label className="border border-bluegray-100 border-solid flex flex-row h-[73px] md:h-auto items-center justify-center p-[25px] sm:px-5 w-[155px]">
                      <input
                        type="checkbox"
                        id="UPI"
                        name="paymentMethod"
                        value="UPI"
                        checked={selectedPayment === "UPI"}
                        onChange={handlePaymentChange}
                        style={{ marginRight: "20px" }}
                      />
                      <Img
                        className="h-[19px] w-20"
                        src="images/img_refresh.svg"
                        alt="UPI"
                      />
                    </label>
                  </div>
                </div>
              </div>
              <div className="bg-gray-53 flex sm:flex-1 flex-col items-start justify-start sm:px-5 px-[27px] py-[34px] w-[416px] sm:w-full">
                <div className="flex flex-col gap-[30px] items-start justify-start w-full">
                  <Text
                    className="text-black-900 text-xl tracking-[-0.50px] w-full"
                    size="txtRalewayRomanBold20"
                  >
                    Your Order
                  </Text>
                  <div className="flex flex-col font-rubik gap-[25px] items-start justify-start w-full">
                    <div className="flex flex-col gap-[25px] items-start justify-start w-full">
                      
                    {location.state.items &&
                    location.state.items.map((item, index) => (
                      <div className="flex flex-row items-center justify-between w-full">
                      <Text
                        className="text-gray-500 text-xl tracking-[-0.50px] w-auto"
                        size="txtRalewayRomanRegular20"
                      >
                      {item.productName}{" "}
                      </Text>
                      <Text
                        className="text-black-900 text-xl tracking-[-0.50px] w-auto"
                        size="txtPoppinsSemiBold20"
                      >
                         {`₹ ${item.itemTotal}`}{" "}
                      </Text>
                    </div>
                    ))}
   
                     
                    </div>
                
                    <Line className="bg-black-900 h-px w-full" />
                    <div className="flex flex-row items-center justify-between w-full">
                      <Text
                        className="text-gray-500 text-xl tracking-[-0.50px] w-auto"
                        size="txtRalewayRomanRegular20"
                      >
                        Total
                      </Text>
                      <Text
                        className="text-black-900 text-xl tracking-[-0.50px] w-auto"
                        size="txtPoppinsSemiBold20"
                      >
                          {`₹ ${location.state.totalAmount}`}{" "}
                      </Text>
                    </div>
                    <Button className="bg-bluegray-900 cursor-pointer font-semibold leading-[normal] py-3.5 text-center text-lg text-yellow-100 tracking-[-0.50px] w-full"
                     onClick={() => placeOrderButtonClick()}
                    >
                      Place Order
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col font-rubik items-start justify-start md:px-10 sm:px-5 px-[75px] w-full"></div>
        <CartSectionfooter className="bg-black-900 flex font-raleway gap-2 items-center justify-center md:px-5 px-[75px] py-[50px] w-full" />
      </div>
    </>
  );
};

export default CheckoutPage;
