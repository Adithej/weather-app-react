import React from "react";
// import icons
import {
  IoMdSunny,
  IoMdRainy,
  IoMdCloudy,
  IoMdSnow,
  IoMdThunderstorm,
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

function Result({ info, goBack }) {
  //   const info = props.info;

  // set the icon according to the weather
  function getIcon() {
    let icon;

    switch (info.weather[0].main) {
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

  return (
    <div className="w-full max-w-[450px] bg-gray-700 min-h-[584px] text-white backdrop-blur-[32px] rounded-[32px]">
      <div>
        <h3 className="justify-center not-italic mt-10 text-2xl  flex items-center text-center">
          Weather App
        </h3>
        {/* card top */}
        <div className="flex items-center gap-x-5">
          <button onClick={() => goBack()}>
            {" "}
            <IoMdArrowBack className="ml-4" />
          </button>
          {/* icon */}
          <div>
            {/* country name */}
            <div className="text-2xl font-semibold justify-center not-italic  flex items-center text-center pt-10 mx-10">
              <GrLocation />
              {info.name}, {info.sys.country}
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
            {info.weather[0].description}
          </div>
        </div>
        <div className="text-center text-5xl mb-16">
          {parseInt(info.main.temp)} C
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
                Humidity <span className="ml-2">{info.main.humidity} %</span>
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
                  {parseInt(info.main.feels_like)}
                  <TbTemperatureCelsius />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Result;
