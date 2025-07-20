import { Injectable } from '@angular/core';
import jsPDF from 'jspdf';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';

@Injectable({ providedIn: 'root' })
export class PdfService {
  constructor() { pdfMake.vfs = pdfFonts.vfs; }

  generateWithJsPDF(html: string): jsPDF {
    const doc = new jsPDF({
      format: 'a4',
      unit: 'pt',
    });
    doc.html(html, {
      callback: () => { },
      x: 10, y: 10
    });
    return doc;
  }

  generateWithPdfMake(content: any) {
    return pdfMake.createPdf({ content });
  }
}
