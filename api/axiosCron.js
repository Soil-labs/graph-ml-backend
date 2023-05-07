import axios from "axios";
import dotenv from "dotenv";
dotenv.config();


const baseURL = process.env.NEXT_PUBLIC_GRAPHQL_URI_CRON;
// const baseURL = "https://soil-api-backend-kgfromaicron.up.railway.app/graphql"


console.log("baseURL = ", baseURL);
const apiClientCron = axios.create({
  baseURL,
  method: "POST",
});

apiClientCron.interceptors.request.use(function (config) {
  // const token = localStorage.getItem("token");

  // config.headers["Authorization"] = "Bearer " + token;
  config.headers["Access-Control-Allow-Origin"] = "*";

  return config;
}, null);

export default apiClientCron;
