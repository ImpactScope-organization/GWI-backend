////Limitation//////////
const xlsx = require("xlsx");

const getAllTextForCompany = (fileName, companyName) => {
  const workbook = xlsx.readFile(fileName);
  const sheetNames = workbook.SheetNames;

  let allText = [];

  sheetNames.forEach((sheetName) => {
    const sheet = workbook.Sheets[sheetName];
    const rows = xlsx.utils.sheet_to_json(sheet);
    let filteredRows = rows.filter((row) => row.Company === companyName);

    // Limit to 20 rows
    filteredRows = filteredRows.slice(0, 7);

    if (filteredRows.length > 0) {
      let sheetText = [];
      filteredRows.forEach((row) => {
        if (row.text) {
          sheetText.push(row.text);
        }
      });
      if (sheetText.length > 0) {
        allText.push(`${sheetName}:\n${sheetText.join(" ")}`);
      }
    }
  });

  return allText.join("\n\n");
};

const targetCompanyName = "JP Morgan";

const fileName = "Data Collection.xlsx"; // Set the correct file path here

module.exports = {
  getAllTextForCompany,
};
