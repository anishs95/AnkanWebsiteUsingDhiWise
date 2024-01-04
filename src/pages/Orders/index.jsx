import React, { useEffect, useState, useRef } from "react";

import { Button, Img, List, SelectBox, Text } from "components";
import CartColumnframe48095972 from "components/CartColumnframe48095972";
import CartNavbar from "components/CartNavbar";
import CartSectionfooter from "components/CartSectionfooter";
import TeamCardteam from "components/TeamCardteam";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PurchaseService from "../../services/purchaseService";
import viewImg from "assets/images/view.png";

const homeOptionsList = [
  { label: "Option1", value: "option1" },
  { label: "Option2", value: "option2" },
  { label: "Option3", value: "option3" },
];

const OrderPage = () => {
  const [purchaseOrders, setPurchaseOrders] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      console.log("Called PURCHASE ORDER DETAILS");
      try {
        const response = await PurchaseService.purchaseHistory();
        setPurchaseOrders(response.data);
        console.log(response.data);
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

    fetchData();
  }, []);

  return (
    <>
      <div className="bg-gray-50 flex flex-col font-rubik sm:gap-10 md:gap-10 gap-[100px] items-start justify-start mx-auto w-auto sm:w-full md:w-full">
        <div className="flex flex-col items-start justify-start w-full">
          <CartNavbar className="bg-white-A700 flex items-center justify-center md:px-5 px-[75px] py-[15px] w-full shadow-md" />
        </div>
        <div className="flex flex-col items-start justify-center md:px-10 sm:px-5 px-[75px] w-full">
          <div className="flex flex-col gap-[50px] items-center justify-start max-w-[1290px] mx-auto w-full">
            <div className="flex flex-col gap-[13px] items-center justify-start w-full">
              <Text
                className="sm:text-4xl md:text-[38px] text-[40px] text-black-900 text-center tracking-[-0.50px] w-full"
                size="txtRalewayBold40"
              >
                My Recent Orders {purchaseOrders && purchaseOrders.length}
              </Text>
              {/* <Text
                className="leading-[35.00px] text-center text-gray-500 text-lg tracking-[-0.50px]"
                size="txtRubikRegular18Gray500"
              >
                <>
                  We write various things related to furniture, from tips and
                  what things <br />I need to pay attention to when choosing
                  furniture
                </>
              </Text> */}
            </div>
          </div>
        </div>
        <div className="flex flex-col items-start justify-start md:px-10 sm:px-5 px-[75px] w-full">
          <List
            className="flex flex-1 flex-col gap-[30px] items-start w-full"
            orientation="vertical"
          >
            {purchaseOrders &&
              purchaseOrders.map((item, index) => (
                <div
                  key={index}
                  className="flex flex-1 md:flex-col flex-row gap-[49px] items-center justify-start my-0 w-full border border-gray-300 p-3 shadow-md"
                >
                  <div className="flex flex-col gap-4 items-start justify-start w-auto">
                    <Text
                      className="leading-[35.00px] max-w-[294px] md:max-w-full text-black-900 text-xl tracking-[-0.50px]"
                      size="txtRalewayRomanBold20"
                    >
                      {`Id : ${item.id}`}{" "}
                      {/* replace with the actual property from your API response */}
                    </Text>
                    <Text
                      className="text-bluegray-900 text-xl tracking-[-0.50px] w-auto"
                      size="txtPoppinsBold20"
                    >
                      {`${new Date(item.orderDate).toDateString()} `}
                      {/* replace with the actual property from your API response */}
                    </Text>
                  </div>
                  <div className="flex flex-1 sm:flex-col flex-row gap-5 items-center justify-start w-full">
                    <div className="flex flex-1 sm:flex-col flex-row gap-5 items-center justify-start w-full">
                      <div className="flex max overflow-x-auto  gap-2 ">
                        {item.items.map((item, index) => (
                          <Img
                            key={index}
                            className="h-[120px] md:h-auto object-cover w-[120px]"
                            src={item.imageUrl} // replace with the actual property from your API response
                            alt={item.altText} // replace with the actual property from your API response
                          />
                        ))}
                      </div>
                    </div>
                  </div>

                  <Text
                    className="text-black-900 text-lg tracking-[-0.50px] w-auto"
                    size="txtRubikSemiBold18"
                  >
                    {`Total : ₹ ${item.grandTotal}`}{" "}
                  </Text>
                  <Img
                    className="common-pointer h-10 ml-1 w-10"
                    src={viewImg}
                    alt="minus"
                    onClick={() =>  navigate("/summary/1", {state: item})}
                  />
                </div>
              ))}
          </List>
        </div>
        <CartSectionfooter className="bg-black-900 flex font-raleway gap-2 items-center justify-center md:px-5 px-[75px] py-[50px] w-full" />
      </div>
    </>
  );
};

export default OrderPage;
