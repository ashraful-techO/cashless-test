"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { assuranceAPI } from "@/libs/api";
import { AllAppointmentsList } from "@/components/organism/MedicalAssessment/AllAppointmentsList";
import {
  IAllAppoinmentdata,
  Appoinmentdata,
} from "@/libs/api/interface/assuarace";

const MedicalAssessment = () => {
  const { data: session, status } = useSession(); // get session
  const [data, setData] = useState<IAllAppoinmentdata | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectData, setSelectData] = useState<Appoinmentdata | null>(null);

  // Fetch appointments only if user is authenticated
  const fetchAppointments = async () => {
    setLoading(true);
    try {
      const res = await assuranceAPI.getAllAppointments();
      setData(res.data);
    } catch (err) {
      console.error(err);
      setData(null); // optional: clear data on error
    }
    setLoading(false);
  };

  // Fetch when session is authenticated
  useEffect(() => {
    if (status === "authenticated") {
      fetchAppointments();
    }
  }, [status]);

  // Clear local state on logout
  useEffect(() => {
    if (status === "unauthenticated") {
      setData(null);
      setSelectData(null);
    }
  }, [status]);

  if (status === "loading") return <p>Loading session...</p>;

  return (
    <div>
      {/* Your existing logout button stays elsewhere */}

      <AllAppointmentsList
        data={data}
        loading={loading}
        updateData={fetchAppointments}
        setSelectData={setSelectData}
      />
    </div>
  );
};

export default MedicalAssessment;
