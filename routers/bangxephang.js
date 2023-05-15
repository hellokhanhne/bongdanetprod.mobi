const express = require("express");
const axiosInstance = require("../constants/axiosInstace");
const router = express.Router();
const cheerio = require("cheerio");

router.get("/", async function (req, res) {
  try {
    const htmlRes = await axiosInstance.get("/bang-xep-hang-bong-da");
    const $ = cheerio.load(htmlRes.data);
    const content_center = $(".content-home-left");
    const noticeContent = content_center.find(".zone-notice");
    const bxpvnsEls = $(".content-home-right").find(".block-standing-right");
    const bxhvn = bxpvnsEls.map((i, el) => $(el).html());
    if (noticeContent) {
      $(noticeContent).remove();
    }
    res.render("ketqua", {
      body: content_center.html(),
      layout: "left",
      bxhvn1: bxhvn[0],
      bxhvn2: bxhvn[1],
    });
  } catch (error) {
    console.error(error);
    res.redirect("/");
  }
});

router.get("/:path", async (req, res) => {
  try {
    const htmlRes = await axiosInstance.get(
      `/bang-xep-hang-bong-da/${req.params.path}`
    );
    const $ = cheerio.load(htmlRes.data);
    const content_center = $(".content-home-left");

    const bxpvnsEls = $(".content-home-right").find(".block-standing-right");
    const bxhvn = bxpvnsEls.map((i, el) => $(el).html());

    const noticeContent = content_center.find(".zone-notice");
    if (noticeContent) {
      $(noticeContent).remove();
    }
    res.render("ketqua", {
      body: content_center.html(),
      layout: "left",
      bxhvn1: bxhvn[0],
      bxhvn2: bxhvn[1],
    });
  } catch (error) {
    console.error(error);
    res.redirect("/");
  }
});

module.exports = router;
