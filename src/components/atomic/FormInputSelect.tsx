import { Option, Select } from "@material-tailwind/react";
import { FC } from "react";

export interface IItems {
  label: string;
  value: string;
}

export interface ISelectPropsType {
  name?: string;
  value?: string;
  label?: string;
  items: IItems[];
  placeholder?: string;
  required?: boolean;
  error?: string;
  disabled?: boolean;
  onChange?: (e: any) => void;
}

export const FormInputSelect: FC<ISelectPropsType> = ({
  label,
  items = [],
  error,
  required,
  disabled,
  onChange,
  value,
  ...rest
}) => {
  return (
    <div className="w-full flex flex-col items-center">
      {/* Label */}
      {label && (
        <p
          className={`font-normal text-xs mb-1 mt-1 ${
            error ? "text-red-500" : ""
          }`}
        >
          {label} <span className="text-red-500">{required && "*"}</span>
        </p>
      )}

      {/* Select Wrapper */}
      <div
        className={`relative w-34 max-w-xs ${disabled ? "opacity-90" : ""}`}
      >
        <Select
          {...rest}
          value={value}
          onChange={disabled ? undefined : onChange} // prevent change if disabled
          labelProps={{
            className: "before:content-none after:content-none",
          }}
          disabled={disabled}
          error={!!error}
          className={`${
            error
              ? "!border-red-500 focus:!border-red-500 focus:ring-red-500/10"
              : "!border-gray-100 focus:!border-primary focus:ring-primary/10"
          } !border !rounded-[4px] !h-[40px] text-gray-900 ring-4 ring-transparent 
          placeholder:text-gray-500 w-full ${
            disabled ? "bg-gray-100 cursor-not-allowed" : ""
          }`}
        >
          {items.map((item, i) => (
            <Option
              key={i}
              value={item.value}
              className="flex center text-center" // centers the option text
            >
              {item.label}
            </Option>
          ))}
        </Select>

        {/* Overlay to block clicks if disabled */}
        {disabled && (
          <div className="absolute inset-0 cursor-not-allowed bg-transparent z-10"></div>
        )}
      </div>

      {/* Error message */}
      {error && (
        <p className="text-red-500 mt-1 text-sm text-center">{error}</p>
      )}
    </div>
  );
};
