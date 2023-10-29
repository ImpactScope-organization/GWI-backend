const mongoose = require('mongoose');
const ReportModel = require("../model/reportModel");

const createReport = async (req, res) => {
  try {
    const newReport = await ReportModel.create(req.body);

    res.status(200).json({ result: newReport });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

const sendReportToRegulator = async (req, res) => {
  const { companyName } = req.body;

  // console.log("hello: ", req.body);

  try {
    const report = await ReportModel.findOne({ companyName });

    if (report) {
      return res.json({ success: false, message: "Report already exist" });
    } else {
      const newReport = await ReportModel.create(req.body);

      return res.status(200).json({ success: true, result: newReport });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
};

const getReportsSentToRegulators = async (req, res) => {
  try {
    const reports = await ReportModel.find({ sentToRegulators: "true" });
    // console.log(reports);
    res.status(200).json({ results: reports });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

const modifyReportAgePriority = async (req, res) => {
  try {
    const { companyName, age, priority } = req.body;
    const report = await ReportModel.findOne({ companyName });
    if (!report) {
      return res.json({ message: "No reports found" });
    }

    report.age = age;
    report.priority = priority;
    report.sentToRegulators = false;

    await report.save();

    return res.json({ results: report });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

// Third part api's
const getAllPendingReports = async (req, res) => {
  try {
    const reports = await ReportModel.find({ pending: "true" });
    if (reports.length === 0) {
      res.json({ message: "No pending reports found" });
    } else {
      res.status(200).json({ results: reports });
    }
  } catch (error) {
    // console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

const getAllUnderReviewReports = async (req, res) => {
  try {
    const reports = await ReportModel.find({ reviewing: "true" });
    if (reports.length === 0) {
      res.json({ message: "No under review reports found" });
    } else {
      res.status(200).json({ results: reports });
    }
  } catch (error) {
    // console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

const getAllReviewedReports = async (req, res) => {
  try {
    const reports = await ReportModel.find({ reviewed: "true" });
    if (reports.length === 0) {
      res.json({ message: "No reviewed reports found" });
    } else {
      res.status(200).json({ results: reports });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

const getDetailsOfSingleReport = async (req, res) => {
  try {
    const  id  = req.params.id; 
    if (!id) {
      res.json({ message: "Company name is required to get details" });
    }
    const reports = await ReportModel.findOne({ _id: id });
    if (!reports) {
      res.json({ message: "No report found" });
    } else {
      // console.log("hello");
      res.status(200).json({ results: reports });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

const changeStatusToReview = async (req, res) => {
  try {
    const { company } = req.body;

    if (!company) {
      return res.json({ message: "Company name is required to get details" });
    }

    const reports = await ReportModel.find({ companyName: company });

    if (reports.length === 0) {
      return res.json({ message: "No report found" });
    }

    // Assuming req.body contains the updated data
    const updatedReport = await ReportModel.findOneAndUpdate(
      { companyName: company },
      req.body,
      { new: true } // To return the updated document
    );

    res.status(200).json({ results: updatedReport });
  } catch (error) {
    // console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

const assignCase = async (req, res) => {
  try {
    const { company } = req.body;

    if (!company) {
      return res.json({ message: "Company name is required to get details" });
    }

    const reports = await ReportModel.find({ companyName: company });

    if (reports.length === 0) {
      return res.json({ message: "No report found" });
    }

    // Assuming req.body contains the updated data
    const updatedReport = await ReportModel.findOneAndUpdate(
      { companyName: company },
      req.body,
      { new: true } // To return the updated document
    );

    res.status(200).json({ results: updatedReport });
  } catch (error) {
    // console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

const closeCase = async (req, res) => {
  try {
    const { company } = req.body;

    if (!company) {
      return res.json({ message: "Company name is required to get details" });
    }

    const reports = await ReportModel.find({ companyName: company });

    if (reports.length === 0) {
      return res.json({ message: "No report found" });
    }

    // Assuming req.body contains the updated data
    const updatedReport = await ReportModel.findOneAndUpdate(
      { companyName: company },
      req.body,
      { new: true } // To return the updated document
    );

    res.status(200).json({ results: updatedReport });
  } catch (error) {
    // console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

const updateCase = async (req, res) => {
  try {
    const { company } = req.body;

    if (!company) {
      return res.json({ message: "Company name is required to get details" });
    }

    const reports = await ReportModel.find({ companyName: company });

    if (reports.length === 0) {
      return res.json({ message: "No report found" });
    }

    // Assuming req.body contains the updated data
    const updatedReport = await ReportModel.findOneAndUpdate(
      { companyName: company },
      req.body,
      { new: true } // To return the updated document
    );

    res.status(200).json({ results: updatedReport });
  } catch (error) {
    // console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};


const deleteReportCollection = async (req, res) => {
  try {
    const db = mongoose.connection.db;

    // Delete the specified collection
    await db.dropCollection("reports");

    return res.status(200).json({ success: true, message: "Database cleaned up" });
  } catch (error) {
    console.error(error);
   return  res.status(500).json({ message: "Something went wrong" });
  }
};

module.exports = {
  createReport,
  sendReportToRegulator,
  modifyReportAgePriority,
  getReportsSentToRegulators,
  getAllPendingReports,
  getDetailsOfSingleReport,
  getAllUnderReviewReports,
  getAllReviewedReports,
  changeStatusToReview,
  assignCase,
  closeCase,
  updateCase,
  deleteReportCollection
};
