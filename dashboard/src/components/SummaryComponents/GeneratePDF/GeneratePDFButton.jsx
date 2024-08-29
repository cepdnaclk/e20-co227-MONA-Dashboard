import React from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const GeneratePDFButton = ({ targetId, filename = 'document.pdf' }) => {
  const handleGeneratePDF = () => {
    const input = document.getElementById(targetId);

    if (!input) {
      console.error(`Element with id ${targetId} not found.`);
      return;
    }

    html2canvas(input, { useCORS: true, scale: 1 }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(filename);
    }).catch((error) => {
      console.error('Error generating PDF:', error);
    });
  };

  return (
    <button onClick={handleGeneratePDF}>
      Generate PDF
    </button>
  );
};

export default GeneratePDFButton;
