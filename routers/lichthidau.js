const express = require("express");
const axiosInstance = require("../constants/axiosInstace");
const cheerio = require("cheerio");
const router = express.Router();

router.get("/", async (req, res) => {
  const htmlRes = await axiosInstance.get("/lich-thi-dau-bong-da");
  const $ = cheerio.load(htmlRes.data);
  const content_center = $(".content-home-left");
  const ads_elements = content_center.find(".banner_ads-bdn");
  for (let ads of ads_elements) {
    $(ads).remove();
  }
  const noticeContent = content_center.find(".zone-notice");
  if (noticeContent) {
    $(noticeContent).remove();
  }
  res.render("lichdidau", {
    body: content_center.html(),
    layout: "left",
  });
});

router.get("/:path", async (req, res) => {
  const htmlRes = await axiosInstance.get(
    `/lich-thi-dau-bong-da/${req.params.path}`
  );
  const $ = cheerio.load(htmlRes.data);
  const content_center = $(".content-home-left");
  // const ads_elements = content_center.find(".banner_ads-bdn");
  // for (let ads of ads_elements) {
  //   $(ads).remove();
  // }
  const noticeContent = content_center.find(".zone-notice");
  if (noticeContent) {
    $(noticeContent).remove();
  }
  res.render("lichdidau", {
    body: content_center.html(),
    layout: "left",
  });
});

module.exports = router;
