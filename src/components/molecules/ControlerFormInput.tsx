import { FC } from "react";
import { Controller } from "react-hook-form";
import { FormInput } from "../atomic";

interface PropsType {
  control: any;
  error?: any;
  name: string;
  label: string;
  required?: boolean;
  type?: string;
  disabled?: boolean;
}

export const ControlerFormInput: FC<PropsType> = ({
  control,
  error,
  name,
  label,
  ...rest
}) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <FormInput error={error} label={label} {...field} {...rest} />
      )}
    />
  );
};
