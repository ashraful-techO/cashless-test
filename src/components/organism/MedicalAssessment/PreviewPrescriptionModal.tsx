"use client";

import { FC } from "react";
import { ReusableModal } from "@/components/molecules";
import { Button } from "@material-tailwind/react";

interface Complaint {
  complaint: string;
  time?: string;
  selectTime?: string;
}

interface Prescription {
  medicine: string;
  dose: string;
  quantity?: number | string;
  duration?: string;
  selectTime1?: string;
  whenToTake?: string;
}

interface PreviewProps {
  open: boolean;
  close: () => void;
  id: string;
  name: string;
  department: string;
  complaintsList: Complaint[];
  prescribedList: Prescription[];
}

export const PreviewPrescriptionModal: FC<PreviewProps> = ({
  open,
  close,
  id,
  name,
  department,
  complaintsList,
  prescribedList,
}) => {
  return (
    <ReusableModal onOpen={open} onClose={close}>
      <div className="p-6 bg-white rounded-md w-[700px] max-h-[90vh] overflow-y-auto shadow-xl">
        <h2 className="text-xl font-bold mb-4 text-center">
          Prescription Preview
        </h2>

        {/* Patient Info */}
        <div className="border p-4 rounded mb-4">
          <h3 className="font-semibold text-lg mb-2">Patient Information</h3>
          <p>
            <strong>ID:</strong> {id}
          </p>
          <p>
            <strong>Name:</strong> {name}
          </p>
          <p>
            <strong>Department:</strong> {department}
          </p>
        </div>

        {/* Complaints */}
        {complaintsList.length > 0 && (
          <div className="border p-4 rounded mb-4">
            <h3 className="font-semibold text-lg mb-2">Complaints</h3>
            {complaintsList.map((c, i) => (
              <p key={i}>
                • {c.complaint}{" "}
                {c.time && <span className="text-sm">— {c.time}</span>}{" "}
                {c.selectTime && (
                  <span className="text-sm">({c.selectTime})</span>
                )}
              </p>
            ))}
          </div>
        )}

        {/* Prescriptions */}
        {prescribedList.length > 0 && (
          <div className="border p-4 rounded mb-4">
            <h3 className="font-semibold text-lg mb-2">Prescribed Medicines</h3>
            {prescribedList.map((p, i) => (
              <div key={i} className="mb-3">
                <p className="text-sm">
                  <strong>{p.medicine}</strong> {p.dose && <>— {p.dose}</>}{" "}
                  {p.quantity !== undefined && <>— Qty: {p.quantity}</>}{" "}
                  {p.duration && <>— Duration: {p.duration}</>}{" "}
                  {p.selectTime1 && <>— {p.selectTime1}</>}{" "}
                  {p.whenToTake && <>— {p.whenToTake}</>}
                </p>
              </div>
            ))}
          </div>
        )}

        <div className="flex justify-end mt-4">
          <Button className="bg-primary" onClick={close}>
            Close Preview
          </Button>
        </div>
      </div>
    </ReusableModal>
  );
};
