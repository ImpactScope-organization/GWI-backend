const {
  sendReportToRegulator,
  getReportsSentToRegulators,
  getAllPendingReports,
  getDetailsOfSingleReport,
  changeStatusToReview,
  assignCase,
  closeCase,
  getAllUnderReviewReports,
  getAllReviewedReports,
  updateCase,
  modifyReportAgePriority,
  createReport,
  deleteReportCollection,
  getAllReportsSentToRegulators,
  disregardCase,
} = require("../controllers/reportController");
const { fileSave } = require("../middleware/report");

const router = require("express").Router();

router.post("/createReport", createReport);
router.post("/updateSendToRegulators", sendReportToRegulator);
router.put("/updateReportAgePriority", modifyReportAgePriority);
router.get("/getUpdateSendToRegulators", getReportsSentToRegulators);
router.get("/getPendingReports", getAllPendingReports);
router.get("/getSingleReportDetail/:id", getDetailsOfSingleReport);
router.get("/getAllUnderReviewReports", getAllUnderReviewReports);
router.get("/getAllReviewedReports", getAllReviewedReports);
router.get("/getAllReportsSentToRegulators", getAllReportsSentToRegulators);
router.put("/changeStatusToReview", changeStatusToReview);
router.put("/assignCase", assignCase);
router.put("/disregardCase", disregardCase);
router.put("/closeCase", closeCase);
router.put("/updateCase", updateCase);
router.delete("/deleteReports", deleteReportCollection);

module.exports = router;
