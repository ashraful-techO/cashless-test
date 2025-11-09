"use client";

import { FC, useEffect, useState } from "react";
import { ControlerFormSelect, ReusableModal } from "@/components/molecules";
import { FormInput, FormInputSelect, IItems } from "@/components/atomic";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@material-tailwind/react";
import { Appoinmentdata } from "@/libs/api/interface/assuarace";
import React from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

interface PropsType {
  selectdata: Appoinmentdata;
  close: () => void;
  updateData: () => Promise<void>;
}

const timeOptions: IItems[] = [
  { label: "দিন", value: "day" },
  { label: "সপ্তাহ", value: "week" },
  { label: "মাস", value: "month" },
];

export const PrescriptionModal: FC<PropsType> = ({
  selectdata,
  close,
  updateData,
}) => {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [department, setDepartment] = useState("");

  const [complaint, setComplaint] = useState("");
  const [time, setTime] = useState("");
  const [complaintsList, setComplaintsList] = useState<any[]>([]);

  const [history, setHistory] = useState("");
  const [historyList, setHistoryList] = useState<any[]>([]);

  const [drug, setDrug] = useState("");
  const [drugList, setDrugList] = useState<any[]>([]);

  const [medicine, setMedicine] = useState("");
  const [dose, setDose] = useState("");
  const [duration, setDuration] = useState("");
  const [whenToTake, setWhenToTake] = useState("");
  const [notes, setNotes] = useState("");
  const [prescribedList, setPrescribedList] = useState<any[]>([]);
  const [selectedTime, setSelectedTime] = React.useState<string>("");

  useEffect(() => {
    if (selectdata) {
      setId(selectdata.ID || "");
      setName(selectdata.Name || "");
      setDepartment(selectdata.Department || "");
    }
  }, [selectdata]);

  const generatePDF = () => {
    const doc = new jsPDF("p", "mm", "a4");

    // ========== HEADER ==========
    doc.setFont("helvetica", "bold");
    doc.setFontSize(20);
    doc.text("Zaynax", 14, 15);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);
    doc.text("House 7, Road 6, Baridhara, Dhaka", 14, 22);
    doc.text("Hotline: 09600000000 | Email: info@medlife.com", 14, 28);

    // Divider
    doc.setLineWidth(0.5);
    doc.line(14, 32, 196, 32);

    // ========== PATIENT INFO ==========
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.text("Patient Information", 14, 40);

    doc.setFont("helvetica", "normal");
    doc.text(`ID: ${id}`, 14, 48);
    doc.text(`Name: ${name}`, 14, 54);
    doc.text(`Department: ${department}`, 14, 60);
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 150, 48);

    let y = 70;

    // ========== COMPLAINTS ==========
    if (complaintsList.length > 0) {
      doc.setFont("helvetica", "bold");
      doc.text("Complaints", 14, y);
      y += 4;

      autoTable(doc, {
        startY: y,
        head: [["Complaint", "Duration"]],
        body: complaintsList.map((c) => [c.complaint, c.time]),
        styles: { fontSize: 11 },
        headStyles: { fillColor: [0, 102, 204] },
      });

      y = (doc as any).lastAutoTable.finalY + 10;
    }

    // ========== HISTORY ==========
    if (historyList.length > 0) {
      doc.setFont("helvetica", "bold");
      doc.text("Patient History", 14, y);
      y += 4;

      autoTable(doc, {
        startY: y,
        head: [["History"]],
        body: historyList.map((h) => [h.history]),
        styles: { fontSize: 11 },
        headStyles: { fillColor: [0, 102, 204] },
      });

      y = (doc as any).lastAutoTable.finalY + 10;
    }

    // ========== DRUG HISTORY ==========
    if (drugList.length > 0) {
      doc.setFont("helvetica", "bold");
      doc.text("Drug History", 14, y);
      y += 4;

      autoTable(doc, {
        startY: y,
        head: [["Previous Drugs"]],
        body: drugList.map((d) => [d]),
        styles: { fontSize: 11 },
        headStyles: { fillColor: [0, 102, 204] },
      });

      y = (doc as any).lastAutoTable.finalY + 10;
    }

    // ========== PRESCRIPTION ==========
    if (prescribedList.length > 0) {
      doc.setFont("helvetica", "bold");
      doc.text("Prescribed Medicines", 14, y);
      y += 4;

      autoTable(doc, {
        startY: y,
        head: [["Medicine", "Dose", "Duration", "When to Take", "Notes"]],
        body: prescribedList.map((p) => [
          p.medicine,
          p.dose,
          p.duration,
          p.whenToTake,
          p.notes || "",
        ]),
        styles: { fontSize: 11 },
        headStyles: { fillColor: [0, 102, 204] },
      });

      y = (doc as any).lastAutoTable.finalY + 15;
    }

    // ========== SIGNATURE ==========
    doc.setFont("helvetica", "normal");
    doc.text("------------------------------------------------------", 130, y);
    doc.text("Doctor's Signature", 150, y + 6);

    // Save
    doc.save(`Prescription_${id}.pdf`);
  };

  const addComplaint = () => {
    if (!complaint) return;
    setComplaintsList([...complaintsList, { complaint, time }]);
    setComplaint("");
    setTime("");
  };

  const addHistory = () => {
    if (!history) return;
    setHistoryList([...historyList, { history }]);
    setHistory("");
  };

  const addDrug = () => {
    if (!drug) return;
    setDrugList([...drugList, drug]);
    setDrug("");
  };

  const addPrescription = () => {
    if (!medicine) return;
    setPrescribedList([
      ...prescribedList,
      { medicine, dose, duration, whenToTake, notes },
    ]);
    setMedicine("");
    setDose("");
    setDuration("");
    setWhenToTake("");
    setNotes("");
  };
  // Remove button component
  const RemoveBtn = ({ onClick }: { onClick: () => void }) => (
    <button
      onClick={onClick}
      className="ml-2 w-6 h-6 flex items-center justify-center rounded-full bg-red-500 text-white text-lg leading-none"
    >
      –
    </button>
  );

  return (
    <ReusableModal onOpen={!!selectdata} onClose={close}>
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div className="p-6 bg-white rounded-md w-[850px] max-h-[90vh] overflow-y-auto">
          <h2 className="text-xl font-semibold mb-4">Prescription Form</h2>

          {/* Auto-filled fields */}
          <div className="grid grid-cols-3 gap-4 mb-4">
            <FormInput disabled label="ID" value={id} />
            <FormInput disabled label="Name" value={name} />
            <FormInput disabled label="Department" value={department} />
          </div>

          {/* Complaints */}
          <h3 className="font-semibold mt-4">Search Complaints</h3>
          <div className="grid grid-cols-4 gap-4">
            <FormInput
              label="Complaint"
              value={complaint}
              onChange={(e) => setComplaint(e.target.value)}
            />
            <FormInput
              label="সময়"
              value={time}
              onChange={(e) => setTime(e.target.value)}
            />

            <FormInputSelect
              label="সময়কাল"
              placeholder="সময়কাল নির্বাচন করুন"
              items={timeOptions}
              value={selectedTime}
              onChange={(e) => setSelectedTime(e)}
              required
            />

            <div
              className="mt-11 flex gap-4 no-overflow"
              onClick={addComplaint}
            >
              <Button className="bg-primary" type="submit">
                Add
              </Button>
            </div>
          </div>
          <div className="mt-2 space-y-1">
            {complaintsList.map((c, i) => (
              <div
                key={i}
                className="border p-2 rounded flex items-center justify-between"
              >
                <span>
                  {c.complaint} - {c.time}
                </span>

                <RemoveBtn
                  onClick={() =>
                    setComplaintsList(
                      complaintsList.filter((_, idx) => idx !== i)
                    )
                  }
                />
              </div>
            ))}
          </div>

          {/* History */}
          <h3 className="font-semibold mt-4">Detailed History</h3>
          <div className="grid grid-cols-3 gap-4">
            <Textarea
              className="col-span-2"
              placeholder="Enter history"
              value={history}
              onChange={(e) => setHistory(e.target.value)}
            />
            <div className="mt-11 flex gap-4 no-overflow" onClick={addHistory}>
              <Button className="bg-primary" type="submit">
                Add
              </Button>
            </div>
          </div>
          <div className="mt-2 space-y-1">
            {historyList.map((h, i) => (
              <div
                key={i}
                className="border p-2 rounded flex items-center justify-between"
              >
                <span>{h.history}</span>

                <RemoveBtn
                  onClick={() =>
                    setHistoryList(historyList.filter((_, idx) => idx !== i))
                  }
                />
              </div>
            ))}
          </div>

          {/* Drug History */}
          <h3 className="font-semibold mt-4">Drug History</h3>
          <div className="grid grid-cols-3 gap-4">
            <FormInput
              label="Drug Name"
              value={drug}
              onChange={(e) => setDrug(e.target.value)}
            />

            <div className="mt-11 flex gap-4 no-overflow" onClick={addDrug}>
              <Button className="bg-primary" type="submit">
                Add
              </Button>
            </div>
          </div>
          <div className="mt-2 space-y-1">
            {drugList.map((d, i) => (
              <div
                key={i}
                className="border p-2 rounded flex items-center justify-between"
              >
                <span>{d}</span>

                <RemoveBtn
                  onClick={() =>
                    setDrugList(drugList.filter((_, idx) => idx !== i))
                  }
                />
              </div>
            ))}
          </div>

          {/* Prescription */}
          <h3 className="font-semibold mt-4">Prescribed Medicine</h3>
          <div className="grid grid-cols-2 gap-4">
            <FormInput
              label="Medicine"
              value={medicine}
              onChange={(e) => setMedicine(e.target.value)}
            />
            <FormInput
              label="Dose"
              value={dose}
              onChange={(e) => setDose(e.target.value)}
            />
            <FormInput
              label="Duration"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
            />
            <FormInput
              label="When to take"
              value={whenToTake}
              onChange={(e) => setWhenToTake(e.target.value)}
            />
          </div>
          <Textarea
            className="mt-3"
            placeholder="Notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
          <Button className="bg-primary mt-4" onClick={addPrescription}>
            Add
          </Button>

          <div className="mt-2 space-y-1">
            {prescribedList.map((p, i) => (
              <div
                key={i}
                className="border p-2 rounded flex items-center justify-between"
              >
                <span>
                  {p.medicine} - {p.dose} - {p.duration} - {p.whenToTake}
                </span>

                <RemoveBtn
                  onClick={() =>
                    setPrescribedList(
                      prescribedList.filter((_, idx) => idx !== i)
                    )
                  }
                />
              </div>
            ))}
          </div>

          <div className="flex justify-between mt-6">
            <Button className="bg-green-600" onClick={generatePDF}>
              Generate PDF
            </Button>

            <Button className="bg-primary" onClick={close}>
              Close
            </Button>
          </div>
        </div>
      </div>
    </ReusableModal>
  );
};
