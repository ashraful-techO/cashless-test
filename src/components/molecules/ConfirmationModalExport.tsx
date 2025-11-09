import { Button, Typography } from "@material-tailwind/react";
import { FC } from "react";
import { ReusableModal } from "./ReusableModal";
import { assuranceAPI } from "@/libs/api";
import { useSearchParams } from "next/navigation";
import * as XLSX from "xlsx";

interface PropsType {
  open: boolean;
  close: () => void;
  exportFunction: () => Promise<void>; // ✅ Added this
}

export const ConfirmationModalExport: FC<PropsType> = ({
  open,
  close,
  exportFunction,
}) => {
  const searchParams = useSearchParams();
  const query = Object.fromEntries(searchParams.entries());

  // const { page, csAppointmentStatus, fromDate, toDate, search } = query;
  //
  // const getTableDataExport = async () => {
  //   if (!query?.csAppointmentStatus) query.csAppointmentStatus = "PENDING";

  //   try {
  //     const { success, data, message } = await assuranceAPI.getExportData(
  //       query
  //     );

  //     if (success) {
  //     }
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  // useEffect(() => {
  //   getTableDataExport();
  // }, [page, csAppointmentStatus, fromDate, toDate, search]);

  const handleDownload = async () => {
    try {
      const res: any = await assuranceAPI.getExportData(query);
      const items = res?.data?.items || []; // <-- Correct path
      if (items.length === 0) {
        alert("No data available to export.");
        return;
      }
      // Convert JSON → worksheet
      const worksheet = XLSX.utils.json_to_sheet(items);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Export");

      // Generate blob
      const excelBuffer = XLSX.write(workbook, {
        bookType: "xlsx",
        type: "array",
      });
      const blob = new Blob([excelBuffer], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });

      // Trigger download
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "exported_data.xlsx");
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
      close();
    } catch (err) {
      console.error(err);
      alert("Something went wrong while exporting.");
    }
  };

  return (
    <ReusableModal onOpen={open} onClose={close}>
      <div className="p-6 bg-white w-[300px] rounded-md">
        <Typography variant="h5" className="text-center text-secondary">
          Are you sure you want to download?
        </Typography>

        <div className="flex flex-col items-center mt-3 w-full">
          <div className="flex gap-4 w-full">
            <Button
              className="px-8 py-2 w-full rounded"
              fullWidth
              color="gray"
              onClick={close}
            >
              No
            </Button>
            <Button
              className="px-8 py-2 w-full rounded"
              fullWidth
              color="red"
              onClick={handleDownload}
            >
              Yes
            </Button>
          </div>
        </div>
      </div>
    </ReusableModal>
  );
};
