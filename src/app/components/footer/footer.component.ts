import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  // Navigation links
  navLinks = [
    { label: 'Home', route: '/' },
    { label: 'Services', route: '/services' },
    { label: 'Work', route: '/work' },
    { label: 'Process', route: '/process' },
    { label: 'About', route: '/about' },
    { label: 'Careers', route: '/careers' },
    { label: 'Contact', route: '/contact' }
  ];

  // Social media links
  socialLinks = [
    { 
      platform: 'Facebook', 
      url: 'https://facebook.com',
      ariaLabel: 'Visit our Facebook page'
    },
    { 
      platform: 'Twitter', 
      url: 'https://twitter.com',
      ariaLabel: 'Visit our Twitter profile'
    },
    { 
      platform: 'LinkedIn', 
      url: 'https://linkedin.com',
      ariaLabel: 'Visit our LinkedIn page'
    }
  ];

  // Contact information
  contactInfo = {
    email: 'hello@squareup.com',
    phone: '+91 91813 23 2309',
    address: 'Somewhere in the World'
  };

  // Copyright year - dynamically set to current year
  copyrightYear = new Date().getFullYear();
  companyName = 'SquareUp';

  constructor() {}
}
