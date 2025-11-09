"use client";
import { search } from "@/libs/Icons";
import { useDebounce } from "@/libs/hooks";
import { useRouter, useSearchParams } from "next/navigation";
import { FC, useEffect, useState } from "react";
import { FormInput } from "../atomic";
export const SearchInput: FC<PropsType> = ({
  searchKey,
  placeholder,
  bgColor,
  ...rest
}) => {
  const [searchText, setSearchText] = useState<string>("");
  const { value, handleChange } = useDebounce(900);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const searchParamValue = searchParams.get(searchKey);
    setSearchText(searchParamValue ?? "");
  }, [searchParams]);

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());

    if (value) {
      params.set(searchKey, value);
    } else {
      params.delete(searchKey);
    }
    params.delete("page");

    router.push(`?${params.toString()}`);
  }, [value]);

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
        bgColor
      />
    </div>
  );
};

interface PropsType {
  searchKey: string;
  placeholder: string;
  bgColor?: boolean;
}
