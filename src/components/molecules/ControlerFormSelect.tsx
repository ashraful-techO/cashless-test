"use client";
import { FC } from "react";
import { Controller } from "react-hook-form";
import { FormInputSelect } from "../atomic";

interface PropsType {
  control: any;
  error?: string;
  name: string;
  label: string;
  items: { label: string; value: string }[];
  required?: boolean;
  disabled?: boolean;
}

export const ControlerFormSelect: FC<PropsType> = ({
  control,
  name,
  label,
  items,
  error,
  required,
  disabled,
}) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <FormInputSelect
          {...field}
          label={label}
          items={items}
          error={error}
          required={required}
          disabled={disabled} // ✅ this now works correctly
        />
      )}
    />
  );
};
