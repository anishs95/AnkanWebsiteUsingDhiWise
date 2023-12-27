import React, { useEffect, useState, useRef } from "react";

import { Text } from "components";

import CartNavbar from "components/CartNavbar";
import CartSectionfooter from "components/CartSectionfooter";
import ProductCard from "components/ProductCard";
import YouTube from "react-youtube";
import { useParams } from 'react-router-dom';

import ProductService from "../../services/productService";

const HomepagePage = () => {
  const { categoryId } = useParams();
  const [products, setProducts] = useState([]);
  const [playingVideoId, setPlayingVideoId] = useState(null);
  const youtubePlayerRef = useRef(null); // Add useRef

  const opts = {
    height: "390",
    width: "640",
    playerVars: {
      autoplay: 1,
    },
  };

  const _onReady = (event) => {
    //event.target.pauseVideo();
  };

  useEffect(() => {
    console.log("Category Id Called is : "+ categoryId);
    const fetchData = async () => {
      try {
        const response = await ProductService.getAllProductsByCategory(categoryId);
        setProducts(response.data); // Assuming the response data is an array of products
        console.log("Called GET ALL PRODUCTS List");
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching product List Data :", error);
      }
    };

    fetchData();
  }, []);

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

  return (
    <>
      <div className="bg-gray-50 flex flex-col font-rubik sm:gap-10 md:gap-10 gap-[100px] items-center justify-start mx-auto w-auto sm:w-full md:w-full">
        <div className="flex flex-col items-start justify-start w-full">
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

        <CartSectionfooter className="bg-black-900 flex font-raleway gap-2 items-center justify-center md:px-5 px-[75px] py-[50px] w-full" />
      </div>
    </>
  );
};

export default HomepagePage;
