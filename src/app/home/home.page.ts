import { Component, ElementRef, ViewChild } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton } from '@ionic/angular/standalone';
import { PdfService } from '../services/pdf.service';
import { FileService } from '../services/file.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonContent],
})
export class HomePage {
  @ViewChild('invoiceContent', { static: false }) content!: ElementRef;
  today = new Date().toLocaleDateString();

  constructor(private pdf: PdfService, private file: FileService) { }

  async exportPdf() {
    const html = this.content.nativeElement.innerHTML;
    const doc = this.pdf.generateWithJsPDF(html);
    const base64 = doc.output('datauristring');
    const trimmed = base64.split(',')[1];
    await this.file.saveAndOpenPdf(trimmed, `invoice_${Date.now()}.pdf`);
  }
}
