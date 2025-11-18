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


interface PropsType {
  slNo: number;
  data: Appoinmentdata;
  updateData: () => Promise<void>;
}

export const UserListTableRow: FC<PropsType> = ({ data, slNo, updateData }) => {


  return (
    <>
      <td
        className={`p-1 border-b border-blue-gray-50 sticky left-0 z-0 bg-white`}
      >
        <p className="text-xs">{slNo}</p>
      </td>

      <td className={`p-4 border-b border-blue-gray-50 `}>
        <p className="text-xs">{formatStatus(data?.agentCode)}</p>
      </td>
      <td className={`p-4 border-b border-blue-gray-50 `}>
        <p className="text-xs">{formatStatus(data?.agentName)}</p>
      </td>
      <td className={`p-4 border-b border-blue-gray-50 `}>
        <p className="text-xs">{formatStatus(data?.agentMobile)}</p>
      </td>
      <td className={`p-4 border-b border-blue-gray-50 `}>
        <p className="text-xs">{formatStatus(data?.branchManagerName)}</p>
      </td>
      <td className={`p-4 border-b border-blue-gray-50 `}>
        <p className="text-xs">{formatStatus(data?.branchManagerMobile)}</p>
      </td>
      <td className={`p-4 border-b border-blue-gray-50 `}>
        <p className="text-xs">{formatStatus(data?.unitManagerName)}</p>
      </td>
      <td className={`p-4 border-b border-blue-gray-50 `}>
        <p className="text-xs">{formatStatus(data?.unitManagerMobile)}</p>
      </td>
    </>
  );
};
