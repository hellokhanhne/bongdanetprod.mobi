const axios = require("axios");

const axiosInstance = axios.default.create({
  baseURL: "https://bongdanet.mobi",
});

module.exports = axiosInstance;
