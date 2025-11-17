import jsPDF from "jspdf";

interface PrescriptionData {
  id: string;
  name: string;
  department: string;
  complaintsList: {
    complaint: string;
  }[];
  prescribedList: {
    customDose: string;
    medicine: string;
    dose: string;
    duration: string;
    quantity?: number | string;
    whenToTake: string;
  }[];
}

export const generatePrescriptionPDF = ({
  id,
  name,
  department,
  complaintsList,
  prescribedList,
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

  // Divider line
  doc.setLineWidth(0.5);
  doc.line(14, 32, 196, 32);

  // ========== PATIENT INFO ==========
  const today = new Date();
  const formattedDate = `${String(today.getDate()).padStart(2, "0")}/${String(
    today.getMonth() + 1
  ).padStart(2, "0")}/${today.getFullYear()}`;

  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.text("Patient Information", 14, 40);

  doc.setFont("helvetica", "normal");
  doc.text(`ID: ${id}`, 14, 48);
  doc.text(`Name: ${name}`, 14, 54);
  doc.text(`Department: ${department}`, 14, 60);
  doc.text(`Date: ${formattedDate}`, 150, 48);

  // ========== TWO COLUMNS ==========
  const startY = 70;
  const leftX = 14;
  const verticalLineX = 80; // shifted more left
  const rightX = 85; // start of medicine column

  // Draw vertical line
  doc.setLineWidth(0.3);
  doc.line(verticalLineX, startY - 10, verticalLineX, 250);

  // ========== Complaints (Left) ==========
  if (complaintsList.length > 0) {
    doc.setFont("helvetica", "bold");
    doc.text("Complaints", leftX, startY);
    doc.setFont("helvetica", "normal");

    let y = startY + 6;
    complaintsList.forEach((c) => {
      doc.text(`• ${c.complaint}`, leftX, y);
      y += 6; // spacing between complaints
    });
    var complaintsEndY = y;
  } else {
    var complaintsEndY = startY;
  }

  // ========== Prescribed Medicines (Right) ==========
  if (prescribedList.length > 0) {
    doc.setFont("helvetica", "bold");
    doc.text("Prescribed Medicines", rightX, startY);
    doc.setFont("helvetica", "normal");

    let y = startY + 6;
    prescribedList.forEach((p, index) => {
      doc.text(`${index + 1}. ${p.medicine}`, rightX, y);
      y += 6;
      const doseText = `${p.dose || p.customDose} -- Qty: ${
        p.quantity || "-"
      } -- ${p.whenToTake}`;
      doc.text(doseText, rightX + 4, y); // indented for clarity
      y += 8; // spacing between medicines
    });
    var medicineEndY = y;
  } else {
    var medicineEndY = startY;
  }

  // ========== SIGNATURE ==========
  const extraSpace = 40; // extra space below content
  const signatureY = Math.max(complaintsEndY, medicineEndY) + extraSpace;

  doc.setFont("helvetica", "normal");
  // Horizontal signature line
  doc.text(
    "------------------------------------------------------",
    130,
    signatureY
  );

  // Small "Signed" text above the line
  doc.setFontSize(10);
  doc.text("Signed", 160, signatureY - 4);

  // "Doctor's Signature" text below the line
  doc.setFontSize(12);
  doc.text("Doctor's Signature", 150, signatureY + 6);

  // Save PDF
  doc.save(`Prescription_${id}.pdf`);
};
