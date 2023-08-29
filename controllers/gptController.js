const { analyzeCompanyEmissions } = require("../ExtraFile");
const { chapGPT } = require("../utils/gpt");
const { getAllRowsForCompany } = require("../utils/readExcel");

module.exports.gptResponse = async (req, res, next) => {
  try {
    const { targetCompanyName } = req.body;
    let fileName = "Data Collection.xlsx";

    let rowsOfCompany = getAllRowsForCompany(fileName, targetCompanyName);

    // console.log(rowsOfCompany);

    if (Object.keys(rowsOfCompany).length === 0) {
      return res.status(400).json({ message: "No record found" });
    }

    // let prompt = `Please analyze the provided data for company "${targetCompanyName}" across different sheets (InsigAI, Twitter, and Carbon offsets) and identify any contradictions or inconsistencies between the information provided. You can mention any conflicting mismatched details, or information that doesn't align across these sources. If there are any discrepancies, please highlight them.${JSON.stringify(
    //   rowsOfCompany,
    //   null,
    //   2
    // )}
    // `;

    // let prompt = `"Identify any inconsistencies for ${targetCompanyName} in the given data across 'InsigAI,' 'Twitter,' and 'Carbon offsets' sheets. Report any conflicting details or information misalignment between these sources, if present. The response should not be more than 10 lines".${JSON.stringify(
    //   rowsOfCompany,
    //   null,
    //   2
    // )}
    // `;

    let prompt = `"Identify any inconsistencies for ${targetCompanyName} within the data across 'InsigAI,' 'Twitter,' and 'Carbon offsets' sheets. Report conflicting details or misalignments between these sources, if any, in a concise manner. Keep the response within 12 lines.".${JSON.stringify(
      rowsOfCompany,
      null,
      2
    )}
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
