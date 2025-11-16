"use client";
import React, { useEffect, useState } from "react";
import { CustomDatePickerWithDays } from "@/components/molecules";
import { SearchInput } from "@/components/molecules/SearchInput";
import StatusSelect from "@/components/molecules/StatusSelect";
import { useSelector } from "react-redux";
import ResetButton from "@/components/molecules/ResetButton";
import { getUserState } from "@/store/actions";

export const MetlifeFilter = () => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const { userData } = useSelector(getUserState);

  const userType = userData?.userType ? userData.userType : "B2B_USER";

  const isMetlifeUser = userData?.userType === "Metlife";
  const isBusinessUser = userData?.userType === "Business";
  const isCallCenterUser = userData?.userType === "CallCenter";
  const isMedicalUser = userData?.userType === "Doctor";

  return (
    <div className="grid grid-cols-12 items-end gap-4 py-4">
      {/* Reset Button + Search Input side-by-side */}
      <div className="col-span-12 md:col-span-5 flex flex-row gap-3 items-end">
        {/* <ResetButton setStartDate={setStartDate} setEndDate={setEndDate} /> */}
        {/* <SearchInput
          searchKey="search"
          placeholder="Search by patient name, mobile number..."
        /> */}
      </div>

      {/* Date Picker + Status Select */}
      <div className="col-span-12 md:col-span-7 flex flex-col md:flex-row md:items-end gap-3">
        {/* Date Picker */}
        <div className="flex-1">
          {/* <CustomDatePickerWithDays
            startDate={startDate}
            endDate={endDate}
            setStartDate={setStartDate}
            setEndDate={setEndDate}
            placeholder="Select date range"
          /> */}
        </div>

        {/* Status Select */}
        <div className="flex gap-2">
          {/* {userType == "Doctor" && (
            <StatusSelect />
          )} */}
        </div>
      </div>
    </div>
  );
};
