export const downloadCSV = (data: any) => {
	if (data) {
		const csvData = convertToCSV(data);
		downloadData(csvData);
	}
};

const convertToCSV = (data: any) => {
	const headers = Object.keys(data[0]).join(",");
	const rows = data.map((row: any) => Object.values(row).join(","));
	return [headers, ...rows].join("\n");
};

const downloadData = (csvData: any) => {
	const blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" });
	const link = document.createElement("a");
	const url = URL.createObjectURL(blob);
	link.setAttribute("href", url);
	link.setAttribute("download", "Failed Upload Users.csv");
	document.body.appendChild(link);
	link.click();
	document.body.removeChild(link);
};
