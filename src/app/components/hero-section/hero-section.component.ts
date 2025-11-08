import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

interface Offer {
  title: string;
  subtitle: string;
}

@Component({
  selector: 'app-hero-section',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hero-section.component.html',
  styleUrls: ['./hero-section.component.scss']
})
export class HeroSectionComponent implements OnInit, OnDestroy {
  isRotating = true;
  private offerRotationInterval: any;

  // Dynamic offers displayed on cube faces
  offers: Offer[] = [
    { title: '20% OFF', subtitle: 'Until Dec 31' },
    { title: 'FREE Consultation', subtitle: 'This Week Only' },
    { title: 'NEW YEAR OFFER', subtitle: '30% Discount' },
    { title: 'EARLY BIRD', subtitle: 'Save 25%' },
    { title: 'FLASH SALE', subtitle: 'Limited Time' },
    { title: 'SPECIAL PROMO', subtitle: 'Contact Now' }
  ];

  constructor(private router: Router) {}

  segmentedItems = [
    { text: 'For', isHighlighted: false },
    { text: 'Startups', isHighlighted: true },
    { text: ',', isHighlighted: false },
    { text: 'Enterprise leaders', isHighlighted: true },
    { text: ',', isHighlighted: false },
    { text: 'Media & Publishers', isHighlighted: true },
    { text: 'and', isHighlighted: false },
    { text: 'Social Good', isHighlighted: true }
  ];

  ngOnInit(): void {
    // Rotate offers every 8 seconds
    this.offerRotationInterval = setInterval(() => {
      this.rotateOffers();
    }, 8000);
  }

  ngOnDestroy(): void {
    if (this.offerRotationInterval) {
      clearInterval(this.offerRotationInterval);
    }
  }

  private rotateOffers(): void {
    // Shift the first offer to the end
    const firstOffer = this.offers.shift();
    if (firstOffer) {
      this.offers.push(firstOffer);
    }
  }

  onOurWorksClick(): void {
    // Navigate to services page
    this.router.navigate(['/services']);
  }

  onContactUsClick(): void {
    // Navigate to contact page
    this.router.navigate(['/contact']);
  }
}