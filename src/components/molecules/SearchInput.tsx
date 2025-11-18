"use client";
import { search } from "@/libs/Icons";
import { useDebounce } from "@/libs/hooks";
import { useRouter, useSearchParams } from "next/navigation";
import { FC, useEffect, useState } from "react";
import { FormInput } from "../atomic";

interface PropsType {
  searchKey: string;
  placeholder: string;
  bgColor?: boolean;
  onChange?: (val: string) => void; 
}

export const SearchInput: FC<PropsType> = ({
  searchKey,
  placeholder,
  bgColor,
  onChange,
  ...rest
}) => {
  const [searchText, setSearchText] = useState<string>("");
  const { value, handleChange } = useDebounce(900);
  const router = useRouter();
  const searchParams = useSearchParams();

  // Initialize from URL
  useEffect(() => {
    const searchParamValue = searchParams.get(searchKey);
    setSearchText(searchParamValue ?? "");
  }, [searchParams, searchKey]);

  // Update URL whenever debounced value changes
  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());

    if (value) {
      params.set(searchKey, value);
    } else {
      params.delete(searchKey);
    }
    params.delete("page");

    router.push(`?${params.toString()}`);
    onChange?.(value ?? ""); // send value to parent
  }, [value, searchKey, searchParams, router, onChange]);

  return (
    <div className="w-full">
      <FormInput
        placeholder={placeholder}
        value={searchText}
        onChange={(e) => {
          setSearchText(e.target.value);
          handleChange(e);
        }}
        {...rest}
        icon={search}
        bgColor={bgColor}
      />
    </div>
  );
};
