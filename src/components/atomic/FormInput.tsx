import Icon from "@/libs/Icons";
import { Input, type InputProps } from "@material-tailwind/react";
import { forwardRef } from "react";
import React from "react";

interface PropsType
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size" | "color"> {
  label?: string;
  value?: string | number;
  icon?: any;
  bgColor?: boolean;
  error?: string;
  required?: boolean;

  // Optional: override InputProps from MUI for color/size
  inputColor?: InputProps["color"];
  inputSize?: InputProps["size"];
}

export const FormInput = forwardRef<HTMLInputElement, PropsType>(
  (
    {
      label,
      icon,
      bgColor,
      error,
      required,
      value,
      inputColor,
      inputSize,
      ...rest
    },
    ref
  ) => {
    return (
      <div>
        {label && (
          <p
            className={`font-normal text-xs mb-1 mt-1 ${
              error ? "text-red-500" : ""
            }`}
          >
            {label} <span className="text-red-500">{required && "*"}</span>
          </p>
        )}

        {/* <Input
          {...rest} // all standard HTML props
          ref={ref}
          value={value}
          color={inputColor}
          size={inputSize}
          className={`${bgColor ? "bg-gray-100" : "bg-white"} ${
            error &&
            "!border-red-500 focus:!border-red-500 focus:!border-t-red-500 focus:ring-red-500/10"
          } !border !border-gray-100 !rounded-[4px] !h-[40px] text-gray-900 ring-4 ring-transparent placeholder:text-gray-500 focus:!border-primary focus:!border-t-primary focus:ring-primary/10 w-38`}
          labelProps={{ className: "hidden" }}
          icon={
            icon ? (
              <Icon path={icon} width={10} height={10} fill="#808080" />
            ) : undefined
          }
        /> */}

        <Input
          {...rest}
          ref={ref}
          value={value}
          color={inputColor}
          size={inputSize}
          className={`${bgColor ? "bg-gray-100" : "bg-white"} ${
            error &&
            "!border-red-500 focus:!border-red-500 focus:!border-t-red-500 focus:ring-red-500/10"
          } !border !border-gray-100 !rounded-[4px] !h-[40px] text-gray-900 ring-4 ring-transparent placeholder:text-gray-500 focus:!border-primary focus:!border-t-primary focus:ring-primary/10 w-38`}
          labelProps={{ className: "hidden" }}
          icon={
            icon ? (
              <Icon path={icon} width={10} height={10} fill="#808080" />
            ) : undefined
          }
        />

        {error && <p className="text-red-500 mt-1">{error}</p>}
      </div>
    );
  }
);

FormInput.displayName = "FormInput";
