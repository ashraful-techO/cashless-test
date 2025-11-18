export interface SidebarItem {
  icon?: any; // make optional
  title: string;
  path: string;
  roles?: string[];
}

export interface SidebarType {
  type: string;
  item: SidebarItem[];
}

export const sidebarItems: SidebarType[] = [
  {
    type: "CallCenter",
    item: [
      { title: "Dashboard", path: "/" },
      { title: "Appointment Booking", path: "/appoinment" },
    ],
  },
  {
    type: "Doctor",
    item: [
      { title: "Appoinments", path: "/medical-appointments" },
      { title: "All Appointments", path: "/doctor-appointments" },
    ],
  },
  {
    type: "Business",
    item: [{ title: "User list", path: "/business-team" }],
  },
  {
    type: "Metlife",
    item: [{ title: "User list", path: "/metlife" }],
  },
];
