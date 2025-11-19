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

export const UserListTableRow: FC<PropsType> = ({ data, slNo }) => {
  return (
    <>
      <td className="p-1 border-b border-blue-gray-50 sticky left-0 z-0 bg-white">
        <p className="text-xs">{slNo}</p>
      </td>

      <td className="p-4 border-b border-blue-gray-50 max-w-[140px] truncate">
        <p className="text-xs truncate">
          {data?.name || data?.employeeName || "-"}
        </p>
      </td>

      <td className="p-4 border-b border-blue-gray-50 max-w-[120px] truncate">
        <p className="text-xs truncate">{data?.employeeId || "-"}</p>
      </td>

      <td className="p-4 border-b border-blue-gray-50 max-w-[140px] truncate">
        <p className="text-xs truncate">{data?.employeeDepartment || "-"}</p>
      </td>

      <td className="p-4 border-b border-blue-gray-50 max-w-[200px]">
        <div className="flex flex-col gap-1">
          {data?.complaints?.length ? (
            data.complaints.map((c: string, i: number) => (
              <div key={i} className="text-xs px-2 py-1 rounded">
                {c}
              </div>
            ))
          ) : (
            <p className="text-xs">-</p>
          )}
        </div>
      </td>

      <td className="p-4 border-b border-blue-gray-50 max-w-[200px]">
        <div className="flex flex-col gap-1">
          {data?.medicines?.length ? (
            data.medicines.map((m: any, i: number) => (
              <div key={i} className="text-xs px-2 py-1 rounded">
                {m.name}
              </div>
            ))
          ) : (
            <p className="text-xs">-</p>
          )}
        </div>
      </td>

      <td className="p-4 border-b border-blue-gray-50 max-w-[80px]">
        <div className="flex flex-col gap-1">
          {data?.medicines?.length ? (
            data.medicines.map((m: any, i: number) => (
              <div key={i} className="text-xs px-2 py-1 rounded">
                {m.quantity}
              </div>
            ))
          ) : (
            <p className="text-xs">-</p>
          )}
        </div>
      </td>

      <td className="p-4 border-b border-blue-gray-50 max-w-[140px] truncate">
        <p className="text-xs truncate">{data?.status || "-"}</p>
      </td>
    </>
  );
};
