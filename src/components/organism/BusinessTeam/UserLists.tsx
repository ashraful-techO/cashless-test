import { Pagination, ReusableTable } from "@/components/molecules";
import { IAllAppoinmentdata } from "@/libs/api/interface/assuarace";
import { FC } from "react";
import { UserListTableRow } from "./UserListTableRow";

interface PropsType {
  data: IAllAppoinmentdata | null;
  loading: boolean;
  updateData: () => Promise<void>;
  setSelectData: any;
}

const ClientTableHeader: string[] = [
  "SN",
  "Agent Code",
  "Agent Name",
  "Agent Mobile",
  "Br. Manager Name",
  "Br. Manager Mobile",
  "Unit Manager Name",
  "Unit Manager Mobile",
  "Policy No.",
  "Name",
  "Phone No.",
  "Gender",
  "Address",
  "Applicant's Type",
  "Required Medical",
  "Medical Info",
  "Medical Schedule Date",
  "Required Lab test",
  "Medical Type",
  "Required Other test",
  "Lab Test Schedule Date",
  "Diagnostic Center Info",
  "Medical Status",
  "Lab Test Status",
  "User Screen Shot",
  "Medical Asses. Scan",
  "Diagnostic Report",
  "Overall Status",
  "Comments",
  "Action",
];

export const UserLists: FC<PropsType> = ({
  data,
  loading,
  updateData,
  setSelectData,
}) => {
  return (
    <div className="bg-default p-6 mt-6">
      <div className="border">
        <ReusableTable
          tableHeader={ClientTableHeader}
          isLoading={loading}
          data={data?.items}
        >
          {data?.items?.map((el, i) => (
            <tr
              key={i}
              className="cursor-pointer hover:bg-gray-100"
              onClick={() => setSelectData(el)}
            >
              <UserListTableRow
                data={el}
                updateData={updateData}
                slNo={i + 1}
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
