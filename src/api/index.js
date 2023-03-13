// import axios
import axios from "axios";

const { REACT_APP_API_KEY } = process.env;
console.log("env", process.env.REACT_APP_API_KEY);

export async function apiFetchLoation(payload) {
  //   const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${REACT_APP_API_KEY}`;
  //   const response = await axios.get(url);
  const response = await axios({
    method: "get",
    url: "https://api.openweathermap.org/data/2.5/weather",
    params: {
      ...payload,
      appid: REACT_APP_API_KEY,
    },
  });

  return response;
}
