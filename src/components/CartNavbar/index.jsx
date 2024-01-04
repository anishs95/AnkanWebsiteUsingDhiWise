import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { Img, SelectBox, Text, Button } from "components";
import iconImage from "assets/images/iconic1.png";
import Badge from "@material-ui/core/Badge";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { useNavigate } from "react-router-dom";

import { ReactSearchAutocomplete } from "react-search-autocomplete";
import ProductService from "../../services/productService";
import CartService from "../../services/cartService";

const handleOnHover = (result) => {
  console.log(result);
};

const handleOnFocus = () => {
  console.log("Focused");
};

const CartNavbar = (props) => {
  const navigate = useNavigate();
  const [searchResult, setSerachResult] = useState([]);
  const [cartItemCount , setCartItemCount] = useState(0);
  const [refresh, setRefresh] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await CartService.getUserCart();
        setCartItemCount(response.data.items.length); // Assuming the response data is an array of products
        console.log("Called GET CART DETAILS COUNt");
        console.log(response.data.items.length);
      } catch (error) {
        setCartItemCount(0);
        console.error("Error fetching CART DATA:", error.code);
      }
    };

    fetchData();
  }, [props.refresh]);

  console.log("PROPS IN NAV : " + JSON.stringify(props));

  const handleCardClick = () => {
    navigate(`/cart`);
  };

  const handleOnSelect = (item) => {
    // the item selected
    console.log(item);
    navigate(`/product-detail/${item.id}`);
  };

  const handleOnSearch = async (string, results) => {
    console.log(string, results);
    try {
      const response = await ProductService.GetProductsForAutocomplete(string);
      //setProduct(response.data); // Assuming the response data is an array of products
      setSerachResult(response.data);
      results = response.data;
      console.log("Called GET  PRODUCTS DETAIL ");
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching product data:", error);
    }
  };

  const formatResult = (searchResult) => {
    return (
      <>
        {/* <span style={{ display: "block", textAlign: "left" }}>id: {searchResult.id}</span> */}
        <span style={{ display: "block", textAlign: "left" }}>
          {searchResult.name}
        </span>
      </>
    );
  };

  return (
    <>
      <header className={props.className}>
        <div className="flex md:flex-col flex-row md:gap-10 items-center justify-between w-full">
          <div className="header-row ">
            <Link to="/">
              <Img className="h-[60px] w-[120px]" src={iconImage} alt="car" />
            </Link>
            <div className="mobile-menu">
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
          <div className="flex sm:flex-1 flex-row gap-9 sm:hidden items-center justify-between w-[398px] sm:w-full">
            <Link to="/" className="nav-link">
              <Text
                className="text-black-900 text-lg tracking-[-0.50px] w-auto"
                size="txtRubikRomanRegular18"
              >
                Home
              </Text>
            </Link>
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
          </div>

          <div className="flex md:flex-col items-center justify-between ">
            <div
              style={{
                width: 300,
                marginRight: 30,
                position: "relative",
                zIndex: 1000,
              }}
            >
              <ReactSearchAutocomplete
                placeholder="Search Ankan Products"
                items={searchResult}
                onSearch={handleOnSearch}
                onHover={handleOnHover}
                onSelect={handleOnSelect}
                onFocus={handleOnFocus}
                //autoFocus
                formatResult={formatResult}
              />
            </div>
            <div>
              <Badge color="secondary" badgeContent={cartItemCount}>
                <Button onClick={handleCardClick}>
                  <ShoppingCartIcon />
                  {}
                </Button>
              </Badge>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

CartNavbar.defaultProps = {};

export default CartNavbar;
