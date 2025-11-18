"use client";

import { FC, useEffect, useState } from "react";
import { Appoinmentdata } from "@/libs/api/interface/assuarace";
import { assuranceAPI } from "@/libs/api";

interface PropsType {
  isOpen: boolean;
  onClose: () => void;
}

export const AppoinmentListModal: FC<PropsType> = ({ isOpen, onClose }) => {
  const [appointments, setAppointments] = useState<Appoinmentdata[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isOpen) return;

    const fetchAppointments = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await assuranceAPI.getAllAppointments();

        const normalized: Appoinmentdata[] = Array.isArray(res.data)
          ? (res.data as Appoinmentdata[])
          : res.data && Array.isArray((res.data as any).appointments)
          ? ((res.data as any).appointments as Appoinmentdata[])
          : [];

        setAppointments(normalized);
        console.log("Fetched appointments:", normalized);
      } catch (err: any) {
        setError(err.message || "Failed to fetch appointments");
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-start pt-20">
      <div className="bg-white w-[90%] max-w-5xl rounded-md shadow-lg p-4 relative">
        <button
          className="absolute top-2 right-2 px-2 py-1 text-white bg-red-600 rounded"
          onClick={onClose}
        >
          Close
        </button>

        <h2 className="text-xl font-bold mb-4">All Appointments</h2>

        {loading && <p>Loading appointments...</p>}
        {error && <p className="text-red-500">{error}</p>}

        {!loading && !error && (
          <div className="overflow-x-auto max-h-[500px]">
            <table className="min-w-full border">
              <thead>
                <tr>
                  <th className="p-2 border">Sl No</th>
                  <th className="p-2 border">Employee ID</th>
                  <th className="p-2 border">Name</th>
                  <th className="p-2 border">Department</th>
                  <th className="p-2 border">Doctor Name</th>
                </tr>
              </thead>
              <tbody>
                {appointments.map((app, i) => (
                  <tr key={app.id || i} className="hover:bg-gray-50">
                    <td className="p-2 border">{i + 1}</td>
                    <td className="p-2 border">{app.employeeId}</td>
                    <td className="p-2 border">{app.employeeName || "-"}</td>
                    <td className="p-2 border">
                      {app.employeeDepartment || "-"}
                    </td>
                    <td className="p-2 border">{app.doctorName || "-"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
