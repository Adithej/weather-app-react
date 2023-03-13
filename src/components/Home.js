import React, { useState } from "react";
import Result from "./Result";
import { apiFetchLoation } from "../api";
// import axios
import axios from "axios";
import { IoMdSearch } from "react-icons/io";

// api key
const APIkey = "bcf2048bc3be154bded8f277f580ba2e";
const { REACT_APIkey } = process.env;
console.log("env", process.env.REACT_APP_API_KEY);
function Home() {
  const [data, setData] = useState(null);
  const [location, setLocation] = useState("");
  const [inputValue, setInputValue] = useState("");
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

  const fetchLocation = async (position) => {
    if (loading) return;
    setLoading(true);
    console.log(location);
    let payload = {};
    if (position) {
      const { latitude, longitude } = position.coords;
      payload.lat = latitude;
      payload.lon = longitude;
    } else {
      payload.q = location;
    }
    // const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${APIkey}`;

    try {
      const response = await apiFetchLoation(payload);

      setData(response.data);
      setTab("result");
      setLoading(false);
    } catch (e) {
      setLoading(false);
      setErrorMsg("error fetching data");
    }
  };

  async function fetchCurrent(position) {
    const { latitude, longitude } = position.coords;
    // let api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${APIkey}`;
  }
  function getCurrentLocation(e) {
    e.preventDefault();
    if (loading) return;
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(fetchLocation);
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
      {tab === "result" && <Result info={data} goBack={() => setTab("Home")} />}
    </div>
  );
}

export default Home;
