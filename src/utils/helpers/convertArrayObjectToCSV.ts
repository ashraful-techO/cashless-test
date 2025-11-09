export const convertArrayOfObjectsToCSV = (data: any) => {
	if (data?.length === 0) {
		return "";
	}

	const headers = Object.keys(data[0]);

	let csv = headers.join(",") + "\n";

	csv += data
		.map((row: any) => {
			return headers
				.map((header) => {
					return row[header];
				})
				.join(",");
		})
		.join("\n");

	return csv;
};
