import { Button } from "@material-tailwind/react";
import React, { useState } from "react";
import { ConfirmationModalExport } from "./ConfirmationModalExport";

const ExportButton: React.FC = () => {
  const [exportModalOpen, setExportModalOpen] = useState(false);

  // Export Data
  const exportData = async () => {
    try {
      // const response = await fetch("/api/appointments/export"); //export API

      const response = await fetch("appointments/export");
      if (!response.ok) throw new Error("Export failed");

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
      link.download = `export_${timestamp}.xlsx`; // Adjust extension as needed
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      // Close modal after successful export
      setExportModalOpen(false);
    } catch (err) {
      console.error("Export Error:", err);
      alert("Failed to export data. Please try again.");
    }
  };

  return (
    <>
      <Button
        type="button"
        className="bg-secondary text-white shadow-none text-[12px] hover:shadow-none mt-5 py-2 px-2 whitespace-nowrap btn-no-ripple-effect no-overflow"
        onClick={() => setExportModalOpen(true)}
      >
        Export
      </Button>

      <ConfirmationModalExport
        open={exportModalOpen}
        close={() => setExportModalOpen(false)}
        exportFunction={exportData}
      />
    </>
  );
};

export default ExportButton;
