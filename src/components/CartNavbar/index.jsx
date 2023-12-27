import React from "react";
import { Link } from 'react-router-dom';

import { Img, SelectBox, Text } from "components";

const homeOptionsList = [
  { label: "Option1", value: "option1" },
  { label: "Option2", value: "option2" },
  { label: "Option3", value: "option3" },
];

const CartNavbar = (props) => {
  console.log("PROPS IN NAV : "+ JSON.stringify(props));
  return (
    <>
      <header className={props.className}>
        <div className="flex md:flex-col flex-row md:gap-10 items-center justify-between w-full">
          <div className="header-row ">
            <Link to="/">
              <Img
                className="h-[60px] w-[120px]"
                src="images/ankan/iconic1.png"
                alt="car"
              />
            </Link>
            <div className="mobile-menu">
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
          <div className="flex sm:flex-1 flex-row gap-9 sm:hidden items-center justify-between w-[398px] sm:w-full">
            <Link to="/order" className="nav-link">
              <Text
                className="text-black-900 text-lg tracking-[-0.50px] w-auto"
                size="txtRubikRomanRegular18"
              >
                My Orders
              </Text>
            </Link>

            <Link to="/reward" className="nav-link">
              <Text
                className="text-black-900 text-lg tracking-[-0.50px] w-auto"
                size="txtRubikRomanRegular18"
              >
                Rewards
              </Text>
            </Link>

            <Link to="/aboutus" className="nav-link">
              <Text
                className="text-black-900 text-lg tracking-[-0.50px] w-auto"
                size="txtRubikRomanRegular18"
              >
                About Us
              </Text>
            </Link>

            {/* <Link to="/product-list" className="nav-link">
              <Text
                className="text-black-900 text-lg tracking-[-0.50px] w-auto"
                size="txtRubikRomanRegular18"
              >
                Product List
              </Text>
            </Link> */}

          </div>
          <Img
            className="h-6 sm:hidden w-[132px]"
            src="images/img_icon.svg"
            alt="icon"
          />
        </div>
      </header>
    </>
  );
};

CartNavbar.defaultProps = {};

export default CartNavbar;
