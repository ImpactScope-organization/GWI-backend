const {
  getCompany,
  deleteCompany,
  createCompany,
  getAllCompanies,
  updateCompany,
  getAllDemoCompanies,
} = require("../controllers/companyController");

const router = require("express").Router();

router.get("/all", getAllCompanies);
router.get("/all-demo", getAllDemoCompanies);
router.post("/create", createCompany);
router.delete("/delete/:id", deleteCompany);
router.put("/update/:id", updateCompany);
router.get("/:id", getCompany);

module.exports = router;
