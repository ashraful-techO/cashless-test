"use client";

import { FC, useState, useEffect, useRef } from "react";
import { PrescriptionFormPage } from "./PrescriptionFormPage";
import { PreviousAppointment } from "./PreviousAppoinment";
import {
  Appoinmentdata,
  IAllAppoinmentdata,
} from "@/libs/api/interface/assuarace";
import { mapBackendToFrontend } from "@/utils/mappers";
import { AllAppointmentsModal } from "./AppoinmentListModal";


interface PropsType {
  data: IAllAppoinmentdata | null;
  loading: boolean;
  selectdata: Appoinmentdata;
  setSelectData: (data: Appoinmentdata | null) => void;
}

export const MedicalAssessmentLists: FC<PropsType> = ({
  data,
  loading,
  selectdata,
  setSelectData,
}) => {
  const [appointmentId, setAppointmentId] = useState(selectdata?.id || "");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 🟦 Track if this is the first effect run
  const firstRun = useRef(true);

  // Sync state when selectdata.id changes
  useEffect(() => {
    if (selectdata?.id) setAppointmentId(selectdata.id);
  }, [selectdata?.id]);

  // Fetch latest appointment **only after the first run**
  useEffect(() => {
    if (!appointmentId) return;

    if (firstRun.current) {
      firstRun.current = false;
      return;
    }

    const fetchAppointment = async () => {
      try {
        const res = await fetch(
          `/api/appointments/${appointmentId}` // or your API call
        );
        // Map data as needed
      } catch (err) {
        console.error("Failed to fetch appointment", err);
      }
    };

    fetchAppointment();
  }, [appointmentId]);

  return (
    <div className="bg-default p-2 mt-12 relative">
      <div className="grid grid-cols-12 gap-1">
        {/* LEFT */}
        <div className="col-span-9 bg-white p-2 rounded-md shadow-md">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-xl font-semibold text-gray-800 mb-6">
              Medical Appointments
            </h1>
          </div>

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
          />
        </div>

        {/* RIGHT */}
        <div className="col-span-3 bg-white p-2 rounded-md shadow-md flex flex-col">
          <h1 className="text-xl font-semibold text-gray-800 mb-4">
            Previous History
          </h1>

          <div className="flex-1 overflow-y-auto max-h-[600px]">
            {appointmentId ? (
              <PreviousAppointment appointmentId={appointmentId} />
            ) : (
              <p className="text-gray-500">
                Enter an ID to see previous history
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
