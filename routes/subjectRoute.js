const express = require("express");
const router = express.Router();

const { addSubjectController, getSubjectController, deleteSubjectController } = require("../controllers/subjectController");


router.post("/addSubject", addSubjectController);
 router.get("/getSubject", getSubjectController);
 router.delete("/deleteSubject/:id", deleteSubjectController);


module.exports = router;
