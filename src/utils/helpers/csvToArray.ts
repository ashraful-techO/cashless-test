import {
  camelCaseToTitleCase,
  formatePhNumberForCSV,
  toBoolean,
  trimString,
} from "./format.helpers";

interface IData {
  success: boolean;
  data: any[];
}

// Helper: Proper CSV line splitter
function parseCSVLine(line: string, delimiter = ",") {
  const regex = new RegExp(
    `\\s*(?:\"([^"]*(?:\"\"[^"]*)*)\"|([^\"${delimiter}]*))\\s*(?:${delimiter}|$)`,
    "g"
  );
  const values: string[] = [];
  line.replace(regex, (_, quoted, unquoted) => {
    values.push(quoted?.replace(/""/g, '"') ?? unquoted);
    return "";
  });
  return values;
}

export default async function csvToArray(
  str: string,
  delimiter = ","
): Promise<IData> {
  const rows = str
    .slice(str.indexOf("\n") + 1)
    .split("\n")
    .filter((line) => line.trim() !== "");

  let arr: any[] = [];
  let errors: string[] = [];

  rows.forEach((element, idx) => {
    const values = parseCSVLine(element, delimiter);
    let info: any = {};

    if (values[0]) {
      try {
        info = {
          agentCode: trimString(values[0]),
          agentName: trimString(values[1]),
          agentMobile: formatePhNumberForCSV(trimString(values[2])),
          unitManagerName: trimString(values[3]),
          unitManagerMobile: formatePhNumberForCSV(trimString(values[4])),
          branchManagerName: trimString(values[5]),
          branchManagerMobile: formatePhNumberForCSV(trimString(values[6])),
          policyNumber: trimString(values[7]),
          policyOwnerName: trimString(values[8]),
          mobile: formatePhNumberForCSV(trimString(values[9])),
          gender: trimString(values[10]),
          address: trimString(values[11]),
          applicantsType: trimString(values[12]),
          isRequiredMedical: toBoolean(values[13]),
          medicalInfo: trimString(values[14]),
          isRequiredTest: toBoolean(values[15]),
          requiredTest: trimString(values[16]),
          requiredOtherTest: trimString(values[17]),
        };

        // Define optional fields that can be blank
        const optionalFields = ["requiredTest", "requiredOtherTest"];

        for (const key in info) {
          if (!optionalFields.includes(key) && info[key] === "") {
            errors.push(
              `Error at row ${idx + 2}: ${camelCaseToTitleCase(key)} is empty.`
            );
          }
        }
      } catch (err: any) {
        if (err.message === "Invalid Phone Number!") {
          errors.push(`Error at row ${idx + 2}: Invalid Phone Number!`);
        } else {
          errors.push(`Error at row ${idx + 2}: ${err.message}`);
        }
      }

      arr.push(info);
    }
  });

  if (errors.length > 0) {
    errors.forEach((el: any) => alert(el));
    return { success: false, data: [] };
  }

  return { success: true, data: arr };
}
