"use client";

import { FC, useEffect, useState } from "react";
import { FormInput, FormInputSelect, IItems } from "@/components/atomic";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@material-tailwind/react";
import { generatePrescriptionPDF } from "@/utils/helpers/generatePrescriptionPDF";
import { PreviewPrescriptionModal } from "./PreviewPrescriptionModal";
import { Appoinmentdata } from "@/libs/api/interface/assuarace";
import { assuranceAPI } from "@/libs/api";
import axios from "axios";

interface Medicine {
  name: string;
  dosage: string;
  quantity: number;
  instructions: string;
}

interface PropsType {
  selectdata: Appoinmentdata;
  onIdChange?: (id: string) => void;
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
  { label: "Custom", value: "custom" },
];

export const PrescriptionFormPage: FC<PropsType> = ({
  selectdata,
  onIdChange,
}) => {
  const [id, setId] = useState(selectdata?.id || "");
  const [name, setName] = useState(selectdata?.name || "");
  const [mobile, setMobile] = useState(selectdata?.phone || "");
  const [email, setEmail] = useState(selectdata?.email || "");
  const [department, setDepartment] = useState(selectdata?.department || "");

  const [complaintSuggestions, setComplaintSuggestions] = useState<string[]>(
    []
  );
  const [complaint, setComplaint] = useState("");
  const [time, setTime] = useState("");
  const [selectTime, setSelectedTime] = useState("");

  const [complaintsList, setComplaintsList] = useState<
    { complaint: string; time: string; selectTime: string }[]
  >([]);

  const [medicine, setMedicine] = useState("");
  const [medicineSuggestions, setMedicineSuggestions] = useState<string[]>([]);
  const [dose, setDose] = useState("");
  const [customDose, setCustomDose] = useState("");
  const [quantity, setQuantity] = useState("");
  const [duration, setDuration] = useState("");
  const [selectTime1, setSelectedTime1] = useState("");
  const [whenToTake, setWhenToTake] = useState("");
  const [notes, setNotes] = useState("");
  const [prescribedList, setPrescribedList] = useState<any[]>([]);

  const [previewOpen, setPreviewOpen] = useState(false);

  // -------------------- Fetch Appointment by ID --------------------
  useEffect(() => {
    if (!id) {
      setName("");
      setMobile("");
      setEmail("");
      setDepartment("");
      setComplaintsList([]);
      setPrescribedList([]);
      return;
    }

    setName("");
    setMobile("");
    setEmail("");
    setDepartment("");
    setComplaintsList([]);
    setPrescribedList([]);

    const timer = setTimeout(async () => {
      try {
        const res = await assuranceAPI.getAppointmentById(id);
        const d = res.data;
        if (!d) return;

        setName(d.name || "");
        setMobile(d.phone || "");
        setEmail(d.email || "");
        setDepartment(d.department || "");
        setComplaintsList(
          d.complaints?.map((c: string) => ({ complaint: c })) || []
        );
        setPrescribedList(
          d.medicines?.map((m: Medicine) => ({
            medicine: m.name,
            dose: m.dosage,
            quantity: m.quantity,
            notes: m.instructions,
          })) || []
        );

        onIdChange?.(id);
      } catch (err) {
        console.error("Failed to fetch appointment", err);
        setName("");
        setDepartment("");
        setComplaintsList([]);
        setPrescribedList([]);
      }
    }, 400);

    return () => clearTimeout(timer);
  }, [id, onIdChange]);

  // -------------------------------------------
  // ✅ Fetch suggested symptoms while typing
  // -------------------------------------------
  useEffect(() => {
    if (!complaint.trim()) return;

    const timer = setTimeout(async () => {
      try {
        const res = await fetch(
          `https://api.zaynax.health/doctor_service/public/doctors/suggested-symptoms?search=${complaint}`
        );
        const data = await res.json();
        setComplaintSuggestions(data?.data || []);
      } catch (err) {
        console.error("Complaint suggestion fetch failed", err);
        setComplaintSuggestions([]);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [complaint]);

  // -------------------------------------------
  // ✅ Fetch suggested medicines while typing
  // -------------------------------------------
  useEffect(() => {
    if (!medicine.trim()) {
      setMedicineSuggestions([]);
      return;
    }

    const timer = setTimeout(async () => {
      try {
        const res = await fetch(
          `https://api.zaynax.health/product_service/medicine/brand/prescription_recomended_new?query=${medicine}`
        );
        const data = await res.json();
        const list =
          data?.data?.map((item: any) => item?.brand_name || "") || [];
        setMedicineSuggestions(list);
      } catch (err) {
        console.error("Medicine suggestion fetch failed", err);
        setMedicineSuggestions([]);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [medicine]);

  // -------------------- Save to Backend --------------------
  const [saveClicked, setSaveClicked] = useState(false);

  const saveAppointment = async () => {
    if (!id || !name || !mobile || !email || !department) {
      alert("Please fill all required fields!");
      return;
    }

    try {
      const payload = {
        employeeId: String(id),
        name: String(name),
        phone: String(mobile),
        email: String(email),
        department: String(department),
        doctorName: "Dr. Example",
        complaints: complaintsList.map(
          (c) => `${c.complaint} ${c.time} ${c.selectTime}`
        ), // <-- array of strings
        medicines: prescribedList.map((p) => ({
          name: String(p.medicine),
          dosage: String(p.dose),
          quantity: Number(p.quantity) || 0,
          instructions: String(p.whenToTake || ""),
        })),
      };

      const res = await assuranceAPI.addAppoinments(payload);
      console.log("Saved successfully", res);
      alert("Appointment saved successfully!");
    } catch (err) {
      console.error("Failed to save appointment", err);
      alert("Failed to save appointment");
    }
  };

  // useEffect triggers save when saveClicked changes
  useEffect(() => {
    if (!saveClicked) return;
    saveAppointment().finally(() => setSaveClicked(false)); // reset after save
  }, [saveClicked]);

  // Add complaint
  const addComplaint = () => {
    if (!complaint) return;

    setComplaintsList([...complaintsList, { complaint, time, selectTime }]);

    setComplaint("");
    setTime("");
    setSelectedTime("");
    setComplaintSuggestions([]);
  };

  // Remove complaint
  const removeComplaint = (index: number) => {
    setComplaintsList(complaintsList.filter((_, i) => i !== index));
  };

  // -------------------- Add Prescription --------------------
  const addPrescription = () => {
    if (!medicine.trim()) return;
    setPrescribedList([
      ...prescribedList,
      {
        medicine,
        dose: dose === "custom" ? customDose : dose,
        quantity,
        duration,
        selectTime1,
        whenToTake,
        // notes,
      },
    ]);
    setMedicine("");
    setDose("");
    setCustomDose("");
    setQuantity("");
    setDuration("");
    setSelectedTime1("");
    setWhenToTake("");
    setNotes("");
    setMedicineSuggestions([]);
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
    <div className="p-6 bg-white rounded-md max-w-5xl mx-auto mt-6 shadow-md">
      {/* Patient Info */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <FormInput
          label="ID"
          value={id}
          onChange={(e) => setId(e.target.value)}
        />
        <FormInput
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <FormInput
          label="Department"
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
        />
        <FormInput
          label="Mobile Number"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
        />
        <FormInput
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      {/* Complaints */}
      <h3 className="font-semibold text-lg mt-4 mb-2">Complaints</h3>
      <div className="grid grid-cols-4 gap-4 mb-2">
        <FormInput
          label="Complaint"
          value={complaint}
          onChange={(e) => setComplaint(e.target.value)}
          inputProps={{ list: "complaint-suggestions" }}
        />
        <datalist id="complaint-suggestions">
          {complaintSuggestions.map((s, i) => (
            <option key={i} value={s} />
          ))}
        </datalist>

        <FormInput
          label="সময়"
          value={time}
          onChange={(e) => setTime(e.target.value)}
        />
        <FormInputSelect
          label="সময়কাল"
          placeholder="সময়কাল নির্বাচন করুন"
          items={timeOptions}
          value={selectTime}
          onChange={setSelectedTime}
        />
        <div className="centered-flex mt-5">
          <Button
            className="bg-primary px-4 py-2 text-sm"
            onClick={addComplaint}
          >
            Add
          </Button>
        </div>
      </div>
      {complaintsList.map((c, i) => (
        <div
          key={i}
          className="border p-2 rounded flex items-center justify-between mb-1"
        >
          <span>
            {c.complaint} {c.time} {c.selectTime}
          </span>
          <RemoveBtn
            onClick={() =>
              setComplaintsList(complaintsList.filter((_, idx) => idx !== i))
            }
          />
        </div>
      ))}

      {/* Prescriptions */}
      <h3 className="font-semibold text-lg mt-6 mb-2">Prescribed Medicine</h3>
      <div className="grid grid-cols-3 gap-4">
        <FormInput
          label="Medicine"
          value={medicine}
          onChange={(e) => setMedicine(e.target.value)}
          inputProps={{ list: "medicine-list" }}
        />
        <datalist id="medicine-list">
          {medicineSuggestions.map((m, i) => (
            <option key={i} value={m} />
          ))}
        </datalist>

        <FormInputSelect
          label="Dose"
          placeholder="Select Dose"
          items={doseOptions}
          value={dose}
          onChange={setDose}
        />
        {dose === "custom" && (
          <FormInput
            label="Custom Dose"
            placeholder="e.g. 0+0+0"
            value={customDose}
            onChange={(e) => setCustomDose(e.target.value)}
          />
        )}
      </div>

      <div className="grid grid-cols-4 gap-4 mt-2">
        <FormInput
          label="Quantity"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />
        {/* <FormInput
          label="Duration"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
        /> */}
        {/* <FormInputSelect
          label="সময়কাল"
          placeholder="সময়কাল নির্বাচন করুন"
          items={timeOptions}
          value={selectTime1}
          onChange={setSelectedTime1}
        /> */}
        <FormInputSelect
          label="When to take"
          placeholder="সময় নির্বাচন করুন"
          items={takeTime}
          value={whenToTake}
          onChange={setWhenToTake}
        />
      </div>

      {/* <Textarea
        className="mt-3"
        placeholder="Notes"
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
      /> */}
      <Button className="bg-primary mt-4" onClick={addPrescription}>
        Add
      </Button>

      {prescribedList.map((p, i) => (
        <div
          key={i}
          className="border p-2 rounded flex items-center justify-between mb-1"
        >
          <span>
            {p.medicine} - {p.dose} - Qty: {p.quantity} - {p.whenToTake}
          </span>
          <RemoveBtn
            onClick={() =>
              setPrescribedList(prescribedList.filter((_, idx) => idx !== i))
            }
          />
        </div>
      ))}

      {/* Footer Buttons */}
      <div className="flex justify-between mt-6">
        <div className="flex gap-2">
          <Button className="bg-blue-600" onClick={() => setPreviewOpen(true)}>
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
                prescribedList,
              })
            }
          >
            Generate PDF
          </Button>
        </div>

        <Button className="bg-purple-600" onClick={() => setSaveClicked(true)}>
          Send
        </Button>
      </div>

      <PreviewPrescriptionModal
        open={previewOpen}
        close={() => setPreviewOpen(false)}
        id={id}
        name={name}
        department={department}
        complaintsList={complaintsList}
        prescribedList={prescribedList}
      />
    </div>
  );
};
