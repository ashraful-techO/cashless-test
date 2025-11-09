export const formatNumber = (number: string | number = 0): string => {
	return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export const isValidPhone = (number: string) => {
	const regex = /^((01){1}[2-9]{1}\d{8})$/;
	return regex.test(number);
};

export const formatStatus = (status: string): string => {
	if (!status) {
		return "";
	} else {
		return status
			.toLowerCase()
			.replace(/_/g, " ")
			.replace(/\b(\w)/g, (x) => x.toUpperCase());
	}
};

export const formatAddUnderscores = (inputString: string) => {
	return inputString?.toString()?.replace(/\s/g, "_").toUpperCase();
};

export function camelCaseToTitleCase(camelCase: string): string {
	const result = camelCase.replace(/([A-Z])/g, " $1");
	return result.charAt(0).toUpperCase() + result.slice(1);
}

export const trimString = (value?: any) => {
	let output: any;

	if (value) {
		output = value.trim();
	} else {
		output = "";
	}

	return output;
};

export const formateDateForCSV = (dt: string) => {
	let date = "";
	let dateParsed;

	if (dt) {
		if (dt.includes("/")) {
			dateParsed = trimString(dt).toString().split("/");
		} else if (dt.includes("-")) {
			dateParsed = trimString(dt).toString().split("-");
		}
		date = trimString(dateParsed[2]) + "-" + trimString(dateParsed[1]) + "-" + trimString(dateParsed[0]);
	}
	return date;
};

export const formatePhNumberForCSV = (ph: string) => {
	if (ph) {
		let num = ph;
		if (ph.charAt(0) !== "0") {
			num = `0${ph}`;
		}
		if (isValidPhone(num)) {
			return num;
		} else {
			throw new Error("Invalid Phone Number!");
		}
	}
	return ph;
};

export const formattedDate = (date: Date | string | number): string => {
	const validDate = new Date(date);

	if (isNaN(validDate.getTime())) {
		throw new Error("Invalid date provided");
	}

	const localTime = new Date(validDate.getTime() - validDate.getTimezoneOffset() * 60000);

	return localTime.toISOString().slice(0, 19);
};

export const getLocalDate = (dateString: string | undefined): Date => {
	if (dateString) {
		const utcDate = new Date(dateString);
		return new Date(utcDate.getTime() + utcDate.getTimezoneOffset() * 60000);
	}
	return new Date();
};

export function toBoolean(value: string) {
	if (typeof value === "string") {
		return value.trim().toLowerCase() !== "false";
	}
	return Boolean(value);
}
