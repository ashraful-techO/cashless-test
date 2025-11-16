"use client";

import { useEffect, useState } from "react";
import { assuranceAPI } from "@/libs/api";

interface Medicine {
  name: string;
  dosage: string;
  quantity: number;
  instructions: string;
}

interface AppointmentData {
  employeeId: string;
  employeeName: string;
  employeeDepartment: string;
  doctorName: string;
  complaints: string[];
  medicines: Medicine[];
  createdAt: string;
  updatedAt: string;
}

interface Props {
  appointmentId: string;
}

export const PreviousAppointment: React.FC<Props> = ({ appointmentId }) => {
  const [appointments, setAppointments] = useState<AppointmentData[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!appointmentId) return;

    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await assuranceAPI.getAppointmentDetailsById(appointmentId);
        console.log("API Response:", res.data);
        if (Array.isArray(res.data)) {
          setAppointments(res.data);
        }
      } catch (err) {
        console.error("Failed to fetch appointment details:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [appointmentId]);

  if (loading) return <div>Loading...</div>;
  if (!appointments.length) return <div>No previous appointments found.</div>;

  return (
    <div className="max-w-5xl mx-auto mt-2 p-3 bg-white rounded-md shadow-md">
      {appointments.map((appt, idx) => (
        <div key={idx} className="mb-6 p-4 border rounded bg-gray-50">
          <p className="text-xs font-semibold mb-1">
            Doctor: {appt.doctorName} —{" "}
            {new Date(appt.createdAt).toLocaleDateString()}
          </p>

          {/* Employee Info in smaller text */}

          {appt.complaints.length > 0 && (
            <>
              <p className="text-xs mt-2 font-semibold">Complaints:</p>
              <ul className="text-xs list-disc list-inside">
                {appt.complaints.map((c, i) => (
                  <li key={i}>{c}</li>
                ))}
              </ul>
            </>
          )}

          {appt.medicines.length > 0 && (
            <>
              <p className="mt-2 font-semibold">Medicines:</p>
              <ul className="text-xs list-disc list-inside">
                {appt.medicines.map((m, i) => (
                  <li key={i}>
                    {m.name} — {m.dosage} — Qty: {m.quantity} — {m.instructions}
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      ))}
    </div>
  );
};
