import React, { useEffect, useState, useRef } from "react";

import { Text, Img, Button } from "components";

import CartNavbar from "components/CartNavbar";
import CartSectionfooter from "components/CartSectionfooter";
import ProductCard from "components/ProductCard";
import YouTube from "react-youtube";
import { useParams } from "react-router-dom";
import filteIcon from "assets/images/filter-icon2.png";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faClose } from "@fortawesome/free-solid-svg-icons";
import {
  Container,
  Link,
  lightColors,
  darkColors,
} from "react-floating-action-button";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";

import ProductService from "../../services/productService";

const HomepagePage = () => {
  const { categoryId } = useParams();
  const [refresh, setRefresh] = useState(false);
  const [products, setProducts] = useState([]);
  const [playingVideoId, setPlayingVideoId] = useState(null);
  const youtubePlayerRef = useRef(null); // Add useRef
  const [value, setValue] = useState([0, 5000]);
  const [selectedSorting, setSelectedSorting] = useState(null);

  const handleSorting = (option) => {
    setSelectedSorting(option === selectedSorting ? null : option);
  };

  const handleFiltering = async (close) => {
    var queryString = "Price.StartPrice=" + value[0];
    queryString = queryString + "&Price.EndPrice=" + value[1];
    if (checkSortSwitch() !== "NoSort") {
      queryString = queryString + "&SortBy=" + checkSortSwitch();
    }
    console.log("CATEGORY ID   : : : :: " + categoryId);
    if (categoryId) {
      queryString = queryString + "&CategoryId=" + categoryId;
    }
    console.log("QUERY STRING :");
    console.log(queryString);

    try {
      const response = await ProductService.filterProducts(queryString);
      setProducts(response.data); // Assuming the response data is an array of products
      console.log("Called GET ALL PRODUCTS List");
      console.log(response.data);
      close();
    } catch (error) {
      console.error("Error fetching product List Data :", error);
    }
  };
  const opts = {
    height: "390",
    width: "640",
    playerVars: {
      autoplay: 1,
    },
  };

  function valuetext(value) {
    return `${value}°C`;
  }

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const _onReady = (event) => {
    //event.target.pauseVideo();
  };

  function checkSortSwitch() {
    console.log("status " + selectedSorting);
    switch (selectedSorting) {
      case "lowToHigh":
        return "PriceLowestFirst";
      case "highToLow":
        return "PriceHighestFirst";
      case "newestFirst":
        return "NewArrival";
      case "popularity":
        return "CustomerRating";
      case " fsaf":
        return "NoSort";
      default:
        return "UnKnownStatus";
    }
  }

  useEffect(() => {
    console.log("Category Id Called is : " + categoryId);
    const fetchData = async () => {
      try {
        const response = await ProductService.getAllProductsByCategory(
          categoryId
        );
        setProducts(response.data); // Assuming the response data is an array of products
        console.log("Called GET ALL PRODUCTS List");
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching product List Data :", error);
      }
    };

    fetchData();
  }, [refresh]);

  const handleVideoClick = (productId) => {
    console.log(`Video clicked for product id: ${productId}`);
    setPlayingVideoId(productId);
    if (youtubePlayerRef.current) {
      youtubePlayerRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleCloseButtonClick = () => {
    setPlayingVideoId(null); // Hide the YouTube component
  };

  const filterModel = (close) => {
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
          Product Filteration
        </div>
        <div style={{ paddingLeft: 15, fontWeight: "bold" }}>
          <Text> PRICE RANGE </Text>
        </div>
        <Box sx={{ padding: 5 }}>
          <Slider
            getAriaLabel={() => "Price Range"}
            value={value}
            onChange={handleChange}
            valueLabelDisplay="on"
            getAriaValueText={valuetext}
            min={0}
            max={10000}
          />
        </Box>
        <div style={{ paddingLeft: 15, paddingBottom: 10, fontWeight: "bold" }}>
          <Text> SORT BY</Text>
        </div>
        <div style={{ paddingLeft: 15, paddingBottom: 10 }}>
          <label className="sorting-label">
            <input
              type="radio"
              name="sortingOption"
              checked={selectedSorting === "lowToHigh"}
              onChange={() => handleSorting("lowToHigh")}
            />
            Price: Low to High
          </label>
        </div>
        <div style={{ paddingLeft: 15, paddingBottom: 10 }}>
          <label className="sorting-label">
            <input
              type="radio"
              name="sortingOption"
              checked={selectedSorting === "highToLow"}
              onChange={() => handleSorting("highToLow")}
            />
            Price: High to Low
          </label>
        </div>
        <div style={{ paddingLeft: 15, paddingBottom: 10 }}>
          <label className="sorting-label">
            <input
              type="radio"
              name="sortingOption"
              checked={selectedSorting === "newestFirst"}
              onChange={() => handleSorting("newestFirst")}
            />
            Newest First
          </label>
        </div>
        <div style={{ paddingLeft: 15 }}>
          <label className="sorting-label">
            <input
              type="radio"
              name="sortingOption"
              checked={selectedSorting === "popularity"}
              onChange={() => handleSorting("popularity")}
            />
            Popularity
          </label>
        </div>
        <div
          style={{
            textAlign: "center",
            padding: "20px",
            fontSize: 20,
            fontWeight: "bold",
          }}
        >
          <button
            style={{
              backgroundColor: "red",
              color: "white",
              padding: "10px 20px",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
            onClick={() => {
              setRefresh(!refresh);
              close();
            }}
          >
            Clear Filter
          </button>
          <button
            style={{
              backgroundColor: "blue",
              color: "white",
              padding: "10px 20px",
              border: "none",
              borderRadius: "5px",
              marginLeft: "10px", // Add left padding here
              cursor: "pointer",
            }}
            onClick={() => handleFiltering(close)}
          >
            Apply Filter
          </button>
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="bg-gray-50 flex flex-col font-rubik sm:gap-10 md:gap-10 gap-[100px] items-center justify-start mx-auto w-auto sm:w-full md:w-full">
        <div className="flex flex-col items-start justify-start w-full shadow-md">
          <CartNavbar className="bg-white-A700 flex items-center justify-center md:px-5 px-[75px] py-[15px] w-full" />
        </div>

        <div className="flex flex-col font-raleway items-center justify-start md:px-10 sm:px-5 px-[75px] w-full">
          <div className="flex flex-col md:gap-10 gap-[37px] items-center justify-start max-w-[1290px] mx-auto w-full">
            <Text
              className="md:text-3xl sm:text-[28px] text-[32px] text-bluegray-900 text-center tracking-[-0.50px] w-full"
              size="txtRalewayRomanBold32"
            >
              Product List
            </Text>
            <div className="flex flex-col font-rubik items-start justify-start w-full">
              <div className="md:gap-5 gap-[19px] grid sm:grid-cols-1 md:grid-cols-2 grid-cols-6 justify-center min-h-[auto] w-full">
                {products.map((props, index) => (
                  <React.Fragment key={`HomepageCardproduct${index}`}>
                    <ProductCard
                      className="flex flex-1 flex-col gap-4 items-start justify-start w-full"
                      status="New"
                      onVideoClick={handleVideoClick}
                      {...props}
                    />
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div ref={youtubePlayerRef} id="youtubePlayer">
          {playingVideoId && (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <div style={{ height: "50px" }}>
                {/* Your content goes here */}
              </div>
              <YouTube
                videoId={playingVideoId}
                opts={opts}
                onReady={_onReady}
              />
              <button
                onClick={handleCloseButtonClick}
                style={{
                  padding: "10px 20px",
                  backgroundColor: "#ff0000", // Red background color (replace with your desired color)
                  color: "#ffffff", // White text color (replace with your desired color)
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                  marginTop: "10px", // Add some top margin for spacing
                }}
              >
                Close Video
              </button>
            </div>
          )}
        </div>

        <Container>
          <Popup
            trigger={
              <Img
                className="common-pointer h-10 ml-1 w-10"
                src={filteIcon}
                alt="minus"
                //   onClick={handleDecrement}
              />
            }
            modal
            nested
          >
            {(close) => filterModel(close)}
          </Popup>
        </Container>
        <CartSectionfooter className="bg-black-900 flex font-raleway gap-2 items-center justify-center md:px-5 px-[75px] py-[50px] w-full" />
      </div>
    </>
  );
};

export default HomepagePage;
