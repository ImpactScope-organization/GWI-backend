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
    console.log(
      "==============Request Received At GPT Prompt======================"
    );
    console.log(response);
    console.log("====================================");
    if (!response) {
      return res.status(400).json({ message: "error" });
    } else {
      res.status(200).json({
        success: true,
        response: response,
      });
    }
  } catch (error) {
    console.log("catch error");
    return res.status(500).json({ message: error.message });
  }
};

module.exports.gptHardcoded = async (req, res, next) => {
  try {
    console.log("hello");
    const { targetCompanyName } = req.body;

    let fileName = "All.xlsx";
    let fileName1 = "Data Collection.xlsx";
    let fileName2 = "Bahrain-and-Malta-data.xlsx";

    let rowsOfCompany1 = getAllRows(fileName, targetCompanyName);
    console.log("rows: ", rowsOfCompany1);
    // let rowsOfCompany1 = getAllRows(fileName1, targetCompanyName);
    // let rowsOfCompany2 = getAllRows(fileName2, targetCompanyName);

    // console.log("rowsOfCompany1: ", rowsOfCompany1);
    // console.log("rowsOfCompany2: ", rowsOfCompany2);

    // console.log(rowsOfCompany);

    // if (Object.keys(rowsOfCompany1).length === 0) {
    //   return res.status(400).json({ message: "No record found" });
    // }
    // if (Object.keys(rowsOfCompany2).length === 0) {
    //   return res.status(400).json({ message: "No record found" });
    // }

    let prompt = `Identify any inconsistencies for ${targetCompanyName} within the data across different sheets. Report conflicting details which may be signs of potential greenwashing or misalignments between these sources, if any, in a concise manner.  Keep the response within 12 lines: \n\n
    ${rowsOfCompany1} 

    `;
    // console.log("prompt: ", prompt);

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
    console.log("catch error");
    return res.status(500).json({ message: error.message });
  }
};

module.exports.gptAnotherResponse = async (req, res, next) => {
  try {
    const { targetCompanyName } = req.body;
    const { fileName } = req.body;

    console.log(targetCompanyName, fileName);

    let rowsOfCompany = analyzeCompanyEmissions(targetCompanyName, fileName);

    console.log("rowsOfCompany: ", rowsOfCompany);

    // if (Object.keys(rowsOfCompany).length === 0) {
    //   return res.status(400).json({ message: "No record found" });
    // }

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
    console.log("catch error");
    return res.status(500).json({ message: error.message });
  }
};
