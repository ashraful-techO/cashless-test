"use client";

import {
  CreateSingleUser,
  MetlifeFilter,
  UserLists,
} from "@/components/organism/Metlife";
import { BulkUserUploadModal } from "@/components/organism/Metlife/BulkUserUploadModal";
import { UserModal } from "@/components/organism/Metlife/UserModal";
import { assuranceAPI } from "@/libs/api";
import { IAllAppoinmentdata } from "@/libs/api/interface/assuarace";
import { mockUserInfoWrapper } from "@/mock/mockUserInfoWrapper";
import {
  Button,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
} from "@material-tailwind/react";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const USE_MOCK_DATA = true;


export const MetlifeUnit = () => {
  const [tableDataLoading, setTableDataLoading] = useState(false);
  const [tableData, setTableData] = useState<IAllAppoinmentdata | null>(null);
  const [createUserModal, setCreateUserModal] = useState(false);
  const [bulkUserModal, setBulkUserModal] = useState(false);
  const [selectedData, setSelectedData] = useState<any>(null); // <-- Added

  const searchParams = useSearchParams();
  const query = Object.fromEntries(searchParams.entries());

  const { page, fromDate, toDate, search, medicalStatus, testStatus } = query;

  // Function to fetch table data

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
    <div className="mt-[-80px]">
      <div className="flex items-center gap-4">
        {/* You can uncomment MetlifeFilter or Add User Menu here */}
      </div>

      {/* Pass setSelectedData to UserLists */}
      <UserLists
        data={tableData as any}
        loading={tableDataLoading}
        updateData={getTableData}
        setSelectData={setSelectedData} // <-- Fix
      />

      {/* {createUserModal && (
        <CreateSingleUser
          open={createUserModal}
          close={() => setCreateUserModal(false)}
          updateData={getTableData}
        />
      )} */}

      {/* {bulkUserModal && (
        <BulkUserUploadModal
          open={bulkUserModal}
          close={() => setBulkUserModal(false)}
          updateData={getTableData}
        />
      )} */}

      {/* Open modal for selected row */}
      {selectedData && (
        <UserModal
          selectdata={selectedData}
          close={() => setSelectedData(null)}
          updateData={getTableData}
        />
      )}
    </div>
  );
};
