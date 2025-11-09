import { ChipByStatus } from "@/components/molecules";
import { Appoinmentdata } from "@/libs/api/interface/assuarace";
import { formatStatus } from "@/utils/helpers/format.helpers";
import dateformat from "dateformat";
import { FC } from "react";

interface PropsType {
  data: Appoinmentdata;
}
export const AppoinmentTableRow: FC<PropsType> = ({ data }) => {

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
        className={`p-4 border-b border-blue-gray-50 sticky left-0 z-0 bg-white`}
      >
        <p className="text-xs">{data?.policyNumber}</p>
      </td>

      <td className={`p-4 border-b border-blue-gray-50 ${bgColor}`}>
        <p className="text-xs">{data?.mobile}</p>
      </td>

      <td className={`p-4 border-b border-blue-gray-50 ${bgColor}`}>
        <p className="text-xs">{data?.policyOwnerName}</p>
      </td>

      <td className={`p-4 border-b border-blue-gray-50 ${bgColor}`}>
        <p className="text-xs">{data?.gender}</p>
      </td>



      <td className={`p-4 border-b border-blue-gray-50 ${bgColor}`}>
        <p className="w-28 line-clamp-1 text-xs">{data?.address}</p>
      </td>

      <td className={`p-4 border-b border-blue-gray-50 ${bgColor}`}>
        <p className="w-28 line-clamp-1 text-xs">{data?.agentName}</p>
      </td>

      <td className={`p-4 border-b border-blue-gray-50 ${bgColor}`}>
        <p className="w-28 line-clamp-1 text-xs">{data?.agentMobile}</p>
      </td>

      <td className={`p-4 border-b border-blue-gray-50 ${bgColor}`}>
        <p className="w-28 line-clamp-1 text-xs">{data?.unitManagerName}</p>
      </td>

      <td className={`p-4 border-b border-blue-gray-50 ${bgColor}`}>
        <p className="w-28 line-clamp-1 text-xs">{data?.unitManagerMobile}</p>
      </td>

      <td className={`p-4 border-b border-blue-gray-50 ${bgColor}`}>
        <p className="w-28 line-clamp-1 text-xs">{data?.branchManagerName}</p>
      </td>

      <td className={`p-4 border-b border-blue-gray-50 ${bgColor}`}>
        <p className="w-28 line-clamp-1 text-xs">{data?.branchManagerMobile}</p>
      </td>

      <td className={`p-4 border-b border-blue-gray-50 ${bgColor}`}>
        <p className="text-xs">{formatStatus(data?.applicantsType)}</p>
      </td>

      <td className={`p-4 border-b border-blue-gray-50 ${bgColor}`}>
        <p className="text-xs w-28 line-clamp-1">
          {data?.isRequiredMedical ? "Yes" : "No"}
        </p>
      </td>

            <td className={`p-4 border-b border-blue-gray-50 ${bgColor}`}>
        <p className="text-xs">{data?.medicalInfo}</p>
      </td>

      <td className={`p-4 border-b border-blue-gray-50 ${bgColor}`}>
        <p className="text-xs w-28 line-clamp-1">{data?.requiredTest}</p>
      </td>

      <td className={`p-4 border-b border-blue-gray-50 ${bgColor}`}>
        <p className="text-xs w-28 line-clamp-1">{data?.requiredOtherTest}</p>
      </td>

      <td className={`p-4 border-b border-blue-gray-50 ${bgColor}`}>
        <p className="text-xs truncate overflow-hidden whitespace-nowrap max-w-[150px]"  title={data?.diagnosticInfo}>{data?.diagnosticInfo}</p>
      </td>

      <td className={`p-4 border-b border-blue-gray-50 ${bgColor}`}>
        <p className="text-xs">
          {data?.medicalAppointmentDate &&
            dateformat(
              data?.medicalAppointmentDate,
              "UTC:mmmm dd, yyyy,  h:MM TT"
            )}
        </p>
      </td>

      <td className={`p-4 border-b border-blue-gray-50 ${bgColor}`}>
        <p className="text-xs">
          {data?.medicalStatus && (
            <ChipByStatus
              status={data?.medicalStatus as any}
              label={formatStatus(data?.medicalStatus)}
            />
          )}
        </p>
      </td>

      <td className={`p-4 border-b border-blue-gray-50 ${bgColor}`}>
        <p className="text-xs">
          {data?.testAppointmentDate &&
            dateformat(
              data?.testAppointmentDate,
              "UTC:mmmm dd, yyyy,  h:MM TT"
            )}
        </p>
      </td>

      <td className={`p-4 border-b border-blue-gray-50 ${bgColor}`}>
        <p className="text-xs">
          {data?.testStatus && (
            <ChipByStatus
              status={data?.testStatus as any}
              label={formatStatus(data?.testStatus)}
            />
          )}
        </p>
      </td>

      <td className={`p-4 border-b border-blue-gray-50 ${bgColor}`}>
        <p className="text-xs">
          {data?.testStatus && (
            <ChipByStatus
              status={String(data?.isSMSSent ? "ACTIVE" : "BLOCKED") as any}
              label={formatStatus(
                String(data?.isSMSSent ? "SENT" : "NOT_SENT") as any
              )}
            />
          )}
        </p>
      </td>

      <td className={`p-4 border-b border-blue-gray-50 ${bgColor}`}>
        <p className="text-xs truncate overflow-hidden whitespace-nowrap max-w-[150px]"  title={data?.comment}>{data?.comment}</p>
      </td>
    </>
  );
};
