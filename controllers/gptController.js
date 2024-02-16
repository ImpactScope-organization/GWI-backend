const { analyzeCompanyEmissions } = require("../ExtraFile");
const { chapGPT } = require("../utils/gpt");
const { getAllTextForCompany } = require("../utils/readExcel");
const { getAllRows } = require("../chal");

module.exports.gptResponse = async (req, res, next) => {
  try {
    const { targetCompanyName, description, systemPrompts } = req.body;

    if (!description) {
      return res
        .status(400)
        .json({ message: `No record found of ${targetCompanyName}` });
    }

    let response = await chapGPT(description, [systemPrompts]);
    if (!response) {
      return res.status(400).json({ message: "error" });
    } else {
      res.status(200).json({
        success: true,
        response: response,
      });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports.gptHardcoded = async (req, res, next) => {
  try {
    const { targetCompanyName } = req.body;

    let fileName = "All.xlsx";

    let rowsOfCompany1 = getAllRows(fileName, targetCompanyName);

    let prompt = `Identify any inconsistencies for ${targetCompanyName} within the data across different sheets. Report conflicting details which may be signs of potential greenwashing or misalignments between these sources, if any, in a concise manner.  Keep the response within 12 lines: \n\n
    ${rowsOfCompany1} 
    `;

    let response = await chapGPT(prompt);
    if (!response) {
      return res.status(400).json({ message: "error" });
    } else {
      res.status(200).json({
        success: true,
        response: response,
      });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports.gptAnotherResponse = async (req, res, next) => {
  try {
    const { targetCompanyName } = req.body;
    const { fileName } = req.body;

    let rowsOfCompany = analyzeCompanyEmissions(targetCompanyName, fileName);

    if (!rowsOfCompany) {
      return res.status(400).json({ message: "No record found" });
    }

    let prompt = `"I am giving you a record of ${targetCompanyName}. Identify any inconsistencies for ${targetCompanyName}. Report conflicting details or misalignments among the different statement of this company, if any, in a concise manner. Keep the response within 10 lines."\n${JSON.stringify(
      rowsOfCompany,
      null,
      2
    )}`;

    let response = await chapGPT(prompt);
    if (!response) {
      return res.status(400).json({ message: "error" });
    } else {
      res.status(200).json({
        success: true,
        response: response,
      });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
