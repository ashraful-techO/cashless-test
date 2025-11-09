import { FC } from "react";
import { Controller } from "react-hook-form";
import { MultipleFormInput } from "../atomic";

interface PropsType {
	control: any;
	error?: any;
	name: string;
	label: string;
	required?: boolean;
	type?: string;
	disabled?: boolean;
}

export const ControlerMultiLineForm: FC<PropsType> = ({ control, error, name, label, ...rest }) => {
	return (
		<Controller
			control={control}
			name={name}
			render={({ field }) => <MultipleFormInput error={error} label={label} {...field} {...rest} />}
		/>
	);
};
