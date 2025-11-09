"use client";
import { CustomButton } from "@/components/atomic";
import {
  getLastMonthDateRange,
  getLastWeekDateRange,
  getThisMonthDateRange,
  getThisWeekDateRange,
} from "@/utils/helpers/date.helpers";
import { useRouter, useSearchParams } from "next/navigation";
import { Dispatch, FC, SetStateAction } from "react";
import DatePicker from "react-datepicker";

interface PropsType {
  label?: string;
  placeholder?: string;
  startDate: Date | null;
  endDate: Date | null;
  setStartDate: Dispatch<SetStateAction<Date | null>>;
  setEndDate: Dispatch<SetStateAction<Date | null>>;
}

export const CustomDatePickerWithDays: FC<PropsType> = ({
  label,
  placeholder,
  startDate,
  endDate,
  setStartDate,
  setEndDate,
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const params = new URLSearchParams(searchParams as any);

  const onDateChange = (dates: DateRange) => {
    const [start, end] = dates;
    let sDateString, eDateString;

    if (start) {
      const sDate = new Date(start).toLocaleString();
      const splittedArr = sDate.split(",")[0].split("/");
      const m =
        splittedArr[0].length < 2 ? `0${splittedArr[0]}` : splittedArr[0];
      const d =
        splittedArr[1].length < 2 ? `0${splittedArr[1]}` : splittedArr[1];
      sDateString = `${splittedArr[2]}-${m}-${d}`;
      setStartDate(start);
      setEndDate(null);
    }

    if (end) {
      const eDate = new Date(end).toLocaleString();
      const splittedArr = eDate.split(",")[0].split("/");
      const m =
        splittedArr[0].length < 2 ? `0${splittedArr[0]}` : splittedArr[0];
      const d =
        splittedArr[1].length < 2 ? `0${splittedArr[1]}` : splittedArr[1];
      eDateString = `${splittedArr[2]}-${m}-${d}`;
      setEndDate(end);
    }

    if (sDateString && eDateString) {
      params.set("fromDate", sDateString);
      params.set("toDate", eDateString);
    } else if (!sDateString && !eDateString) {
      params.delete("fromDate");
      params.delete("toDate");
      setEndDate(null);
      setStartDate(null);
    }

    router.replace(`?${params.toString()}`);
  };

  return (
    <div>
      {label && <p className={`font-medium mb-1 mt-4`}>{label}</p>}
      <DatePicker
        selectsRange={true}
        endDate={endDate}
        onChange={onDateChange}
        selected={startDate}
        startDate={startDate}
        isClearable={true}
        placeholderText={placeholder}
      >
        <p className="mt-[36px] pb-1 text-center border-b-[1px] border-[#aeaeae]">
          Quick sort
        </p>
        <div className="border-r-[1px] border-[#aeaeae] pr-3">
          <CustomButton
            variant="outlined"
            handleClick={() => onDateChange(getThisWeekDateRange())}
          >
            This Week
          </CustomButton>
          <CustomButton
            variant="outlined"
            handleClick={() => onDateChange(getLastWeekDateRange())}
          >
            Last Week
          </CustomButton>
          <CustomButton
            variant="outlined"
            handleClick={() => onDateChange(getThisMonthDateRange())}
          >
            This Month
          </CustomButton>
          <CustomButton
            variant="outlined"
            handleClick={() => onDateChange(getLastMonthDateRange())}
          >
            Last Month
          </CustomButton>
        </div>
      </DatePicker>
    </div>
  );
};
type DateRange = [Date | null, Date | null];
