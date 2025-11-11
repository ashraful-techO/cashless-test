"use client";

import { FC } from "react";
import { ReusableModal } from "@/components/molecules";
import { Button } from "@material-tailwind/react";

interface PreviewProps {
  open: boolean;
  close: () => void;

  id: string;
  name: string;
  department: string;

  complaintsList: any[];
  historyList: any[];
  drugList: any[];
  prescribedList: any[];
}

export const PreviewPrescriptionModal: FC<PreviewProps> = ({
  open,
  close,
  id,
  name,
  department,
  complaintsList,
  historyList,
  drugList,
  prescribedList,
}) => {
  return (
    <ReusableModal onOpen={open} onClose={close}>
      <div className="fixed inset-0 z-50 flex items-center justify-center">
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
                  • {c.complaint} — <span className="text-sm">{c.time}</span>{" "}
                  <span className="text-sm">{c.selectTime}</span>
                </p>
              ))}
            </div>
          )}

          {/* History */}
          {historyList.length > 0 && (
            <div className="border p-4 rounded mb-4">
              <h3 className="font-semibold text-lg mb-2">History</h3>
              {historyList.map((h, i) => (
                <p key={i}>• {h.history}</p>
              ))}
            </div>
          )}

          {/* Drug History */}
          {drugList.length > 0 && (
            <div className="border p-4 rounded mb-4">
              <h3 className="font-semibold text-lg mb-2">Drug History</h3>
              {drugList.map((d, i) => (
                <p key={i}>• {d}</p>
              ))}
            </div>
          )}

          {prescribedList.length > 0 && (
            <div className="border p-4 rounded mb-4">
              <h3 className="font-semibold text-lg mb-2">
                Prescribed Medicines
              </h3>

              {prescribedList.map((p, i) => {
                // Normalize customDose to a string
                let finalDose: string;
                if (!p.customDose) {
                  finalDose = p.dose; // fallback to default dose
                } else if (typeof p.customDose === "string") {
                  finalDose = p.customDose;
                } else if (typeof p.customDose === "object") {
                  // For objects coming from select component
                  finalDose = (
                    p.customDose.label ||
                    p.customDose.value ||
                    ""
                  ).toString();
                } else {
                  finalDose = p.dose;
                }

                return (
                  <div key={i} className="mb-3">
                    <p className="text-sm">
                      <strong>{p.medicine}</strong> — {finalDose} / {p.duration}{" "}
                      {p.selectTime1} / {p.whenToTake}
                    </p>

                    {p.notes && (
                      <p className="text-sm italic mt-1">Notes: {p.notes}</p>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          <div className="flex justify-end mt-4">
            <Button className="bg-primary" onClick={close}>
              Close Preview
            </Button>
          </div>
        </div>
      </div>
    </ReusableModal>
  );
};
