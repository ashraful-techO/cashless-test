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
import { Eye } from "lucide-react";

interface PropsType {
  slNo: number;
  data: Appoinmentdata;
  updateData: () => Promise<void>;
  onPolicyClick?: () => void; // ✅ NEW
}

export const UserListTableRow: FC<PropsType> = ({
  data,
  slNo,
  updateData,
  onPolicyClick, // NEW
}) => {


  // console.log({ data });

  return (
    <>

      {/* <td
        className={`p-4 border-b border-blue-gray-50 sticky left-0 z-20 `}
      >
        <p className="text-sm max-w-[110px]">{slNo}</p>
      </td> */}

      <td
        className={`p-4 border-b border-blue-gray-50 sticky left-0 z-0 bg-white cursor-pointer`}
        onClick={(e) => {
          e.stopPropagation();
          onPolicyClick && onPolicyClick(); // ✅ Only open modal for Policy Number
        }}
      >
        <p className={`text-sm text-blue-600 underline hover:text-blue-800`}>
          {data?.ID}
        </p>
      </td>

      <td className={`p-4 border-b border-blue-gray-50 `}>
        <p className="text-sm max-w-[-5px]">{data?.Name}</p>
      </td>

      <td className={`p-4 border-b border-blue-gray-50 `}>
        <p className="text-sm">{data?.Mobile}</p>
      </td>
      <td className={`p-4 border-b border-blue-gray-50 `}>
        <p className="text-sm">{data?.Email}</p>
      </td>
      <td className={`p-4 border-b border-blue-gray-50 `}>
        <p className="text-sm">{data?.Department}</p>
      </td>

     
    </>
  );
};
