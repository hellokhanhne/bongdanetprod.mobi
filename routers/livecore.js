const express = require("express");
const axiosInstance = require("../constants/axiosInstace");
const queryString = require("querystring");
const { default: axios } = require("axios");
const router = express.Router();
const cheerio = require("cheerio");

router.get("/", async function (req, res) {
  try {
    const htmlRes = await axiosInstance.get(`/livescore`);
    const $ = cheerio.load(htmlRes.data);
    const content_center = $(".content_box_home");
    res.status(200).json($(content_center[1]).html());
  } catch (error) {
    console.error(error);
    res.status(200).json(`<div></div>`);
  }
});

router.get("/ajax-detail", async (req, res) => {
  try {
    const query = req.query;
    const resP = await axiosInstance.get(
      `/livescore/ajax-detail?${queryString.stringify(query)}`
    );
    res.status(200).json(resP.data);
  } catch (error) {
    console.error(error);
    res.status(200).json(`<div></div>`);
  }
});

module.exports = router;
