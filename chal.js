const xlsx = require("xlsx");

const getAllRows = (fileName, companyName) => {
  const workbook = xlsx.readFile(fileName);
  const sheetNames = workbook.SheetNames;

  let allText = [];

  sheetNames.forEach((sheetName) => {
    const sheet = workbook.Sheets[sheetName];
    const rows = xlsx.utils.sheet_to_json(sheet);

    let filteredRows = rows.filter((row) => row.Company === companyName);
    console.log("filteredRows", filteredRows);

    // Limit to 20 rows (or whatever limit you want)
    filteredRows = filteredRows.slice(0, 20);

    if (filteredRows.length > 0) {
      let sheetText = [];
      filteredRows.forEach((row) => {
        if (row.Description) {
          sheetText.push(row.Description);
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

// let ans = getAllTextForCompany(fileName, targetCompanyName);
// console.log("ans: ", ans);

module.exports = {
  getAllRows,
};
