"use client";
import { Button } from "@material-tailwind/react";
import { useRouter, useSearchParams } from "next/navigation";

interface ResetButtonProps {
  setSearchText?: (val: string) => void;
  setFilterDoctor?: (val: string) => void;
  setStartDate?: (date: Date | null) => void;
  setEndDate?: (date: Date | null) => void;
  onClick?: () => void;
}

const ResetButton = ({
  setSearchText,
  setFilterDoctor,
  setStartDate,
  setEndDate,
  onClick, // <-- MUST BE HERE
}: ResetButtonProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleReset = () => {
    const params = new URLSearchParams(searchParams.toString());

    // Clear URL params
    params.delete("search");
    params.delete("fromDate");
    params.delete("toDate");
    params.delete("medicalStatus");
    params.delete("testStatus");
    params.delete("status");
    params.delete("page");

    // Reset states
    setSearchText?.("");
    setFilterDoctor?.("");
    setStartDate?.(null);
    setEndDate?.(null);

    // Call parent reset
    onClick?.();

    router.push(`?${params.toString()}`);
  };

  return (
    <Button
      type="button"
      onClick={handleReset}
      className="bg-secondary text-white shadow-none text-[12px] hover:shadow-none mt-3 mb-1.5 py-2.5 px-3 whitespace-nowrap no-overflow"
    >
      Reset
    </Button>
  );
};

export default ResetButton;
