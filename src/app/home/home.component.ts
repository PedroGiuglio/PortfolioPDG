import { Component, Inject, HostListener  } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DOCUMENT } from '@angular/common';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  constructor(private router: Router, private http: HttpClient,  @Inject(DOCUMENT) private document: Document) {}

  isScrolled: boolean = false;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled = window.scrollY > 0;
  }

  ngOnInit():void{
  }

  sendEmail() {
    const email = 'pedrogiuglio@gmail.com'; // Cambia esto al correo deseado
    const subject = 'Contact';
    const body = '';
  
    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
  }

  downloadPdf() {
    const pdfUrl = this.document.location.origin + '/assets/images/CV-PedroGiuglio.pdf';

    this.http.get(pdfUrl, { responseType: 'blob' }).subscribe((data: any) => {
      const blob = new Blob([data], { type: 'application/pdf' });
      const downloadLink = document.createElement('a');
      const url = window.URL.createObjectURL(blob);

      downloadLink.href = url;
      downloadLink.download = 'CV-PedroGiuglio.pdf';
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
      window.URL.revokeObjectURL(url);
    });
  }



}
