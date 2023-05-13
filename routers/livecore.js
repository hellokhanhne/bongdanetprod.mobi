const express = require("express");
const axiosInstance = require("../constants/axiosInstace");
const queryString = require("querystring");
const router = express.Router();

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
