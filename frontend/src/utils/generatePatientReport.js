import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export const generatePatientReport = (patient) => {
  const doc = new jsPDF();

  doc.setFontSize(20);
  doc.setTextColor(0, 102, 204);
  doc.text("Predictive Hospital Management AI", 14, 20);

  doc.setFontSize(15);
  doc.setTextColor(0, 0, 0);
  doc.text("Patient Health Report", 14, 30);

  autoTable(doc, {
    startY: 40,
    head: [["Patient Information", ""]],
    body: [
      ["Patient ID", patient.patientId],
      ["Name", patient.name],
      ["Age", patient.age],
      ["Gender", patient.gender],
      ["Room Number", patient.roomNumber],
      ["Status", patient.status],
    ],
  });

  doc.setFontSize(13);
  doc.text("AI Clinical Summary", 14, doc.lastAutoTable.finalY + 15);

  doc.setFontSize(11);
  doc.text(
    "Patient is currently under AI-based monitoring.\nNo critical abnormalities were recorded during the latest observation.",
    14,
    doc.lastAutoTable.finalY + 25
  );

  doc.text(
    "Recommendation:",
    14,
    doc.lastAutoTable.finalY + 45
  );

  doc.text(
    "Continue routine monitoring and follow hospital protocols.",
    14,
    doc.lastAutoTable.finalY + 55
  );

  doc.setFontSize(10);

  doc.text(
    `Generated: ${new Date().toLocaleString()}`,
    14,
    280
  );

  doc.save(`${patient.patientId}_Report.pdf`);
};