"use client";

import { FC, useState, useEffect } from "react";
import { PrescriptionFormPage } from "./PrescriptionFormPage";
import { PreviousAppointment } from "./PreviousAppoinment";
import {
  Appoinmentdata,
  IAllAppoinmentdata,
} from "@/libs/api/interface/assuarace";
import { assuranceAPI } from "@/libs/api";
import { mapBackendToFrontend } from "@/utils/mappers";

interface PropsType {
  data: IAllAppoinmentdata | null;
  loading: boolean;
  selectdata: Appoinmentdata;
  setSelectData: (data: Appoinmentdata | null) => void;
  updateData?: () => Promise<void>;
  onIdChange?: (id: string) => void;
}

export const MedicalAssessmentLists: FC<PropsType> = ({
  data,
  loading,
  selectdata,
  setSelectData,
  updateData,
}) => {
  const [appointmentId, setAppointmentId] = useState(selectdata?.id || "");

  // Fetch latest appointment by ID
  useEffect(() => {
    if (!appointmentId) return;

    const fetchAppointment = async () => {
      try {
        const res = await assuranceAPI.getAppointmentById(appointmentId);

        if (res.data && res.data.success) {
          const latest = res.data.data[res.data.data.length - 1];
          const mapped = mapBackendToFrontend(latest);
          setSelectData(mapped);
        } else {
          setSelectData(null);
        }
      } catch (err) {
        console.error("Failed to fetch appointment", err);
        setSelectData(null);
      }
    };

    fetchAppointment();
  }, [appointmentId, setSelectData]);

  return (
    <div className="bg-default p-6 mt-10 relative">
      <div className="grid grid-cols-9 gap-6">
        {/* Left Column */}
        <div className="col-span-6 bg-white p-4 rounded-md shadow-md">
          <h1 className="text-xl font-semibold text-gray-800 mb-6">
            Medical Assessment
          </h1>

          <PrescriptionFormPage
            selectdata={
              selectdata || {
                id: "",
                employeeId: "",
                name: "",
                phone: "",
                email: "",
                department: "",
                doctorName: "",
                complaints: [],
                medicines: [],
                createdAt: "",
                updatedAt: "",
              }
            }
            onIdChange={setAppointmentId}
            updateData={updateData}
          />
        </div>

        {/* Right Column */}
        <div className="col-span-3 bg-white p-4 rounded-md shadow-md">
          <h1 className="text-xl font-semibold text-gray-800 mb-6">
            Previous History
          </h1>

          {appointmentId ? (
            <PreviousAppointment appointmentId={appointmentId} />
          ) : (
            <p className="text-gray-500">Enter an ID to see previous history</p>
          )}
        </div>
      </div>
    </div>
  );
};
