import { ChipByStatus } from "@/components/molecules";
import { Appoinmentdata } from "@/libs/api/interface/assuarace";
import { Button } from "@material-tailwind/react";
import { FC } from "react";

interface PropsType {
  data: Appoinmentdata;
  updateData: () => Promise<void>;
  onPrescriptionClick: (data: Appoinmentdata) => void; // NEW
}

export const MedicalAssessmentTableRow: FC<PropsType> = ({
  data,
  updateData,
  onPrescriptionClick, // NEW
}) => {
  const bgColor =
    !data?.medicalStatus && !data?.testStatus
      ? ""
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
        <p className="text-xs">{data?.Department}</p>
      </td>

      <td className={`p-4 border-b border-blue-gray-50 `}>
        <p className="text-xs">{data?.Email}</p>
      </td>


      {/* Prescription Button */}
      <td className={`p-4 border-b border-blue-gray-50`}>
        <Button
          className="bg-primary text-white px-3 py-1 rounded"
          onClick={(e) => {
            e.stopPropagation(); // prevent row click
            onPrescriptionClick(data); // pass row data
          }}
        >
          Prescription
        </Button>
      </td>
    </>
  );
};
