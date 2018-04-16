import { Component, Output, EventEmitter } from '@angular/core';
import { FileSelectDirective, FileUploader } from "ng2-file-upload";
import * as XLSX from 'xlsx';
import { IWorksheet, IWorkbook } from '../../models/workbook';

const URL = 'https://foo.bar.com';

@Component({
  selector: 'xlsx-file-upload',
  templateUrl: './xlsx-file-upload.component.html',
  styleUrls: ['./xlsx-file-upload.component.css']
})

export class XlsxFileUploadComponent {

    @Output() oWorkbook: EventEmitter<IWorkbook> = new EventEmitter();

    public uploader:FileUploader = new FileUploader({url: URL});

    rABS = true; // true: readAsBinaryString ; false: readAsArrayBuffer
    
    handleFile(e) {
      var files = e.target.files, f = files[0];
      var reader = new FileReader();
      reader.onload = (e) => {

        let target:any = e.target;
        var data = target.result;

        if(!this.rABS) data = new Uint8Array(data);
        var workbookHeaders = XLSX.read(data, { raw:true, sheetRows:1, type: this.rABS ? 'binary' : 'array', cellDates:true});
        var workbook = XLSX.read(data, { raw:true, type: this.rABS ? 'binary' : 'array', cellDates:true});

        let sheets = workbookHeaders.SheetNames.map(sheetName => {

            let headerSheet = workbookHeaders.Sheets[sheetName];
            let headerRows = XLSX.utils.sheet_to_json(headerSheet, {raw:true, header:1, blankrows:true})[0];

            let sheet = workbook.Sheets[sheetName];
            let rows = XLSX.utils.sheet_to_json(sheet, {raw:true, blankrows:true});

            let workSheet: IWorksheet = {
                Name: sheetName,
                Headers: Object.keys(headerRows).map((key) => { return headerRows[key]; }),
                Values: rows
            };
        
            return workSheet;
        });
        
        this.oWorkbook.emit({Sheets:sheets});
      };

      if(this.rABS) reader.readAsBinaryString(f); else reader.readAsArrayBuffer(f);
    }
}