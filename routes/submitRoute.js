const express = require("express");
const router = express.Router();

const { addSubmited, getSubmited } = require("../controllers/submitController");


router.post("/addSubmit", addSubmited);
router.get("/getSubmit", getSubmited);


module.exports = router;
