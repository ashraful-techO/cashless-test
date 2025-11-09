const CSV_CONTENT_HEADER =
  "data:text/csv;charset=utf-8,Agent Code,Agent Name,Agent Mobile,Unit Manager Name,Unit Manager Mobile,Br. Manager Name,Br. Manager Mobile,Policy No.,Policy Owner Name,Phone No.,Gender,Address,Types of Medical Examination,Required Medical,Medical Info,Required Lab test,Test Type,Other Test\r\n";

const CSV_DATA_ROWS = [
  "Agent123,Hasan,01778896969,Hasan Arif,01998896969,Abu Hasan,01558896969,BBBL47002,Kamrun Nahar1,01711111111,Female,Dhaka,Adult Medical,True,Medical Info,True,N/A,Lipid Profile",
  "Agent124,Abdullah,01778896969,Hasan Arif,01998896969,Abu Hasan,01558896969,BBBL47002,Asif Akbar2,01711111111,Female,Dhaka,Juvenile Medical (Child),True,Medical Info,True,Blood Profile up to 1 crore,Lipid Profile",
  "Agent125,Arif,01778896969,Hasan Arif,01998896969,Abu Hasan,01558896969,BBBL47002,Kamrun Nahar3,01711111111,Female,Dhaka,Juvenile Medical (Both),True,Medical Info,True,Blood Profile above 1 crore,Lipid Profile",
  "Agent126,Hasib,01778896969,Hasan Arif,01998896969,Abu Hasan,01558896969,BBBL47002,Kamrun Nahar4,01711111111,Female,Dhaka,Juvenile Medical (Both),True,Medical Info,True,ECG Urine Analysis Profile,Lipid Profile",
  "Agent127,Abu Hasan,01778896969,Hasan Arif,01998896969,Abu Hasan,01558896969,BBBL47002,Kamrun Nahar5,01711111111,Female,Dhaka,Adult Medical,True,Medical Info,True,Diabetes Profile,Lipid Profile",
];

export const downloadMultipleUserDemoCSV = () => {
  try {
    let csvContent = CSV_CONTENT_HEADER;
    csvContent += CSV_DATA_ROWS.join("\r\n"); // Join multiple records with line breaks

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `MultipleUserCSV.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (error) {
    console.log(error);
  }
};
