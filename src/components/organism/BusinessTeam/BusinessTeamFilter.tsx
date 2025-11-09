"use client";
import { CustomDatePickerWithDays } from "@/components/molecules";
import { SearchInput } from "@/components/molecules/SearchInput";
import { formatStatus } from "@/utils/helpers/format.helpers";
import { Button } from "@material-tailwind/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

interface Tab {
  title: string;
  value: string;
  queryPath: any;
}

// const tabData: Tab[] = [
//   { title: "ALL", value: "ALL" },
//   { title: "PENDING", value: "PENDING" },
//   { title: "COMPLETED", value: "COMPLETED" },
// ];

const tabData: Tab[] = [
  { title: "PENDING", value: "COMPLETED", queryPath: ["medicalStatus"] },
  {
    title: "COMPLETED",
    value: "COMPLETED",
    queryPath: ["medicalStatus", "testStatus"],
  },
  { title: "ALL", value: "ALL", queryPath: ["medicalStatus", "testStatus"] },
];

export const BusinessTeamFilter = () => {
  const [active, setActive] = useState(tabData[0]?.title);

  const router = useRouter();
  const searchParams = useSearchParams();
  const query = Object.fromEntries(searchParams.entries());

  const handleTab = (el: Tab) => {
    setActive(el.title);

    const params = new URLSearchParams();

    el.queryPath.forEach((path: string) => {
      // if "ALL", clear these filters (optional)
      if (el.value !== "ALL") {
        params.set(path, el.value);
      }
    });

    const queryString = params.toString();
    const url = queryString
      ? `/business-team?${queryString}`
      : "/business-team";

    router.push(url);
  };

  useEffect(() => {
    if (!query?.medicalStatus)
      router?.push(`/business-team?medicalStatus=COMPLETED`);
  }, []);

  return (
    <div className="grid grid-cols-12 items-end">
      <div className="col-span-7">
        {tabData?.map((el, i) => (
          <Button
            key={i}
            // onClick={() => router?.push(`/medical-assessment?${el?.queryPath}=${el?.value}`)}
            onClick={() => handleTab(el)}
            className={`${
              active === el?.title
                ? "bg-primary text-white"
                : "bg-transparent text-black"
            } shadow-none text-sm hover:shadow-none py-2 px-3`}
          >
            {formatStatus(el?.title)}
          </Button>
        ))}
      </div>

      {/* <div className="col-span-5">
        <div className="grid grid-cols-2 gap-4">
          <CustomDatePickerWithDays
            startDate={startDate}
            endDate={endDate}
            setStartDate={setStartDate}
            setEndDate={setEndDate}
            placeholder="Select date range"
            label="From - To Date"
          />

          <div className="mt-10 w-full">
            <SearchInput
              searchKey="search"
              placeholder="Search by patient name, mobile number..."
            />
          </div>
        </div>
      </div> */}
    </div>
  );
};
