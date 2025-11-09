import { Pagination, ReusableTable } from "@/components/molecules";
import { FC, useState } from "react";
import {
  IAllAppoinmentdata,
  Appoinmentdata,
} from "@/libs/api/interface/assuarace";
import { UserListTableRow } from "./UserListTableRow";

interface PropsType {
  data: IAllAppoinmentdata | null;
  loading: boolean;
  updateData: () => Promise<void>;
  setSelectData: (data: Appoinmentdata) => void; // Function to send selected row to parent
}

const ClientTableHeader: string[] = [
  "User ID",
  "Name",
  "Email",
  "Mobile",
  "Department",
];

export const UserLists: FC<PropsType> = ({
  data,
  loading,
  updateData,
  setSelectData,
}) => {
  const [selectedRowIndex, setSelectedRowIndex] = useState<number | null>(null);

  const handlePolicyClick = (rowData: Appoinmentdata, index: number) => {
    setSelectedRowIndex(index); // highlight row
    setSelectData(rowData); // send data to parent
  };

  return (
    <div className="bg-default p-6 mt-7">
      <div className="border">
        <ReusableTable
          tableHeader={ClientTableHeader}
          isLoading={loading}
          data={data?.items}
        >
          {data?.items?.map((el, i) => (
            <tr
              key={i}
              className={`cursor-pointer hover:bg-gray-200 ${
                selectedRowIndex === i ? "bg-blue-100" : ""
              }`}
            >
              <UserListTableRow
                data={el}
                updateData={updateData}
                slNo={i + 1}
                onPolicyClick={() => handlePolicyClick(el, i)} // ✅ Only for Policy Number
              />
            </tr>
          ))}
        </ReusableTable>
      </div>

      {data && !loading && (
        <Pagination
          totalCount={data.total}
          totalPages={data.totalPages}
          currentPage={data.pageNumber}
        />
      )}
    </div>
  );
};
