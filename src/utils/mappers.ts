import { Appoinmentdata } from "@/libs/api/interface/assuarace";

export const mapBackendToFrontend = (d: any): Appoinmentdata => ({
  id: d.id,
  employeeId: d.employeeId,
  name: d.name || "",
  phone: d.phone || "",
  email: d.email || "",
  department: d.department || "",
  doctorName: d.doctorName || "",
  complaints: d.complaints || [],
  medicines: d.medicines || [],
  createdAt: d.createdAt || "",
  updatedAt: d.updatedAt || "",
  employeeDepartment: "",
  employeeName: ""
});
