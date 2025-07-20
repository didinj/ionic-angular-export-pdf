import { Injectable } from '@angular/core';
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';
import { FileOpener } from '@capacitor-community/file-opener';

@Injectable({ providedIn: 'root' })
export class FileService {
  async saveAndOpenPdf(base64: string, fileName = 'document.pdf') {
    const result = await Filesystem.writeFile({
      path: `mypdfs/${fileName}`,
      data: base64,
      directory: Directory.Documents,
      encoding: Encoding.UTF8
    });
    await FileOpener.open({ filePath: result.uri, contentType: 'application/pdf' });
  }
}
