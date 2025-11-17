"use client";

import React, { FC } from "react";

interface PrescriptionPreviewProps {
  id: string;
  name: string;
  department: string;
  complaintsList: { complaint: string; time: string; selectTime: string }[];
  historyList: string[];
  drugList: string[];
  prescribedList: {
    medicine: string;
    dose: string;
    duration: string;
    whenToTake: string;
    notes: string;
  }[];
}

export const PrescriptionPreview: FC<PrescriptionPreviewProps> = ({
  id,
  name,
  department,
  complaintsList,
  historyList,
  drugList,
  prescribedList,
}) => {
  return (
    <div className="border p-4 rounded bg-gray-50">
      {/* Patient Info */}
      <div className="mb-4">
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
        <div className="mb-4">
          <h4 className="font-semibold">Complaints</h4>
          <ul className="list-disc list-inside">
            {complaintsList.map((c, i) => (
              <li key={i}>
                {c.complaint} - {c.time} - {c.selectTime}
              </li>
            ))}
          </ul>
        </div>
      )}


      {/* Drug History */}
      {drugList.length > 0 && (
        <div className="mb-4">
          <h4 className="font-semibold">Drug History</h4>
          <ul className="list-disc list-inside">
            {drugList.map((d, i) => (
              <li key={i}>{d}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Prescribed Medicines */}
      {prescribedList.length > 0 && (
        <div className="mb-4">
          <h4 className="font-semibold">Prescribed Medicines</h4>
          <table className="w-full border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border p-2 text-left">Medicine</th>
                <th className="border p-2 text-left">Dose</th>
                <th className="border p-2 text-left">Duration</th>
                <th className="border p-2 text-left">When to Take</th>
                <th className="border p-2 text-left">Notes</th>
              </tr>
            </thead>
            <tbody>
              {prescribedList.map((p, i) => (
                <tr key={i}>
                  <td className="border p-2">{p.medicine}</td>
                  <td className="border p-2">{p.dose}</td>
                  <td className="border p-2">{p.duration}</td>
                  <td className="border p-2">{p.whenToTake}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
