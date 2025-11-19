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

  const [status, setStatus] = useState("");

  // Sync local state when URL changes
  useEffect(() => {
    const deliveryStatus = searchParams.get("status") || "";
    setStatus(deliveryStatus);

    // console.log({ deliveryStatus });
  }, [searchParams]);

  const handleChange = (key: "status", value: string) => {
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
        <label className="block text-sm font-medium mb-1">Status</label>
        <select
          value={status}
          onChange={(e) => handleChange("status", e.target.value)}
          className="border rounded px-3 py-2 text-sm"
        >
          <option value="">Select</option>
          <option value="PENDING">PENDING</option>

          <option value="COMPLETED">COMPLETED</option>
          <option value="POSTPONED">POSTPONED</option>
          <option value="CANCELLED">CANCELLED</option>
        </select>
      </div>
    </>
  );
}
