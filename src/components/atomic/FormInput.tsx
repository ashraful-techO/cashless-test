import Icon from "@/libs/Icons";
import { Input } from "@material-tailwind/react";
import { forwardRef } from "react";

interface PropsType {
	label?: string;
	placeholder?: string;
	type?: string;
	icon?: any;
	bgColor?: boolean;
	error?: string;
	value?: string | number;
	required?: boolean;
	onChange?: (e: any) => void;
	disabled?: boolean;
	name?: string;
}

export const FormInput = forwardRef<HTMLInputElement, PropsType>(
	({ label, icon, bgColor, error, required, value, ...rest }, ref) => {
		return (
      <div>
        {label && (
          <p className={`font-normal mb-1 mt-4 ${error && "text-red-500"}`}>
            {label} <span className="text-red-500 ">{required && "*"}</span>
          </p>
        )}
        <Input
          {...rest}
          ref={ref}
          className={`${bgColor ? "bg-gray-100" : "bg-white"} ${
            error &&
            "!border-red-500 focus:!border-red-500 focus:!border-t-red-500 focus:ring-red-500/10"
          } !border !border-gray-300  !rounded-[4px] !h-[42px] text-gray-900  ring-4 ring-transparent placeholder:text-gray-500 focus:!border-primary focus:!border-t-primary focus:ring-primary/10 w-full`}
          labelProps={{
            className: "hidden",
          }}
          value={value}
          crossOrigin={undefined}
          icon={<Icon path={icon} width={16} height={16} fill="#808080" />}
        />
        {error && <p className="text-red-500 mt-1 ">{error}</p>}
      </div>
    );
	}
);
FormInput.displayName = "FormInput";
