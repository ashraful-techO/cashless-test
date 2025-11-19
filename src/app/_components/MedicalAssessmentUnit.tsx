"use client";

import { useState } from "react";
import { MedicalAppointments } from "@/components/organism/MedicalAssessment";
import { IAllAppoinmentdata } from "@/libs/api/interface/assuarace";

export const MedicalAssessmentUnit = () => {
  const [tableDataLoading, setTableDataLoading] = useState(false);
  const [tableData, setTableData] = useState<IAllAppoinmentdata | null>(null);
  const [selectdata, setSelectData] = useState<any>(null);

  return (
    <div className="flex-1 p-0 mt-0">
      <MedicalAppointments
        data={tableData as any}
        loading={tableDataLoading}
        selectdata={selectdata}
        setSelectData={setSelectData}
      />
    </div>
  );
};
