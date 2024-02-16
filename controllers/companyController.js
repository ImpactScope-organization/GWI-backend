const { Mongoose } = require("mongoose");
const reportModel = require("../model/reportModel");

const getCompany = async (req, res) => {
  try {
    const id = req.params.id;
    const company = await reportModel.findOne({ _id: id });

    if (!company) {
      return res.status(404).json({ message: "Err occured" });
    }

    res.status(200).json({ result: company });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

const getAllCompanies = async (req, res) => {
  try {
    const companies = await reportModel.find({
      sentToRegulators: false,
    });
    return res.status(200).json({ message: "success", results: companies });
  } catch (error) {
    res.status(500).json({ message: error?.message || "Something went wrong" });
  }
};

const getAllDemoCompanies = async (req, res) => {
  try {
    const companies = await reportModel.find({
      isDemo: true,
    });
    if (companies.length === 0) {
      return res
        .status(200)
        .json({ message: "No companies found in demo.", results: companies });
    } else {
      return res.status(200).json({ message: "success", results: companies });
    }
  } catch (error) {
    res.status(500).json({ message: error?.message || "Something went wrong" });
  }
};

const createCompany = async (req, res) => {
  try {
    const company = await reportModel.create({ ...req.body });
    res.status(200).json({ status: "success", result: company });
  } catch (error) {
    res.status(500).json({
      status: "failed",
      result: [],
      message: error?.message || "Something went wrong",
    });
  }
};

const updateCompany = async (req, res) => {
  try {
    const id = req.params.id;
    // Find the company by ID and update it
    const updatedCompany = await reportModel.findByIdAndUpdate(
      id,
      req.body, // Assuming the request body contains the fields you want to update
      { new: true } // to return the updated document
    );

    if (!updatedCompany) {
      return res.status(404).json({ error: "Company not found" });
    }

    // Send the updated company as a JSON response
    res.json(updatedCompany);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
const deleteCompany = async (req, res) => {
  try {
    const id = req.params.id;
    const company = await reportModel.findByIdAndRemove(id);
    res.status(200).json({
      status: "success",
      message: "Company removed successfully. ",
    });
  } catch (error) {
    res
      .status(500)
      .json({ status: "failed", result: [], message: "Something went wrong" });
  }
};

module.exports = {
  getCompany,
  getAllCompanies,
  getAllDemoCompanies,
  createCompany,
  deleteCompany,
  updateCompany,
};
