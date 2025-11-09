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
    const doc = new jsPDF();

    // Header
    doc.setFontSize(18);
    doc.text("Medical Prescription", 14, 15);

    doc.setFontSize(12);
    doc.text(`Patient ID: ${id}`, 14, 30);
    doc.text(`Name: ${name}`, 14, 38);
    doc.text(`Department: ${department}`, 14, 46);

    let y = 60;

    // Complaints
    if (complaintsList.length > 0) {
      doc.setFontSize(14);
      doc.text("Complaints", 14, y);
      y += 4;

      autoTable(doc, {
        startY: y,
        head: [["Complaint", "Duration"]],
        body: complaintsList.map((c) => [c.complaint, c.time]),
      });

      y = (doc as any).lastAutoTable.finalY + 10;
    }

    // History
    if (historyList.length > 0) {
      doc.setFontSize(14);
      doc.text("Detailed History", 14, y);
      y += 4;

      autoTable(doc, {
        startY: y,
        head: [["History"]],
        body: historyList.map((h) => [h.history]),
      });

      y = (doc as any).lastAutoTable.finalY + 10;
    }

    // Drug History
    if (drugList.length > 0) {
      doc.setFontSize(14);
      doc.text("Drug History", 14, y);
      y += 4;

      autoTable(doc, {
        startY: y,
        head: [["Drug Name"]],
        body: drugList.map((d) => [d]),
      });

      y = (doc as any).lastAutoTable.finalY + 10;
    }

    // Prescription
    if (prescribedList.length > 0) {
      doc.setFontSize(14);
      doc.text("Prescribed Medicines", 14, y);
      y += 4;

      autoTable(doc, {
        startY: y,
        head: [["Medicine", "Dose", "Duration", "When to take", "Notes"]],
        body: prescribedList.map((p) => [
          p.medicine,
          p.dose,
          p.duration,
          p.whenToTake,
          p.notes || "",
        ]),
      });
    }

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
              <div key={i} className="border p-2 rounded">
                {c.complaint} - {c.time}
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
              <div key={i} className="border p-2 rounded">
                {h.history}
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
              <div key={i} className="border p-2 rounded">
                {d}
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
              <div key={i} className="border p-2 rounded">
                {p.medicine} - {p.dose} - {p.duration} - {p.whenToTake}
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
