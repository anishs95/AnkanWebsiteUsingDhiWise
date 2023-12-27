import React from "react";

import { Button, Img, Text } from "components";

const CartSectionfooter = (props) => {

  const openFacebookUrl = () => {
    const facebookUrl = 'https://www.facebook.com/people/Ankan/100083031557940/'; // Replace with your actual Facebook URL
    window.open(facebookUrl, '_blank');
  };

  const openInsagramUrl = () => {
    const facebookUrl = 'https://www.instagram.com/ankan_chem/'; // Replace with your actual Facebook URL
    window.open(facebookUrl, '_blank');
  };

  return (
    <>
      <footer className={props.className}>
        <div className="flex flex-col md:gap-10 gap-[149px] items-center justify-center w-full">
          <div className="flex md:flex-col flex-row md:gap-10 items-start justify-between w-full">
            <div className="flex flex-col gap-4 items-start justify-start w-auto">
              <Text
                className="md:text-3xl sm:text-[28px] text-[32px] text-gray-53 tracking-[-0.50px] w-auto"
                size="txtRalewayRomanBold32Gray53"
              >
                Ankan.
              </Text>
              <Text
                className="leading-[35.00px] max-w-[760px] md:max-w-full text-base text-gray-50_a3 tracking-[-0.50px]"
                size="txtRubikRegular16Gray50a3"
              >
               At Ankan, we strive to provide good quality products and services within the construction industry in partnership with globally renowned brands like Saint-Gobain, Tremco, Stanley, etc. Our team, led by Anand Subramanian and Vijay Karol, has extensive experience in the construction industry. The products and services we offer make construction projects viable, efficient, and sustainable. We provide technical advice to assist clients, consultants, architects, and contractors from specification support at the design phase, right through to on-site support during execution of the project. Our product range includes concrete admixtures, fibers, bonding agents, seamless industrial and commercial resin flooring solutions, tile adhesives, epoxy grouts, waterproofing systems, systems for joints & durable sealants, repair materials, as well as other specialist construction materials, tools and fittings.
              </Text>
            </div>
        
            <div className="flex flex-col gap-5 items-start justify-start w-[220px]">
              <Text
                className="text-gray-53 text-xl tracking-[-0.50px] w-auto"
                size="txtRalewayRomanSemiBold20Gray53"
              >
                Follow Us
              </Text>
              <div className="flex flex-row gap-5 items-start justify-start w-auto">
                <Button 
                 className="bg-yellow-100 flex h-10 items-center justify-center p-2 rounded-[50%] w-10" 
                 onClick={openInsagramUrl}>
                  <Img
                    className="h-6"
                    src="images/img_camera.svg"
                    alt="camera"
                  />
                </Button>
                <Button 
                 className="bg-yellow-100 flex h-10 items-center justify-center p-2 rounded-[50%] w-10" 
                 onClick={openFacebookUrl}>
                  
                  <Img
                    className="h-6"
                    src="images/img_facebook.svg"
                    alt="facebook"
                  />
                </Button>
              
              </div>
            </div>
          </div>
          <div className="flex sm:flex-col flex-row md:gap-10 items-start justify-between w-full">
            <Text
              className="text-base text-gray-50_a3 tracking-[-0.50px] w-auto"
              size="txtRubikRomanRegular16"
            >
              © Copyright 2024. All Rights Reserved By Ankan.
            </Text>
            <div className="flex flex-row gap-[41px] items-start justify-start w-[272px]">
              <Text
                className="flex-1 text-base text-gray-50_a3 tracking-[-0.50px] w-auto"
                size="txtRubikRomanRegular16"
              >
                Terms of condition
              </Text>
              <Text
                className="text-base text-gray-50_a3 tracking-[-0.50px] w-auto"
                size="txtRubikRomanRegular16"
              >
                Privacy Policy
              </Text>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

CartSectionfooter.defaultProps = {};

export default CartSectionfooter;
