import axios from "axios";

const Api = axios.create({
  baseURL: "https://retail-service.kemiskejetkeun.com",
});

export default Api;
