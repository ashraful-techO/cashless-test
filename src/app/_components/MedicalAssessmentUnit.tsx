"use client";

import {
  MedicalAssessmentLists,
  MedicalAssessmentModal,
} from "@/components/organism/MedicalAssessment";
import { PrescriptionModal } from "@/components/organism/MedicalAssessment/PrescriptionModal";
import { assuranceAPI } from "@/libs/api";
import { IAllAppoinmentdata } from "@/libs/api/interface/assuarace";
import { mockUserInfoWrapper } from "@/mock/mockUserInfoWrapper";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const USE_MOCK_DATA = true;

export const MedicalAssessmentUnit = () => {
  const [tableDataLoading, setTableDataLoading] = useState(false);
  const [tableData, setTableData] = useState<IAllAppoinmentdata | null>(null);
  const [selectdata, setSelectData] = useState<any>(null);

  const searchParams = useSearchParams();
  const query = Object.fromEntries(searchParams.entries());

  const { csAppointmentStatus, medicalStatus, status, page, search } = query;

  const getTableData = async () => {
    if (!query?.medicalStatus) {
      query.medicalStatus = "PENDING";
      query.csAppointmentStatus = "COMPLETED";
      query.isRequiredMedical = "true";
    }
    // if (!query?.csAppointmentStatus)

  setTableDataLoading(true);
 
   try {
     if (USE_MOCK_DATA) {
       await new Promise((r) => setTimeout(r, 400)); // simulate delay
       setTableData(mockUserInfoWrapper);
     } else {
       const { success, data } = await assuranceAPI.getAppoinmentData(query);
       if (success) setTableData(data);
     }
   } catch (err) {
     console.log(err);
   } finally {
     setTableDataLoading(false);
   }
 };
 

  useEffect(() => {
    getTableData();
  }, [csAppointmentStatus, medicalStatus, status, page, search]);

  return (
    <div className="mt-[-60px]">
      {/* <MedicalAssessmentFilter /> */}

      <MedicalAssessmentLists
        data={tableData as any}
        loading={tableDataLoading}
        selectdata={selectdata}
        setSelectData={setSelectData}
        updateData={getTableData}
      />

      

     {/* <h1>hello from medical assesment unit</h1> */}
    </div>
  );
};
