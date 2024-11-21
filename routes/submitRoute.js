const express = require("express");
const router = express.Router();

const { addSubmited, getSubmited, getOnesubmited } = require("../controllers/submitController");


router.post("/addSubmit", addSubmited);
router.get("/getSubmit", getSubmited);
router.get("/alluser/:userId", getOnesubmited);


module.exports = router;
