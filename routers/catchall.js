const express = require("express");
const axiosInstance = require("../constants/axiosInstace");
const router = express.Router();
const cheerio = require("cheerio");

const non_redirects = [
  "/top-ghi-ban",
  "/bang-xep-hang-fifa",
  "/bang-xep-hang-fifa-nu",
];

router.get("/bang-xep-hang-fifa-nu/:path", async (req, res) => {
  try {
    const htmlRes = await axiosInstance.get(
      `/bang-xep-hang-fifa-nu/${req.params.path}`
    );
    const $ = cheerio.load(htmlRes.data);
    const content_center = $(".content-home-left");

    const bxpvnsEls = $(".content-home-right").find(".block-standing-right");
    const bxhvn = bxpvnsEls.map((i, el) => $(el).html());

    const noticeContent = content_center.find(".zone-notice");
    if (noticeContent) {
      $(noticeContent).remove();
    }
    res.render("bangxephang", {
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

router.get("/bang-xep-hang-fifa/:path", async (req, res) => {
  try {
    const htmlRes = await axiosInstance.get(
      `/bang-xep-hang-fifa/${req.params.path}`
    );
    const $ = cheerio.load(htmlRes.data);
    const content_center = $(".content-home-left");

    const bxpvnsEls = $(".content-home-right").find(".block-standing-right");
    const bxhvn = bxpvnsEls.map((i, el) => $(el).html());

    const noticeContent = content_center.find(".zone-notice");
    if (noticeContent) {
      $(noticeContent).remove();
    }
    res.render("bangxephang", {
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

router.get("*", async (req, res) => {
  try {
    const htmlRes = await axiosInstance.get(req.path);
    const $ = cheerio.load(htmlRes.data);
    const content_center = $(".content-home-left");
    const noticeContent = content_center.find(".zone-notice");
    const bxpvnsEls = $(".content-home-right").find(".block-standing-right");
    const bxhvn = bxpvnsEls.map((i, el) => $(el).html());
    if (noticeContent) {
      $(noticeContent).remove();
    }
    return res.render("home", {
      body: content_center.html(),
      layout: "left",
      bxhvn1: bxhvn[0],
      bxhvn2: bxhvn[1],
    });
  } catch (error) {
    // console.error(error);
    return res.redirect("/");
  }
});

module.exports = router;
