import axios from "axios";
const baseURL = process.env.REACT_APP_BACKEDN_URL;
// const baseURL = `http://localhost:5000/`;
const axiosInstance = axios.create({
  baseURL: baseURL
});

export default axiosInstance;
