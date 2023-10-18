const mongoose = require("mongoose");
const reportSchema = new mongoose.Schema({
  companyName: {
    type: String,
  },

  jurisdiction:{
    type:String
  },

  dataSources:{
    type:String
  },

  contradiction: {
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
