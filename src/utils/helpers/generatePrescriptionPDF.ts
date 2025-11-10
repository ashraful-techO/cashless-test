import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

interface PrescriptionData {
  id: string;
  name: string;
  department: string;
  complaintsList: {
    selectedTime: string; complaint: string; time: string 
}[];
  historyList: { history: string }[];
  drugList: string[];
  prescribedList: {
    medicine: string;
    dose: string;
    duration: string;
    whenToTake: string;
    notes: string;
  }[];
  selectedTime?: string;
}

export const generatePrescriptionPDF = ({
  id,
  name,
  department,
  complaintsList,
  historyList,
  drugList,
  prescribedList,
  selectedTime = "",
}: PrescriptionData) => {
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
      body: complaintsList.map((c) => [
        c.complaint,
        `${c.time} ${c.selectedTime || ""}`, // use selectedTime from each complaint
      ]),
      styles: { fontSize: 11 },
      headStyles: { fillColor: [255, 0, 101] },
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
      headStyles: { fillColor: [255, 0, 101] },
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
      headStyles: { fillColor: [255, 0, 101] },
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
      headStyles: { fillColor: [255, 0, 101] },
    });

    y = (doc as any).lastAutoTable.finalY + 15;
  }

  // ========== SIGNATURE ==========
  doc.setFont("helvetica", "normal");
  doc.text("------------------------------------------------------", 130, y);
  doc.text("Doctor's Signature", 150, y + 6);

  // Save PDF
  doc.save(`Prescription_${id}.pdf`);
};
