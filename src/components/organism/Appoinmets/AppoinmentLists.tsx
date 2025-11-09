"use client";
import { Pagination, ReusableTable } from "@/components/molecules";
import { IAllAppoinmentdata } from "@/libs/api/interface/assuarace";
import { FC } from "react";
import { AppoinmentTableRow } from "./AppoinmentTableRow";

interface PropsType {
  data: IAllAppoinmentdata | null;
  loading: boolean;
  setSelectData: any;
}
export const AppoinmentLists: FC<PropsType> = ({
  data,
  loading,
  setSelectData,
}) => {
  const ClientTableHeader: string[] = [
    "Policy No.",
    "Phone No.",
    "Name",
    "Gender",
    "Address",
    "Agent Name",
    "Agent Mobile",
    "Unit Manager Name",
    "Unit Manager Mobile",
    "Br. Manager Name",
    "Br. Manager Mobile",
    "Applicant's Type",
    "Required Medical",
    "Medical Info",
    "Required Lab test",
    "Required Other test",
    "Diagnostic Center Info",
    "Medical Schedule Date",
    "Medical Status",
    "Lab Test Schedule Date",
    "Lab Test Status",
    // "Medical Screen Shot",
    // "Medical Document",
    // "Diagnostic Report",
    // "Submission Date",
    // "Overall Status",
    // "Payment Status",
    "Sms Status",
    "Comments",
    // "Action",
  ];

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
              <AppoinmentTableRow data={el} />
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
