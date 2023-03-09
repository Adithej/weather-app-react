import React, { useState } from "react";

// import axios
import axios from "axios";

// import icons
import {
  IoMdSunny,
  IoMdRainy,
  IoMdCloudy,
  IoMdSnow,
  IoMdThunderstorm,
  IoMdSearch,
  IoIosWater,
  IoMdArrowBack,
} from "react-icons/io";

import {
  BsCloudHaze2Fill,
  BsCloudDrizzleFill,
  BsThermometer,
  // BsWind,
} from "react-icons/bs";

import { TbTemperatureCelsius } from "react-icons/tb";
import { GrLocation } from "react-icons/gr";

// api key
const APIkey = "bcf2048bc3be154bded8f277f580ba2e";

const App = () => {
  const [data, setData] = useState(null);
  const [location, setLocation] = useState("");
  const [inputValue, setInputValue] = useState("");
  // const [animate, setAnimate] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [tab, setTab] = useState("Home");

  const handleInput = (e) => {
    setInputValue(e.target.value);
    console.log("E Target value : ", e.target.value);
    setLocation(e.target.value);
    setErrorMsg("");
  };

  const handleSubmit = (e) => {
    // if input value is not empty
    e.preventDefault();
    if (inputValue !== "") {
      // set location
      setLocation(inputValue);
      fetchLocation();
    }
  };

  const fetchLocation = async () => {
    if (loading) return;
    setLoading(true);
    console.log(location);
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${APIkey}`;

    try {
      const response = await axios.get(url);
      setData(response.data);
      setTab("result");
      setLoading(false);
    } catch (e) {
      setLoading(false);
      setErrorMsg("error fetching data");
    }
  };

  // set the icon according to the weather
  function getIcon() {
    let icon;

    switch (data.weather[0].main) {
      case "Clouds":
        icon = <IoMdCloudy />;
        break;
      case "Haze":
        icon = <BsCloudHaze2Fill />;
        break;
      case "Rain":
        icon = <IoMdRainy className="text-[#31cafb]" />;
        break;
      case "Clear":
        icon = <IoMdSunny className="text-[#ffde33]" />;
        break;
      case "Drizzle":
        icon = <BsCloudDrizzleFill className="text-[#31cafb]" />;
        break;
      case "Snow":
        icon = <IoMdSnow className="text-[#31cafb]" />;
        break;
      case "Thunderstorm":
        icon = <IoMdThunderstorm />;
        break;
    }
    return icon;
  }
  async function fetchCurrent(position) {
    setLoading(true);
    const { latitude, longitude } = position.coords;
    let api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${APIkey}`;
    try {
      const response = await axios.get(api);
      setData(response.data);
      setLoading(false);
      setTab("result");
      console.log(response);
    } catch (e) {
      setLoading(false);
      setErrorMsg(e);
    }
  }
  function getCurrentLocation(e) {
    e.preventDefault();
    if (loading) return;
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(fetchCurrent);
    } else {
      setErrorMsg("user denied geolocation");
    }
  }

  return (
    <div className="w-full h-screen  bg-no-repeat bg-cover bg-center flex flex-col items-center justify-center px-4 lg:px-0 bg-[url('./assets/img/bgupdated.png')]">
      {tab === "Home" && (
        <div className="p-20 md:w-1/2 rounded overflow-hidden shadow-lg">
          <h3 className="mb-16 justify-center not-italic font-semibold text-2xl leading-7 flex items-center text-center text-teal-900">
            Weather App
          </h3>
          <form>
            <div className="flex items-center justify-center flex-col">
              {loading && (
                <div className="w-3/4 flex items-center justify-center mb-4">
                  <input
                    placeholder="loading..."
                    className="h-10 w-3/4 px-6 bg-gray-300"
                  />
                </div>
              )}
              {errorMsg && (
                <div className="w-3/4 flex items-center justify-center mb-4">
                  <input
                    placeholder={errorMsg}
                    className="h-10 w-3/4 px-6 bg-pink-200"
                  />
                </div>
              )}
              <div className="w-3/4 flex items-center justify-center">
                <input
                  onChange={(e) => handleInput(e)}
                  className="h-10 w-96 px-6 bg-gray-300 outline-none"
                  type="text"
                  placeholder="Enter city name"
                  disabled={loading}
                />
                <button
                  onClick={(e) => handleSubmit(e)}
                  disabled={loading}
                  className="bg-teal-900  p-2"
                >
                  <IoMdSearch className="text-2xl text-white" />
                </button>
              </div>
            </div>
            <div class="inline-flex items-center justify-center w-full">
              <hr class="w-64 h-px my-8 bg-gray-200 border-0 dark:bg-gray-700" />
              <span class="absolute px-3 font-medium text-gray-900 -translate-x-1/2 bg-white left-1/2 dark:text-black">
                or
              </span>
            </div>
            <div className="flex flex-row justify-center items-center">
              <button
                onClick={(e) => getCurrentLocation(e)}
                disabled={loading}
                className="h-10 w-96 px-6 text-indigo-100 transition-colors duration-150  focus:shadow-outline  bg-teal-600"
              >
                Use Device Location
              </button>
            </div>
          </form>
        </div>
      )}
      {tab === "result" && (
        <div className="w-full max-w-[450px] bg-gray-700 min-h-[584px] text-white backdrop-blur-[32px] rounded-[32px]">
          <div>
            <h3 className="justify-center not-italic mt-10 text-2xl  flex items-center text-center">
              Weather App
            </h3>
            {/* card top */}
            <div className="flex items-center gap-x-5">
              <button onClick={() => setTab("Home")}>
                {" "}
                <IoMdArrowBack className="ml-4" />
              </button>
              {/* icon */}
              <div>
                {/* country name */}
                <div className="text-2xl font-semibold justify-center not-italic  flex items-center text-center pt-10 mx-10">
                  <GrLocation />
                  {data.name}, {data.sys.country}
                </div>
              </div>
            </div>
            {/* card body */}
            <div className="my-20">
              <div className="flex justify-center items-center">
                {/* temp */}
                <div className="text-[144px] leading-none font-light">
                  <div className="text-[87px]">{getIcon()}</div>
                </div>
              </div>
              {/* weather description */}
              <div className="text-center text-xl mt-6">
                {data.weather[0].description}
              </div>
            </div>
            <div className="text-center text-5xl mb-16">
              {parseInt(data.main.temp)} C
            </div>
            {/* card bottom */}
            <div className="mx-auto flex flex-col gap-y-4 bg-teal-600 h-[5rem] rounded-b-lg divide-x divide-blue-200">
              <div className="flex justify-between">
                <div className="flex items-center gap-x-2 mt-6">
                  {/* icon */}
                  <div className="text-[20px]">
                    <IoIosWater />
                  </div>
                  <div>
                    Humidity{" "}
                    <span className="ml-2">{data.main.humidity} %</span>
                  </div>
                </div>
                <div className="flex items-center gap-x-2 mt-6">
                  {/* icon */}
                  <div className="text-[20px]">
                    <BsThermometer />
                  </div>
                  <div className="flex">
                    Feels like
                    <div className="flex ml-2">
                      {parseInt(data.main.feels_like)}
                      <TbTemperatureCelsius />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
