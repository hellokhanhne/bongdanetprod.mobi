const express = require("express");
const axiosInstance = require("../constants/axiosInstace");
const cheerio = require("cheerio");
const router = express.Router();
const queryString = require("querystring");

router.get("/", async (req, res) => {
  try {
    const query = req.query;

    const htmlRes = await axiosInstance.get(
      `/?${queryString.stringify(query)}`
    );
    const $ = cheerio.load(htmlRes.data);

    const content_center = $(".content-homenew-center");
    const ads_elements = content_center.find(".banner_ads-bdn");
    for (let ads of ads_elements) {
      $(ads).remove();
    }
    const noticeContent = content_center.find(".zone-notice.zone-notice-new");
    $(noticeContent).remove();
    res.render("home", {
      body: content_center.html(),
    });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
