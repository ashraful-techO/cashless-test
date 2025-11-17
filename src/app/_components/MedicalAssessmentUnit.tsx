"use client";

import {
  MedicalAssessmentLists,
} from "@/components/organism/MedicalAssessment";
import { IAllAppoinmentdata } from "@/libs/api/interface/assuarace";

import { useEffect, useState } from "react";



export const MedicalAssessmentUnit = () => {
  const [tableDataLoading, setTableDataLoading] = useState(false);
  const [tableData, setTableData] = useState<IAllAppoinmentdata | null>(null);
  const [selectdata, setSelectData] = useState<any>(null);

  return (
    <div className="mt-[-60px]">
      {/* <MedicalAssessmentFilter /> */}

      <MedicalAssessmentLists
        data={tableData as any}
        loading={tableDataLoading}
        selectdata={selectdata}
        setSelectData={setSelectData}
        updateData={setTableData}
      />

    </div>
  );
};
