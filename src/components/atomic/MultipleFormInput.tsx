import { Textarea } from "@material-tailwind/react";
import { FC } from "react";

interface PropsType {
	label?: string;
	placeholder?: string;
	value: string;
	onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
	name?: string;
	error?: string;
}

export const MultipleFormInput: FC<PropsType> = ({ label, value, onChange, name, error, ...rest }) => {
	return (
		<div>
			{label && <p className="font-normal mb-1">{label}</p>}
			<Textarea
				{...rest}
				name={name}
				value={value}
				onChange={onChange}
				resize={true}
				className="!border !border-gray-300 !rounded-[4px] text-gray-900 ring-4 ring-transparent placeholder:text-gray-500 focus:!border-primary focus:!border-t-primary focus:ring-primary/10 w-full"
				containerProps={{
					className: "grid h-full",
				}}
				labelProps={{
					className: "before:content-none after:content-none !bg-transparent",
				}}
			/>

			{error && <p className="text-red-500 mt-1 ">{error}</p>}
		</div>
	);
};
