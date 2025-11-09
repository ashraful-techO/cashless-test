import { setHours, setMinutes } from "date-fns";
import { FC } from "react";
import DatePicker from "react-datepicker";

interface PropsType {
	label?: string;
	placeholder?: string;
	startDate: any;
	setStartDate: (date: Date | null) => void;
}

export const CustomDatePicker: FC<PropsType> = ({ label, placeholder, startDate, setStartDate }) => {
	return (
		<div>
			{label && <p className={`font-normal mb-1 mt-4`}>{label}</p>}
			<DatePicker
				selected={startDate}
				onChange={(date) => setStartDate(date as any)}
				placeholderText={placeholder}
				showTimeSelect
				excludeTimes={[
					setHours(setMinutes(new Date(), 0), 17),
					setHours(setMinutes(new Date(), 30), 17),
					setHours(setMinutes(new Date(), 30), 18),
					setHours(setMinutes(new Date(), 30), 19),
				]}
				dateFormat="MMMM d, yyyy h:mm aa"
			/>
		</div>
	);
};
