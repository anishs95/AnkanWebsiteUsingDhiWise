import React, { useState, useEffect, useRef } from "react";
import loginImg from "assets/images/loginTheme.jpg";
import phoneImg from "assets/images/phone.png";
import otpimg from "assets/images/otpImage.png";
import OtpInput from "react-otp-input";

import {
  Button,
  CheckBox,
  Img,
  Input,
  SelectBox,
  Text,
} from "../../components";

import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import LocationService from "../../services/locationService";
import UserService from "../../services/userService";
import AuthenticateService from "../../services/authenticationService";
import { faPersonWalkingArrowRight } from "@fortawesome/free-solid-svg-icons";

const SigninDefaultPage = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [locationList, setLocationList] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState("");
  const [showOtpScreen, setShowOtpScreen] = useState(false);
  const [showLoginScreen, setShowLoginScreen] = useState(true);
  const [showSignUpScreen, setShowSignUpScreen] = useState(false);
  const [email, setEmail] = useState();
  const [fName, setFname] = useState();
  const [lName, setLname] = useState();
  const [otp, setOtp] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await LocationService.getAllLocations();
        console.log("Called GET ALL LOCATIONS " + response.data);
        console.log(JSON.stringify(response.data));
        const transformedData = response.data.map((location) => ({
          label: location.locationName,
          value: location.id,
        }));
        console.log(JSON.stringify(transformedData));
        setLocationList(transformedData);
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };

    fetchData();
  }, []);

  const handleGetOtpClick = async () => {
    console.log("GET OTP CALLED : " + selectedLocation.length);
    if (phoneNumber.length != 10) {
      toast.error("Enter a valid Phone Number", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      return false;
    }
    if (selectedLocation.length == 0) {
      toast.error("Please Select The Location!!!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      return false;
    }
    try {
      const response = await UserService.getOtp(phoneNumber);
      console.log("RESPONSE FROM GET OTP CALLED ");
      console.log(JSON.stringify(response.data));
      console.log("SELECTED LOCATION : " + selectedLocation);
      localStorage.setItem("ankanOtpResponse", JSON.stringify(response.data));
      localStorage.setItem("ankanSelectedLocationId", selectedLocation);
      setShowOtpScreen(true);
      setShowLoginScreen(false);
      setShowSignUpScreen(false);
    } catch (error) {
      console.error("Error fetching OTP data:", error);
    }
  };

  const handleRegisterClick = async () => {
    console.log("Register Button Clicked" + selectedLocation.length);
    if (phoneNumber.length != 10) {
      toast.error("Enter a valid Phone Number", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      return false;
    }
    if (selectedLocation.length == 0) {
      toast.error("Please Select The Location!!!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      return false;
    }

    if (!fName) {
      toast.error("Name is Mandatory", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      return false;
    }

    try {
      const response = await UserService.register({
        FirstName: fName,
        LastName: lName,
        Email: email,
        PhoneNumber: phoneNumber,
        City: selectedLocation,
        roles: ["TileContractor"],
      });
      console.log("RESPONSE FROM REGISTER CALLED ");
      console.log(JSON.stringify(response.data));
      localStorage.setItem("ankanOtpResponse", JSON.stringify(response.data));
      localStorage.setItem("ankanSelectedLocationId", selectedLocation);
      setShowOtpScreen(true);
      setShowLoginScreen(false);
      setShowSignUpScreen(false);
    } catch (error) {
      console.error("Error Registering data:", error);
      toast.error("Already Registered Or Something Went Wrong", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };

  const handleVerifyOtpClick = async () => {
    console.log("Verifying OTP  : " + otp);
    if (otp.length != 4) {
      toast.error("Invalid OTP", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      return false;
    }
    try {
      const getOtpObject = JSON.parse(localStorage.getItem("ankanOtpResponse"));
      getOtpObject.otp = otp;

      const response = await UserService.verifyOtp(getOtpObject);
      console.log("RESPONSE FROM VERIFY OTP CALLED ");
      console.log(JSON.stringify(response.data));
      localStorage.setItem(
        "ankanVerifyOtpResponse",
        JSON.stringify(response.data)
      );
      localStorage.setItem("userId", response.data.userId);

      try {
        const authResponse = await AuthenticateService.authenticate({
          activationId: response.data.activationId,
          activationSecret: response.data.activationSecret,
          id: response.data.userId,
          deviceCode: "MOB",
        });
        console.log("RESPONSE FROM AUTHENTICATION ");
        console.log(authResponse.data);
        localStorage.setItem(
          "ankanAuthenticationBearer",
          JSON.stringify(authResponse.data)
        );
        localStorage.setItem("ankanToken", authResponse.data.token);

        // Navigate to the Home Page
        window.history.back();
        // navigate("/", { replace: true });
      } catch (error) {
        console.log("FAILURE OCCUERED IN AUTH " + error);
        toast.error("Authentication Failed", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      }
      if (response.data.activationId == null) {
        toast.error("Invalid OTP", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      }
    } catch (error) {
      console.error("Error fetching OTP data:", error);
      toast.error("Invalid OTP", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };

  const handleSignUpClick = () => {
    setShowOtpScreen(false);
    setShowLoginScreen(false);
    setShowSignUpScreen(true);
  };

  const handleGetOtpBackButtonClick = () => {
    setShowOtpScreen(false);
    setShowLoginScreen(true);
    setShowSignUpScreen(false);
  };

  const handlePhoneNumberChange = (e) => {
    let inputValue = e.target.value;
    inputValue = inputValue.replace(/\D/g, "");
    inputValue = inputValue.slice(0, 10);
    setPhoneNumber(inputValue);
  };

  const handleOtpChange = (e) => {
    let inputValue = e.target.value;
    inputValue = inputValue.replace(/\D/g, "");
    inputValue = inputValue.slice(0, 4);
    setOtp(inputValue);
  };

  const handleLocationChange = (e) => {
    setSelectedLocation(e);
    localStorage.setItem("ankanSelectedLocationId", e);
  };

  return (
    <>
      <div className="bg-red-50 flex flex-col font-inter items-start justify-start mx-auto md:px-10 sm:px-5 px-[90px] py-[106px] w-auto sm:w-full md:w-full">
        <div className="flex md:flex-col flex-row gap-[59px] items-start justify-start max-w-[1260px] mx-auto w-full">
          <ToastContainer />
          <div className="flex flex-1 flex-col md:gap-10 gap-[20px] items-center justify-start w-full">
            <Text className="font-bold sm:text-2xl text-[28px] text-bluegray-900 text-center w-full">
              Welcome to Ankan
            </Text>
            <Text className="font-normal sm:text-[10px] md:text-[10px] text-[18px] text-bluegray-900 text-center w-full ">
              We provide good quality products and services within the
              construction industry.
            </Text>
            <Img
              className="h-[403px] w-full  md:hidden"
              src={loginImg}
              alt="workingtime"
            />
          </div>
          <div className="bg-white-A700 flex flex-1 flex-col items-start justify-start md:px-10 sm:px-5 px-[74px] py-[66px] rounded-[20px] shadow-bs w-full">
            <div className="flex flex-col gap-12 items-center justify-start w-full">
              {/* OTP */}
              {showOtpScreen && (
                <div className="flex flex-col md:gap-1 gap-[1px] items-start justify-start w-full">
                  <Img
                    className="h-6 w-6"
                    src="images/img_arrowleft.svg"
                    alt="arrowleft"
                    onClick={handleGetOtpBackButtonClick}
                  />
                  <div className="flex flex-col  gap-[30px] items-start justify-start w-full">
                    <div className="flex flex-col gap-12 items-center justify-start w-full">
                      <Img
                        className="h-[182px] w-[168px]"
                        src={otpimg}
                        alt="group"
                      />
                      <div className="flex flex-col gap-2 items-center justify-start w-full">
                        <Text className="font-bold text-2xl md:text-[22px] text-bluegray-800 text-center sm:text-xl w-full">
                          2-Step Vertification
                        </Text>
                        <Text className="leading-[22.00px] max-w-[452px] md:max-w-full text-bluegray-800 text-center text-sm">
                          We sent a vertìication code to your email. Enter the
                          code from the email in the field below
                        </Text>
                      </div>
                    </div>
                    <div className="flex flex-col gap-12 items-center justify-center w-full">
                      <Input
                        name="otp"
                        value={otp}
                        onInput={handleOtpChange}
                        className="p-0 placeholder:text-bluegray-400 sm:pr-5 text-base text-bluegray-400 text-left w-full text-center"
                        wrapClassName="bg-white-A700 border border-indigo-500 border-solid flex pl-5 pr-[35px] py-[17px] rounded "
                        type="tel"
                        style={{ width: "70px" }}
                      ></Input>

                      <Button
                        className="custom-otp-button"
                        onClick={handleVerifyOtpClick}
                      >
                        VERIFY OTP
                      </Button>
                      <Text className="font-medium text-center text-indigo-400 text-sm w-auto">
                        You haven’t received it? Resend a new code
                      </Text>
                    </div>
                  </div>
                </div>
              )}
              {/* LOGIN */}
              {showLoginScreen && (
                <div>
                  {" "}
                  <div className="flex flex-col gap-[49px] items-center justify-start w-full">
                    <Text className="font-bold text-2xl md:text-[22px] text-bluegray-800 text-center sm:text-xl w-full">
                      Login to Ankan
                    </Text>
                    <div className="flex flex-col gap-[49px] items-center justify-start w-full">
                      <div className="flex flex-col gap-4 items-start justify-start w-full">
                        <div className="flex flex-col gap-7 items-start justify-start w-full">
                          <div className="flex flex-col gap-2 items-start justify-start w-full">
                            <Text className="font-medium text-bluegray-800 text-sm w-full">
                              Phone Number
                            </Text>
                            <Input
                              name="email_One"
                              value={phoneNumber}
                              onInput={handlePhoneNumberChange}
                              className="p-0 placeholder:text-bluegray-400 sm:pr-5 text-base text-bluegray-400 text-left w-full"
                              wrapClassName="bg-white-A700 border border-indigo-50 border-solid flex pl-5 pr-[35px] py-[17px] rounded w-full"
                              type="tel"
                              prefix={
                                <Img
                                  className="mt-auto mb-px h-5 mr-4"
                                  src={phoneImg}
                                  alt="Phone"
                                />
                              }
                            ></Input>
                          </div>
                          <div className="flex flex-col gap-2 items-start justify-start w-full">
                            <Text className="font-medium text-bluegray-800 text-sm w-full">
                              Location
                            </Text>
                            <SelectBox
                              className="p-0 text-base text-bluegray-400 text-left w-full bg-white-A700 border border-indigo-50 border-solid pl-5 pr-[35px] py-[17px] rounded"
                              placeholderClassName="text-black-900"
                              onChange={(e) => handleLocationChange(e)}
                              indicator={
                                <Img
                                  className="h-5 w-5"
                                  src="images/img_arrowdown.svg"
                                  alt="arrow_down"
                                />
                              }
                              isMulti={false}
                              name="location"
                              options={locationList}
                              isSearchable={false}
                              placeholder="Select Nearest Location"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-12 items-center justify-start w-full mt-10 ">
                    <Button
                      className="custom-login-button"
                      onClick={handleGetOtpClick}
                    >
                      GET OTP
                    </Button>
                    <div className="flex flex-row gap-1 items-start justify-center w-full">
                      <Text className="font-medium text-bluegray-800 text-sm w-auto">
                        You don’t have an account yet?
                      </Text>
                      <Text
                        className="font-medium text-deep_purple-500 text-sm underline w-[51px]"
                        onClick={handleSignUpClick}
                      >
                        Sign Up
                      </Text>
                    </div>
                  </div>
                </div>
              )}
              {/* SIGNUP */}
              {showSignUpScreen && (
                <div>
                  <div className="flex flex-col gap-[49px] items-center justify-start w-full">
                    <Text className="font-bold text-2xl md:text-[22px] text-bluegray-800 text-center sm:text-xl w-full">
                      Sign Up to Ankan
                    </Text>
                    <div className="flex flex-col gap-[49px] items-center justify-start w-full">
                      <div className="flex flex-col gap-[49px] items-center justify-start w-full">
                        <div className="flex flex-col gap-4 items-start justify-start w-full">
                          <div className="flex flex-col  items-start justify-start w-full">
                            <Text className="font-medium text-bluegray-800 text-sm w-full">
                              First Name *
                            </Text>
                            <Input
                              name="fName"
                              value={fName}
                              onInput={(e) => setFname(e.target.value)}
                              className="p-0 placeholder:text-bluegray-400 sm:pr-5 text-base text-bluegray-400 text-left w-full"
                              wrapClassName="bg-white-A700 border border-indigo-50 border-solid flex pl-5 pr-[35px] py-[17px] rounded w-full"
                              type="text"
                            ></Input>
                          </div>
                          <div className="flex flex-col gap-2 items-start justify-start w-full">
                            <Text className="font-medium text-bluegray-800 text-sm w-full">
                              Last Name
                            </Text>
                            <Input
                              name="lname"
                              value={lName}
                              onInput={(e) => setLname(e.target.value)}
                              className="p-0 placeholder:text-bluegray-400 sm:pr-5 text-base text-bluegray-400 text-left w-full"
                              wrapClassName="bg-white-A700 border border-indigo-50 border-solid flex pl-5 pr-[35px] py-[17px] rounded w-full"
                              type="text"
                            ></Input>
                          </div>
                          <div className="flex flex-col gap-2 items-start justify-start w-full">
                            <Text className="font-medium text-bluegray-800 text-sm w-full">
                              Phone Number *
                            </Text>
                            <Input
                              name="phoneNumber"
                              value={phoneNumber}
                              onInput={handlePhoneNumberChange}
                              className="p-0 placeholder:text-bluegray-400 sm:pr-5 text-base text-bluegray-400 text-left w-full"
                              wrapClassName="bg-white-A700 border border-indigo-50 border-solid flex pl-5 pr-[35px] py-[17px] rounded w-full"
                              type="tel"
                            ></Input>
                          </div>
                          <div className="flex flex-col gap-2 items-start justify-start w-full">
                            <Text className="font-medium text-bluegray-800 text-sm w-full">
                              Email
                            </Text>
                            <Input
                              name="email"
                              value={email}
                              onInput={(e) => setEmail(e.target.value)}
                              className="p-0 placeholder:text-bluegray-400 sm:pr-5 text-base text-bluegray-400 text-left w-full"
                              wrapClassName="bg-white-A700 border border-indigo-50 border-solid flex pl-5 pr-[35px] py-[17px] rounded w-full"
                              type="email"
                            ></Input>
                          </div>
                          <div className="flex flex-col gap-2 items-start justify-start w-full">
                            <Text className="font-medium text-bluegray-800 text-sm w-full">
                              Location *
                            </Text>
                            <SelectBox
                              className="p-0 text-base text-bluegray-400 text-left w-full bg-white-A700 border border-indigo-50 border-solid pl-5 pr-[35px] py-[17px] rounded"
                              placeholderClassName="text-black-900"
                              indicator={
                                <Img
                                  className="h-5 w-5"
                                  src="images/img_arrowdown.svg"
                                  alt="arrow_down"
                                />
                              }
                              isMulti={false}
                              onChange={(e) => handleLocationChange(e)}
                              name="location"
                              options={locationList}
                              isSearchable={false}
                              placeholder="Select Nearest Location"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-12 items-center justify-start w-full mt-10 ">
                    <Button
                      className="custom-login-button"
                      onClick={handleRegisterClick}
                    >
                      GET OTP
                    </Button>
                    <div className="flex flex-row gap-1 items-start justify-center w-full">
                      <Text className="font-medium text-bluegray-800 text-sm w-auto">
                        Already have an Account?
                      </Text>
                      <Text
                        className="font-medium text-deep_purple-500 text-sm underline w-[51px]"
                        onClick={handleGetOtpBackButtonClick}
                      >
                        Sign In
                      </Text>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SigninDefaultPage;
