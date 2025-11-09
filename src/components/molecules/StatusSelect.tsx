import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useSelector } from "react-redux";
import { getUserState } from "@/store/actions";

export default function StatusSelect() {
  const router = useRouter();
  const { userData } = useSelector(getUserState);
  const searchParams = useSearchParams();

  const userType = userData?.userType ? userData.userType : "B2B_USER";

  const isMetlifeUser = userData?.userType === "Metlife";
  const isBusinessUser = userData?.userType === "Business";
  const isCallCenterUser = userData?.userType === "CallCenter";
  const isMedicalUser = userData?.userType === "Doctor";

  const [medicalStatus, setMedicalStatus] = useState("");
  const [testStatus, setTestStatus] = useState("");

  // Sync local state when URL changes
  useEffect(() => {
    const mStatus = searchParams.get("medicalStatus") || "";
    const tStatus = searchParams.get("testStatus") || "";
    setMedicalStatus(mStatus);
    setTestStatus(tStatus);
  }, [searchParams]);

  const handleChange = (key: "medicalStatus" | "testStatus", value: string) => {
    const newQuery = new URLSearchParams(searchParams.toString());

    if (value) {
      newQuery.set(key, value);
    } else {
      newQuery.delete(key);
    }
    newQuery.set("page", "1");

    router.push(`?${newQuery.toString()}`);
    router.refresh();
  };

  return (
    <>
      <div>
        <label className="block text-sm font-medium mb-1">Medical Status</label>
        <select
          value={medicalStatus}
          onChange={(e) => handleChange("medicalStatus", e.target.value)}
          className="border rounded px-3 py-2 text-sm"
        >
          <option value="">Select</option>
          <option value="NA">N/A</option>
          <option value="PENDING">PENDING</option>

          <option value="COMPLETED">COMPLETED</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Test Status</label>
        <select
          value={testStatus}
          onChange={(e) => handleChange("testStatus", e.target.value)}
          className="border rounded px-3 py-2 text-sm"
        >
          <option value="">Select</option>
          <option value="NA">N/A</option>
          <option value="PENDING">PENDING</option>

          <option value="COMPLETED">COMPLETED</option>
        </select>
      </div>
    </>
  );
}
