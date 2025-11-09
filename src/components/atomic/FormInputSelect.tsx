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
    <div className="w-full">
      {label && (
        <p className={`font-normal mb-1 mt-4 ${error ? "text-red-500" : ""}`}>
          {label} <span className="text-red-500">{required && "*"}</span>
        </p>
      )}

      {/* Wrapper to intercept clicks when disabled */}
      <div className={`relative ${disabled ? "opacity-90" : ""}`}>
        <Select
          {...rest}
          value={value}
          onChange={disabled ? undefined : onChange} // 🔒 prevent value change
          labelProps={{
            className: "before:content-none after:content-none",
          }}
          disabled={disabled} // Won’t fully disable natively, but still included
          error={!!error}
          className={`${
            error
              ? "!border-red-500 focus:!border-red-500 focus:ring-red-500/10"
              : "!border-gray-300 focus:!border-primary focus:ring-primary/10"
          } !border !rounded-[4px] !h-[42px] text-gray-900 ring-4 ring-transparent 
          placeholder:text-gray-500 w-full ${
            disabled ? "bg-gray-100 cursor-not-allowed" : ""
          }`}
        >
          {items.map((item, i) => (
            <Option key={i} value={item.value}>
              {item.label}
            </Option>
          ))}
        </Select>

        {/* Overlay to block clicks if disabled */}
        {disabled && (
          <div className="absolute inset-0 cursor-not-allowed bg-transparent z-10"></div>
        )}
      </div>

      {error && <p className="text-red-500 mt-1 text-sm">{error}</p>}
    </div>
  );
};
