"use client";

import { FC, useEffect, useState } from "react";
import { ReusableModal } from "@/components/molecules";
import { FormInput, FormInputSelect, IItems } from "@/components/atomic";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@material-tailwind/react";
import { Appoinmentdata } from "@/libs/api/interface/assuarace";
import { PreviewPrescriptionModal } from "./PreviewPrescriptionModal";
import { generatePrescriptionPDF } from "@/utils/helpers/generatePrescriptionPDF";

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

const takeTime: IItems[] = [
  { label: "খাবার আগে", value: "before meal" },
  { label: "খাবার পরে", value: "after meal" },
];

const doseOptions: IItems[] = [
  { label: "1+1+1", value: "1+1+1" },
  { label: "1+0+1", value: "1+0+1" },
  { label: "0+1+0", value: "0+1+0" },
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
  const [selectedTime, setSelectedTime] = useState("");
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

  const [previewOpen, setPreviewOpen] = useState(false);

  useEffect(() => {
    if (selectdata) {
      setId(selectdata.ID || "");
      setName(selectdata.Name || "");
      setDepartment(selectdata.Department || "");
    }
  }, [selectdata]);

  const addComplaint = () => {
    if (!complaint) return;
    setComplaintsList([...complaintsList, { complaint, time, selectedTime }]);
    setComplaint("");
    setTime("");
    setSelectedTime("");
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
              onChange={setSelectedTime}
            />
            <div className="mt-11 flex gap-4" onClick={addComplaint}>
              <Button className="bg-primary">Add</Button>
            </div>
          </div>
          <div className="mt-2 space-y-1">
            {complaintsList.map((c, i) => (
              <div
                key={i}
                className="border p-2 rounded flex items-center justify-between"
              >
                <span>
                  {c.complaint} - {c.time} - {c.selectedTime}
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
            <div className="mt-11 flex gap-4" onClick={addHistory}>
              <Button className="bg-primary">Add</Button>
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
            <div className="mt-11 flex gap-4" onClick={addDrug}>
              <Button className="bg-primary">Add</Button>
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
            <FormInputSelect
              label="Dose"
              placeholder="Select Dose"
              items={doseOptions}
              value={dose}
              onChange={setDose}
            />
            <div className="flex flex-col-3 gap-10">
              <FormInput
                label="Duration"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
              />
              <FormInputSelect
                label="সময়কাল"
                placeholder="সময়কাল নির্বাচন করুন"
                items={timeOptions}
                value={selectedTime}
                onChange={setSelectedTime}
              />
              <FormInputSelect
                label="When to take"
                placeholder="সময় নির্বাচন করুন"
                items={takeTime}
                value={whenToTake}
                onChange={setWhenToTake}
              />
            </div>
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
            <Button
              className="bg-green-600"
              onClick={() => setPreviewOpen(true)}
            >
              Preview
            </Button>
            <Button
              className="bg-green-600"
              onClick={() =>
                generatePrescriptionPDF({
                  id,
                  name,
                  department,
                  complaintsList,
                  historyList: historyList.map((h) => h.history || h),
                  drugList,
                  prescribedList,
                })
              }
            >
              Generate PDF
            </Button>
            <Button className="bg-primary" onClick={close}>
              Close
            </Button>
          </div>

          {/* Preview modal */}
          <PreviewPrescriptionModal
            open={previewOpen}
            close={() => setPreviewOpen(false)}
            id={id}
            name={name}
            department={department}
            complaintsList={complaintsList}
            historyList={historyList.map((h) => h.history || h)}
            drugList={drugList}
            prescribedList={prescribedList}
          />
        </div>
      </div>
    </ReusableModal>
  );
};
