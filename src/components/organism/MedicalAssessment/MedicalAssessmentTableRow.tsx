import { ChipByStatus } from "@/components/molecules";
import { Appoinmentdata } from "@/libs/api/interface/assuarace";

import {
  formatAddUnderscores,
  formatStatus,
} from "@/utils/helpers/format.helpers";
import { Button } from "@material-tailwind/react";
import dateformat from "dateformat";
import Link from "next/link";
import { FC } from "react";
import { MenuItems } from "./MenuItems";

interface PropsType {
  data: Appoinmentdata;
  updateData: () => Promise<void>;
}

export const MedicalAssessmentTableRow: FC<PropsType> = ({
  data,
  updateData,
}) => {
  const bgColor =
    !data?.medicalStatus && !data?.testStatus
      ? "" // just submitted
      : data?.medicalStatus === "COMPLETED" &&
        (data?.testStatus === "COMPLETED" || data?.testStatus === "NA")
        ? "bg-green-50"
        : data?.medicalStatus === "COMPLETED" && data?.testStatus === "PENDING"
          ? "bg-yellow-50"
          : "";

  return (
    <>
      <td
        className={`p-4 border-b border-blue-gray-50 sticky left-0 z-0 bg-grey`}
      >
        <p className="text-xs">{data?.ID}</p>
      </td>

      <td className={`p-4 border-b border-blue-gray-50 `}>
        <p className="text-xs">{data?.Name}</p>
      </td>

      <td className={`p-4 border-b border-blue-gray-50 `}>
        <p className="text-xs">{data?.Mobile}</p>
      </td>

      <td className={`p-4 border-b border-blue-gray-50 `}>
        <p className="text-xs">{data?.Email}</p>
      </td>
      <td className={`p-4 border-b border-blue-gray-50 `}>
        <p className="text-xs">{data?.Email}</p>
      </td>

    </>
  );
};
