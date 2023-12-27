import React from "react";

import { Button, Img, Text } from "components";
import { useNavigate } from "react-router-dom";

const ProductCard = (props) => {
  const navigate = useNavigate();
  const handleVideoClick = () => {
    // Invoke the callback with the product id
    console.log("button pressed inside child");
    if (props.onVideoClick) {
      returnYoutubeLinkForCategoryId(props.id);
     
    }
  };

  const  returnYoutubeLinkForCategoryId = (idvalue) => {
    console.log("inside indise1");
    if (idvalue === "631595395b0d266deea9c073") {
      props.onVideoClick("Bs-LPRcbkAM");
      return true;
    }  else if (idvalue === "6315955c5b0d266deea9c074") {
      props.onVideoClick("tswArIZpibI");
      return true;
    }  else {
      return false;
    }
  };

  const  returnYoutubeLinkForCategoryIdDisplay = (idvalue) => {
    console.log("inside indise1");
    if (idvalue === "631595395b0d266deea9c073") {
      return true;
    }  else if (idvalue === "6315955c5b0d266deea9c074") {
      return true;
    }  else {
      return false;
    }
  };

  const handleCardClick = () => {
    // Navigate to another page with the category id
    navigate(`/product-detail/${props.id}`);
 
  };


  return (
    <>
     <div className={`${props.className} product-card`} onClick={handleCardClick} >
        <div className="h-[300px] relative w-full">
          <Img
            className="absolute h-[300px] inset-[0] justify-center m-auto object-cover w-full"
            alt="image"
            src={props?.imageUris[0]}
          />
          {/* <Button className="absolute bg-bluegray-900 bottom-[4%] cursor-pointer font-rubik leading-[normal] left-[5%] py-[9px] text-center text-sm text-white-A700 tracking-[-0.50px] w-[106px]">
            {props?.category}
          </Button> */}
          <div className="absolute flex flex-col md:gap-10 gap-[106px] items-center justify-start right-[5%] top-[4%] w-auto">
            {returnYoutubeLinkForCategoryIdDisplay(props.id) ? (
              <Text
                className="bg-red-A200 justify-center px-[7px] text-sm text-white-A700 tracking-[-0.50px] w-auto"
                size="txtRubikRegular14WhiteA700"
                onClick={handleVideoClick}
              >
                Youtube Video
              </Text>
            ) : null}
            {!!props?.save ? (
              <Img className="h-[100px] w-10" alt="save" src={props?.save} />
            ) : null}
          </div>
        </div>
        <Text
              lassName="leading-[15.00px] max-w-[593px] md:max-w-full text-md text-red tracking-[-0.10px]"
            size="txtRalewaySemiBold20"
            style={{ paddingLeft: '10px',  }}
          >
           ₹ {props?.price}
          </Text>
        <div className="flex flex-row items-center justify-between w-full">
       
          <Text
            className="text-black-900 text-xl tracking-[-0.50px] w-auto"
            size="txtRalewaySemiBold20"
            style={{ paddingLeft: '10px', paddingBottom: '10px', paddingRight: '10px' }}
          >
            {props?.name}
          </Text>
         
        </div>
      </div>
    </>
  );
};

ProductCard.defaultProps = {
  image: "images/img_image.png",
  category: "Living Room",
  teakwoodchair: "Teak wood chair",
  twentyfour: "$24",
};

export default ProductCard;
