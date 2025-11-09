"use client";
import { CustomDatePickerWithDays } from "@/components/molecules";
import { SearchInput } from "@/components/molecules/SearchInput";
import { Button } from "@material-tailwind/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const tabData = ["PENDING", "COMPLETED", "ALL"];
export const AppoinmentFilter = () => {
  const [active, setActive] = useState("PENDING");

  const router = useRouter();
  const searchParams = useSearchParams();
  const query = Object.fromEntries(searchParams.entries());

  const handleTab = (el: string) => {
    setActive(el);
    router?.push(`?csAppointmentStatus=${el}`);
  };

  useEffect(() => {
    if (!query?.csAppointmentStatus)
      router?.push(`?csAppointmentStatus=PENDING`);
  }, []);

  return (
    <div className="grid grid-cols-12 items-end">
      <div className="col-span-7">
        {tabData?.map((el, i) => (
          <Button
            key={i}
            // onClick={() => router?.push(`/appoinment?csAppointmentStatus=${el}`)}
            onClick={() => handleTab(el)}
            className={`${
              active === el
                ? "bg-primary text-white"
                : "bg-transparent text-black"
            } shadow-none text-sm hover:shadow-none py-2 px-3`}
          >
            {el}
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
						<SearchInput searchKey="search" placeholder="Search by patient name, mobile number..." />
					</div>
				</div>
			</div> */}
    </div>
  );
};
