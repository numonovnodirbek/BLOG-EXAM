import axios from "axios";
import { ENDPOINT, TOKEN } from "../constants";

import Cookies from "js-cookie";

const request = axios.create({
  baseURL: ENDPOINT,
  timeout: 10000,
  headers: {
    Authorization: `Bearer ${Cookies.get(TOKEN)}`,
  },
});

export default request;
