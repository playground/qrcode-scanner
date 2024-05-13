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
  }
  onScanSuccess(decodedText: any, decodedResult: any) {
    const obj = { decodedResult: decodedResult };
    this.qrcodeResult.push(obj);
    //console.log(obj.decodedResult.result.text)  
  }
  clear() {
    this.qrcodeResult = [];
  }
}