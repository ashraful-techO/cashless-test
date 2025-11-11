import { Pagination, ReusableTable } from "@/components/molecules";
import {
  Appoinmentdata,
  IAllAppoinmentdata,
} from "@/libs/api/interface/assuarace";
import { FC } from "react";
import { MedicalAssessmentTableRow } from "./MedicalAssessmentTableRow";

interface PropsType {
  data: IAllAppoinmentdata | null;
  loading: boolean;
  selectdata: Appoinmentdata | null;
  setSelectData: (data: Appoinmentdata | null) => void;
  updateData: () => Promise<void>;
}

const ClientTableHeader: string[] = [
  "ID",
  "Name",
  "Mobile",
  "Email",
  "Department",
  "Previous Prescription",
  "Prescription", // keep header if you want column, otherwise remove
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
            <tr key={i} className="hover:bg-gray-100 cursor-pointer">
              {/* Render the row data including Prescription button */}
              <MedicalAssessmentTableRow
                data={el}
                updateData={updateData}
                onPrescriptionClick={(rowData) => setSelectData(rowData)}
              />
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
