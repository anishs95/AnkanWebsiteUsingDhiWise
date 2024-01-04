import React, { useEffect, useState } from "react";

import { Button, Img, List, Line, Text } from "components";
import CartColumnframe48095972 from "components/CartColumnframe48095972";
import CartNavbar from "components/CartNavbar";
import CartSectionfooter from "components/CartSectionfooter";
import TeamCardteam from "components/TeamCardteam";

import RewardService from "../../services/rewardService";

const RewardPage = () => {
  const [userRewards , setUserRewards] = useState([]);
  const [totalEarnedReward, setTotalEarnedReward] = useState("₹ 0/-");
  useEffect(() => {
    console.log("REWARD PAGE");
    const fetchData = async () => {
      try {
        const getRewardsByUserResposne = await RewardService.getRewardsByUser();
        const getUserRewardResposne = await RewardService.GetUserReward();
        setUserRewards(getRewardsByUserResposne.data);
        if(getUserRewardResposne.data){
          setTotalEarnedReward("₹ "+getUserRewardResposne.data.totalEarnedReward+"/-");
        }
      
        console.log("RESPONSE FROM REWARDS ");
        console.log(getRewardsByUserResposne.data);
        console.log(getUserRewardResposne.data);
      } catch (error) {
        console.error("Error fetching REWARDS List Data :", error);
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
            <div className="flex flex-col gap-[13px] items-center justify-start w-full">
              <Text
                className="sm:text-4xl md:text-[38px] text-[40px] text-black-900 text-center tracking-[-0.50px] w-full"
                size="txtRalewayBold40"
              >
                My Rewards
              </Text>
            </div>

            <div className="flex flex-col items-start justify-center md:px-10 sm:px-5 px-[75px] w-full">
              <div className="flex flex-col gap-[50px] items-center justify-start max-w-[1290px] mx-auto w-full">
          
               

                <div className="flex md:flex-col flex-row font-rubik md:gap-10 gap-[61px] items-start justify-start w-full">
                  <List
                    className="flex flex-1 flex-col gap-[30px] items-start w-full mt-8"
                    orientation="vertical"
                  >
                    {userRewards &&
                      userRewards.map((item, index) => (
                        <div
                          key={index}
                          className="flex flex-1 md:flex-col flex-row gap-5 items-center justify-start w-full border border-gray-300 p-3 shadow-md"
                        >
                          <div className="flex flex-1 sm:flex-col flex-row gap-5 items-center justify-start w-full">
                          <Text
                                className="leading-[35.00px] max-w-[294px] md:max-w-full text-black-900 text-xl tracking-[-0.50px]"
                                size="txtRalewayRomanBold20"
                              >
                                  {`${new Date(item.createdDate).toDateString()} `}
                                {/* replace with the actual property from your API response */}
                              </Text>
                            <div className="flex flex-col gap-1 items-start justify-start w-auto">
                            
                              <Text
                                className="text-bluegray-800 text-base tracking-[-0.50px] w-auto"
                                size="txtPoppinsBold10"
                              >
                                {`Purchase Amount :-  ₹ ${item.purchaseAmount}`}{" "}
                                {/* replace with the actual property from your API response */}
                              </Text>
                              <Text
                                className="text-bluegray-800 text-base tracking-[-0.50px] w-auto"
                                size="txtPoppinsBold10"
                              >
                                {`Points :- ₹ ${item.points}`}{" "}
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
                       Total Rewards Scored
                      </Text>
                      <Line className="bg-black-900 h-px w-full" />
                      <div className="flex flex-row items-center justify-between w-full">
                        <Text
                          className="text-black-900 text-lg tracking-[-0.50px] w-auto mr-4"
                          size="txtPoppinsSemiBold20"
                        >
                          {`Total Rewards `}
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
                         {totalEarnedReward}
                        </Text>
                      </div>
                    </div>
               
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <CartSectionfooter className="bg-black-900 flex font-raleway gap-2 items-center justify-center md:px-5 px-[75px] py-[50px] w-full" />
      </div>
    </>
  );
};

export default RewardPage;
