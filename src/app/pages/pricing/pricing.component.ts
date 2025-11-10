import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

interface Plan {
  name: string;
  price: string;
  originalPrice?: string;
  discountedPrice?: string;
  blurb?: string;
  cta: { label: string; route: string };
  features: string[];
  highlight?: boolean;
}

@Component({
  selector: 'app-pricing',
  imports: [CommonModule, RouterLink],
  templateUrl: './pricing.component.html',
  styleUrl: './pricing.component.scss'
})
export class PricingComponent {
  plans: Plan[] = [
    {
      name: 'Free Consultation',
      price: '$0',
      blurb: '15‑minute consult to map your online presence and next steps',
      cta: { label: 'Book Free Consultation', route: '/contact' },
      features: [
        'Needs analysis for your business and goals',
        'Quick audit of current online presence (if any)',
        'High‑level scope, budget range, and timeline guidance',
        'Actionable recommendations you can use immediately'
      ]
    },
    {
      name: 'Local Business Website',
      price: '$2,000',
      originalPrice: '$2,000',
      discountedPrice: '$1,600',
      blurb: 'Everything you need to get online fast and look professional',
      cta: { label: 'Get Started', route: '/contact' },
      highlight: true,
      features: [
        'Animated, professional website (5–7 pages)',
        'Mobile‑first, fully responsive',
        'Logo design – two concepts',
        'Poster design – 2/week (extra posters billed per poster)',
        'Basic SEO (on‑page essentials)',
        'Deployment & hosting setup with your domain',
        'Maintenance: 6 months (content changes 2–3 iterations/week; new pages/features billed per item)'
      ]
    },
    {
      name: 'Enterprise Business',
      price: 'Starting at $25,000',
      originalPrice: 'Starting at $25,000',
      discountedPrice: 'Starting at $20,000',
      blurb: 'Strategy, custom UX/UI, integrations, security, and scale',
      cta: { label: 'Book a Discovery Call', route: '/contact' },
      features: [
        'Discovery workshop, roadmap, and IA',
        'Custom UX/UI with advanced animations',
        'Scalable CMS or headless architecture',
        'Integrations: CRM/ERP/payments/marketing',
        'Advanced SEO and performance optimization',
        'Accessibility-minded (WCAG), security hardening',
        'Analytics stack (GA4, event tracking), A/B testing',
        'Staging, CI/CD, code ownership, documentation',
        'Support SLA options (business hours or 24/7)'
      ]
    },
    {
      name: 'E‑commerce & Online Ordering',
      price: 'From $7,500',
      originalPrice: 'From $7,500',
      discountedPrice: 'From $6,000',
      blurb: 'Sell online with a streamlined storefront and ordering flow',
      cta: { label: 'Launch My Store', route: '/contact' },
      features: [
        'Storefront/menu with cart & checkout (first 100 items)',
        'Payments, taxes, shipping/pickup/delivery rules',
        'Promotions, coupons, basic loyalty/referrals',
        'Inventory management and order notifications',
        'Local SEO + Google Business Profile optimization',
        'Email/SMS marketing setup (basic flows)',
        'Basic analytics and sales reporting'
      ]
    }
  ];
}
