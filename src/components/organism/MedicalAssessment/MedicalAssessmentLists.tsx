import { Pagination, ReusableTable } from "@/components/molecules";
import {
  Appoinmentdata,
  IAllAppoinmentdata,
} from "@/libs/api/interface/assuarace";
import { FC } from "react";
import { MedicalAssessmentTableRow } from "./MedicalAssessmentTableRow";
import { PrescriptionModal } from "./PrescriptionModal";

interface PropsType {
  data: IAllAppoinmentdata | null;
  loading: boolean;
  selectdata: Appoinmentdata | null; // optional
  setSelectData: (data: Appoinmentdata | null) => void;
  updateData: () => Promise<void>;
}

const ClientTableHeader: string[] = [
  "ID",
  "Name",
  "Mobile",
  "Email",
  "Department",
  "Prescription",
];

export const MedicalAssessmentLists: FC<PropsType> = ({
  data,
  loading,
  selectdata,
  setSelectData,
  updateData,
}) => {
  return (
    <div className="bg-default p-6 mt-6 relative">
      <div className="border">
        <ReusableTable
          tableHeader={ClientTableHeader}
          isLoading={loading}
          data={data?.items}
        >
          {data?.items?.map((el, i) => (
            <tr key={i} className="hover:bg-gray-100">
              {/* Render the row data normally */}
              <MedicalAssessmentTableRow data={el} updateData={updateData} />

              {/* Prescription Column */}
              <td className="px-4 py-2">
                <button
                  className="bg-primary text-white px-3 py-1 rounded"
                  onClick={(e) => {
                    e.stopPropagation(); // prevent any parent row click
                    setSelectData(el); // set the row data for Prescription modal
                  }}
                >
                  Prescription
                </button>
              </td>
            </tr>
          ))}
        </ReusableTable>
      </div>

      {data && !loading && (
        <Pagination
          totalCount={data?.total}
          totalPages={data?.totalPages}
          currentPage={data?.pageNumber}
        />
      )}
    </div>
  );
};
