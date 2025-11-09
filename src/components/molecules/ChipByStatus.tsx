import { Button } from "@material-tailwind/react";
import { FC } from "react";

export type IStatus =
  | "ALL_CLAIMS"
  | "PAID"
  | "UNPAID"
  | "PENDING"
  | "PROCESSING"
  | "INITIATED"
  | "REJECTED"
  | "SETTLED"
  | "CLOSED"
  | "ACTIVE"
  | "BLOCKED"
  | "AVAILABLE"
  | "UNAVAILABLE"
  | "COMPLETED";

interface PropsType {
  status: IStatus | string;
  label: string;
}

export const ChipByStatus: FC<PropsType> = ({ status, label }) => {
  const colorByStatus: Record<string, string> = {
    ACTIVE: "bg-green-50",
    PAID: "bg-green-50",
    COMPLETED: "bg-green-50",
    AVAILABLE: "bg-green-50",
    ALL_CLAIMS: "bg-green-50",
    INITIATED: "bg-green-50",
    SETTLED: "bg-green-50",
    BLOCKED: "bg-red-50",
    UNAVAILABLE: "bg-red-50",
    PENDING: "bg-red-50",
    PROCESSING: "bg-red-50",
    REJECTED: "bg-red-50",
    CLOSED: "bg-red-50",
    UNPAID: "bg-red-50",
  };

  const textByStatus: Record<string, string> = {
    ACTIVE: "text-green-500",
    PAID: "text-green-500",
    COMPLETED: "text-green-500",
    AVAILABLE: "text-green-500",
    ALL_CLAIMS: "text-green-500",
    INITIATED: "text-green-500",
    SETTLED: "text-green-500",
    BLOCKED: "text-red-500",
    UNAVAILABLE: "text-red-500",
    PENDING: "text-red-500",
    PROCESSING: "text-red-500",
    REJECTED: "text-red-500",
    CLOSED: "text-red-500",
    UNPAID: "text-red-500",
  };

  return (
    <div className="flex justify-center items-center gap-2 w-full">
      <Button
        className={`inline-block rounded-[6px] hover:shadow-none shadow-none normal-case ${colorByStatus[status]} ${textByStatus[status]} px-3 py-1 text-[10px]`}
      >
        {label}
      </Button>
    </div>
  );
};
