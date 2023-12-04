const mongoose = require("mongoose");
const reportSchema = new mongoose.Schema({
  companyName: {
    type: String,
  },

  jurisdiction: {
    type: String,
  },

  sector: {
    type: String,
  },

  annualRevenue: {
    type: String,
  },

  noOfEmployees: {
    type: String,
  },

  dataSources: {
    type: String,
  },

  contradiction: {
    type: String,
  },

  unsubstantiatedClaims: {
    type: String,
  },

  potentialInconsistencies: {
    type: String,
  },
  sources: { type: String },

  greenwashRiskPercentage: {
    type: String,
  },

  reportingRiskPercentage: {
    type: String,
  },

  GHGEmissions: {
    type: String,
  },

  IPFSHash: {
    type: String,
  },

  etherscanURL: {
    type: String,
  },

  age: {
    type: String,
    default: "Fresh",
  },

  priority: {
    type: String,
    default: "Low",
  },

  sentToRegulators: {
    type: String,
    default: "false",
  },

  pending: {
    type: String,
    default: "false",
  },

  reviewing: {
    type: String,
    default: "false",
  },

  reviewed: {
    type: String,
    default: "false",
  },

  disregard: {
    type: String,
    default: "false",
  },

  claims: {
    type: String,
  },

  summary: {
    type: String,
  },

  openedBy: {
    type: String,
  },

  assignedTo: {
    type: String,
  },

  sendToRegulatorsTimeStamp: {
    type: String,
  },
  caseOpenedTimeStamp: {
    type: String,
  },

  caseAssignedTimeStamp: {
    type: String,
  },
  caseUpdateTimeStamp: {
    type: String,
  },

  comment: {
    type: String,
  },

  conclusion: {
    type: String,
  },

  updatedComment: {
    type: String,
  },
});

module.exports = mongoose.model("report", reportSchema);
