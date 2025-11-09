import { months } from "@/utils/constants/date";
import dateformat from "dateformat";
import { FC } from "react";
import DatePicker from "react-datepicker";

interface PropsType {
	label?: string;
	startDate: Date | null;
	setStartDate: (date: Date | null) => void;
}

const range = (start: number, end: number, step: number): number[] => {
	let output: number[] = [];
	for (let i = start; i < end; i += step) {
		output.push(i);
	}
	return output;
};

export const DatepickerSelectMonthYear: FC<PropsType> = ({ label, startDate, setStartDate }) => {
	const years = range(1990, 2051, 1);

	return (
		<div>
			{label && <p className={`font-normal mb-1 mt-4 `}>{label}</p>}
			<DatePicker
				renderCustomHeader={({
					date,
					changeYear,
					changeMonth,
				}: {
					date: Date;
					changeYear: (year: number) => void;
					changeMonth: (month: number) => void;
				}) => (
					<div className="mb-2 flex items-center gap-6 bg-primary py-1 px-2 rounded-md">
						<select
							value={dateformat(date, "yyyy")}
							onChange={({ target: { value } }) => changeYear(Number(value))}
							className="text-lg outline-none bg-transparent text-white "
						>
							{years.map((option) => (
								<option key={option} value={option} className="text-base text-blue-gray-900">
									{option}
								</option>
							))}
						</select>

						<select
							value={months[Number(dateformat(date, "m")) - 1]}
							onChange={({ target: { value } }) => changeMonth(months.indexOf(value))}
							className="text-lg outline-none bg-transparent text-white py-1"
						>
							{months.map((option) => (
								<option key={option} value={option} className="text-base text-blue-gray-900">
									{option}
								</option>
							))}
						</select>
					</div>
				)}
				selected={startDate}
				onChange={(date) => setStartDate(date as Date)}
			/>
		</div>
	);
};
