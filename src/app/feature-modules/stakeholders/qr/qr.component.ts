import { Component, OnInit } from '@angular/core';
import { StakeholdersService } from '../stakeholders.service';
import { RegistratedUser } from '../model/user.model';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-qr',
  templateUrl: './qr.component.html',
  styleUrls: ['./qr.component.css'],
})
export class QrComponent implements OnInit {
  qrCodeImages: SafeResourceUrl[] = [];
  qrCodeImagesDone: string[] = [];
  user: RegistratedUser;
  filterType: string = '';

  constructor(
    private service: StakeholdersService,
    private sanitizer: DomSanitizer
  ) {}
  ngOnInit(): void {
    this.service.getUser().subscribe({
      next: (result: RegistratedUser) => {
        console.log(result);
        this.user = result;
        this.loadQrCodes();
      },
    });
  }

  loadQrCodes(): void {
    this.service.getQrByUser(this.user.user_id!).subscribe((data) => {
      console.log('Received data:', data);
      this.qrCodeImages = data.map((qrCode) => {
        const base64Image = 'data:image/png;base64,' + qrCode;
        const safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
          base64Image
        ) as SafeResourceUrl;
        console.log(safeUrl);
        return safeUrl;
      });
      console.log('QR Code Images:', this.qrCodeImages);
    });
  }

  loadNewQrCodes(): void {
    this.service.getNewQrByUser(this.user.user_id!).subscribe((data) => {
      console.log('Received data:', data);
      this.qrCodeImages = data.map((qrCode) => {
        const base64Image = 'data:image/png;base64,' + qrCode;
        const safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
          base64Image
        ) as SafeResourceUrl;
        console.log(safeUrl);
        return safeUrl;
      });
      console.log('QR Code Images:', this.qrCodeImages);
    });
  }

  loadAcceptedQrCodes(): void {
    this.service.getAcceptedQrByUser(this.user.user_id!).subscribe((data) => {
      console.log('Received data:', data);
      this.qrCodeImages = data.map((qrCode) => {
        const base64Image = 'data:image/png;base64,' + qrCode;
        const safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
          base64Image
        ) as SafeResourceUrl;
        console.log(safeUrl);
        return safeUrl;
      });
      console.log('QR Code Images:', this.qrCodeImages);
    });
  }

  loadRejectedQrCodes(): void {
    this.service.getRejectedQrByUser(this.user.user_id!).subscribe((data) => {
      console.log('Received data:', data);
      this.qrCodeImages = data.map((qrCode) => {
        const base64Image = 'data:image/png;base64,' + qrCode;
        const safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
          base64Image
        ) as SafeResourceUrl;
        console.log(safeUrl);
        return safeUrl;
      });
      console.log('QR Code Images:', this.qrCodeImages);
    });
  }

  filter(): void {
    if (this.filterType == 'NEW') this.loadNewQrCodes();
    else if (this.filterType == 'ACCEPTED') this.loadAcceptedQrCodes();
    else if (this.filterType == 'REJECTED') this.loadRejectedQrCodes();
  }

  reset(): void {
    this.filterType = '';
    this.loadQrCodes();
  }
}
