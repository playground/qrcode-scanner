import { Component, OnInit } from '@angular/core';
import { Html5QrcodeScanner } from 'html5-qrcode';
import { Subject, debounceTime } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'qrcode-scanner';
  qrcodeResult: any = [];
  qrNotifier = new Subject();

  ngOnInit(): void {
    const config = {fps: 1, qrbox: {width: 250, height: 250}};
    const html5QrcodeScanner = new Html5QrcodeScanner('qr-code-full-region', config, false);
    html5QrcodeScanner.render(this.onScanSuccess.bind(this), (err) => {});

    this.getQRCode();
  }
  onScanSuccess(decodedText: any, decodedResult: any) {
    const obj = { decodedResult: decodedResult };
    this.qrcodeResult.push(obj.decodedResult.result.text);
    this.saveQRCode(obj.decodedResult.result.text);
    //console.log(obj.decodedResult.result.text)  
  }
  saveQRCode(text: string) {
    try {
      let qrcode = localStorage.getItem('qrcode');
      let json = {qrcode: [text]};
      if(qrcode) {
        json = JSON.parse(qrcode);        
      }
      if(json.qrcode.indexOf(text) < 0) {
        json.qrcode.push(text);
      }
      localStorage.setItem('qrcode', JSON.stringify(json));
    } catch(e) {
      console.log(e);
    }
  }
  getQRCode() {
    try {
      let qrcode = localStorage.getItem('qrcode');
      if(qrcode) {
        this.qrcodeResult = JSON.parse(qrcode).qrcode;
      }
    } catch(e) {
      console.log(e);
    }
  }
  removeQRCode() {
    localStorage.removeItem('qrcode');
  }
  clear() {
    this.qrcodeResult = [];
    this.removeQRCode();
  }
}