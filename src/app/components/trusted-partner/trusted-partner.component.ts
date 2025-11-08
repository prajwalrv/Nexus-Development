import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

interface HappyClient {
  name: string;
  logoPath?: string;
  logoSvg?: string;
  logoAlt: string;
  website: string;
}

@Component({
  selector: 'app-trusted-partner',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './trusted-partner.component.html',
  styleUrls: ['./trusted-partner.component.scss']
})
export class TrustedPartnerComponent {
  partnerBadgeText = 'Happy Clients';
  
  constructor(private sanitizer: DomSanitizer) {}
  
  happyClients: HappyClient[] = [
    {
      name: 'DHIWARE TECHNOLOGIES',
      logoPath: '/assets/images/shield-logo.svg',
      logoAlt: 'DhiWare Technologies - Cybersecurity Solutions',
      website: 'https://www.dhiwaretech.com'
    },
    {
      name: 'ELDERLYASSIST.AI',
      logoSvg: `<svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <!-- Elderly Assist logo design -->
        <rect width="40" height="40" rx="8" fill="#7A8471"/>
        <path d="M12 12h16v2H14v4h12v2H14v4h14v2H12V12z" fill="white"/>
        <circle cx="30" cy="14" r="3" fill="#6B7A5E"/>
      </svg>`,
      logoAlt: 'ElderlyAssist.AI - AI Healthcare Innovation',
      website: 'https://elderlyassist.ai'
    }
  ];
  
  getSanitizedSvg(svgContent: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(svgContent);
  }
}
