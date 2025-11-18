"use client";

import { useEffect, useState, useMemo } from "react";
import { assuranceAPI } from "@/libs/api";
import { Appoinmentdata } from "@/libs/api/interface/assuarace";
import { FormInputSelect, IItems } from "@/components/atomic";
import { SearchInput } from "@/components/molecules/SearchInput";
import ExportButton from "@/components/molecules/ExportButton";
import ResetButton from "@/components/molecules/ResetButton";
import { useSelector } from "react-redux";
import { getUserState } from "@/store/actions";

export const AllAppointmentsList = () => {
  const [appointments, setAppointments] = useState<Appoinmentdata[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { userData } = useSelector(getUserState);

  // ---------------- Search & Filter ----------------
  const [searchText, setSearchText] = useState("");
  const [filterDoctor, setFilterDoctor] = useState("");

  // =============================
  // 1) Fetch only doctor’s appointments
  // =============================
useEffect(() => {
  const fetchAppointments = async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await assuranceAPI.getAllAppointments();

      const normalized: Appoinmentdata[] = Array.isArray(res.data)
        ? res.data
        : res.data?.appointments ?? [];

      setAppointments(normalized);
    } catch (err: any) {
      setError(err.message || "Failed to fetch appointments");
    } finally {
      setLoading(false);
    }
  };

  fetchAppointments();
}, []);


  // =============================
  // 2) Only search filter (NO doctor filter anymore)
  // =============================
  const filteredAppointments = useMemo(() => {
    return appointments.filter((app) => {
      return (
        app.employeeName?.toLowerCase().includes(searchText.toLowerCase()) ||
        app.employeeId?.toLowerCase().includes(searchText.toLowerCase()) ||
        app.employeeDepartment?.toLowerCase().includes(searchText.toLowerCase())
      );
    });
  }, [appointments, searchText]);

  // ---------------- Unique doctor list for filter ----------------
  const doctorOptions: IItems[] = Array.from(
    new Set(appointments.map((app) => app.doctorName).filter(Boolean))
  ).map((doc) => ({ label: doc, value: doc }));

  // ---------------- Reset Function ----------------
  const handleReset = () => {
    setSearchText("");
  };

  return (
    <div className="p-4 bg-white rounded shadow">
      <h2 className="text-xs font-bold mb-4">All Appointments</h2>

      {/* Search, Filter, Export, Reset */}
      <div className="flex items-center gap-4 mb-4">

        <div className="w-[350px]">
          <SearchInput
            searchKey="search"
            placeholder="Search by name, ID, department..."
            bgColor
            onChange={(val) => setSearchText(val)}
          />
        </div>


        <div className="h-20">
          <ExportButton />
        </div>
      </div>

      {/* Table */}
      {loading && <p className="text-xs">Loading appointments...</p>}
      {error && <p className="text-red-500 text-xs">{error}</p>}

      {!loading && !error && (
        <div className="overflow-x-auto max-h-[600px]">
          <table className="min-w-full border text-xs">
            <thead>
              <tr>
                <th className="p-2 border text-xs sticky top-0 bg-white z-10">
                  Sl No
                </th>
                <th className="p-2 border text-xs sticky top-0 bg-white z-10">
                  Employee ID
                </th>
                <th className="p-2 border text-xs sticky top-0 bg-white z-10">
                  Name
                </th>
                <th className="p-2 border text-xs sticky top-0 bg-white z-10">
                  Department
                </th>
                {/* <th className="p-2 border text-xs sticky top-0 bg-white z-10">
                  Doctor Name
                </th> */}
                <th className="p-2 border text-xs sticky top-0 bg-white z-10">
                  Complaints
                </th>
                <th className="p-2 border text-xs sticky top-0 bg-white z-10">
                  Medicine name
                </th>
                <th className="p-2 border text-xs sticky top-0 bg-white z-10">
                  Qty
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredAppointments.map((app, i) => (
                <tr key={app.id || i} className="hover:bg-gray-50">
                  <td className="p-2 border">{i + 1}</td>
                  <td className="p-2 border">{app.employeeId}</td>
                  <td className="p-2 border">{app.employeeName || "-"}</td>
                  <td className="p-2 border">
                    {app.employeeDepartment || "-"}
                  </td>
                  {/* <td className="p-2 border">{app.doctorName || "-"}</td> */}
                  <td className="p-2 border">
                    {Array.isArray(app.complaints) && app.complaints.length > 0
                      ? app.complaints.map((comp, idx) => (
                          <div key={idx}>• {comp}</div>
                        ))
                      : "-"}
                  </td>
                  <td className="p-2 border">
                    {Array.isArray(app.medicines) && app.medicines.length > 0
                      ? app.medicines.map((med, idx) => (
                          <div key={idx}>• {med.name}</div>
                        ))
                      : "-"}
                  </td>
                  <td className="p-2 border">
                    {Array.isArray(app.medicines) && app.medicines.length > 0
                      ? app.medicines.map((med, idx) => (
                          <div key={idx}>{med.quantity}</div>
                        ))
                      : "-"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
