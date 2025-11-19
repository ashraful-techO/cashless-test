"use client";

import { AllAppointmentsList } from "@/components/organism/MedicalAssessment/AllAppointmentsList";
import { assuranceAPI } from "@/libs/api";
import { IAllAppoinmentdata } from "@/libs/api/interface/assuarace";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const AllAppointments = () => {
 const [tableDataLoading, setTableDataLoading] = useState(false);
 const [tableData, setTableData] = useState<IAllAppoinmentdata | null>(null);
 const [selectedData, setSelectedData] = useState<any>(null);

 const searchParams = useSearchParams();
 const query = Object.fromEntries(searchParams.entries());

 const { page, fromDate, toDate, search, medicalStatus, testStatus } = query;

   const getTableData = async () => {
     setTableDataLoading(true);
     // if (!query?.csAppointmentStatus) query.csAppointmentStatus = "PENDING";

     try {
       const { success, data, message } = await assuranceAPI.getAllAppointments(
         query
       );

       if (success) setTableData(data);
     } catch (err) {
       console.log(err);
     } finally {
       setTableDataLoading(false);
     }
   };

   useEffect(() => {
     getTableData();
   }, [page, fromDate, toDate, search, medicalStatus, testStatus]);

  return (
    <div>
      {/* Your existing logout button stays elsewhere */}

      <AllAppointmentsList
        data={tableData as any}
        loading={tableDataLoading}
        updateData={getTableData}
        setSelectData={setSelectedData}
      />
    </div>
  );
};

export default AllAppointments;
