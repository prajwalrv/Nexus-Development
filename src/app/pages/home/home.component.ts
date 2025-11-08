import { Component, OnInit, AfterViewInit, OnDestroy, ElementRef } from '@angular/core';
import { HeroSectionComponent } from '../../components/hero-section/hero-section.component';
import { TrustedPartnerComponent } from '../../components/trusted-partner/trusted-partner.component';
import { OurServicesComponent } from '../../components/our-services/our-services.component';
import { WhyChooseNexusComponent } from '../../components/why-choose-nexus/why-choose-nexus.component';
import { ClientTestimonialsComponent } from '../../components/client-testimonials/client-testimonials.component';
import { FaqSectionComponent } from '../../components/faq-section/faq-section.component';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugin
gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-home',
  imports: [
    HeroSectionComponent,
    TrustedPartnerComponent,
    OurServicesComponent,
    WhyChooseNexusComponent,
    ClientTestimonialsComponent,
    FaqSectionComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit, AfterViewInit, OnDestroy {
  private observer!: IntersectionObserver;

  constructor(private elementRef: ElementRef) {}

  private scrollTriggers: ScrollTrigger[] = [];

  ngOnInit(): void {
    // Initialize intersection observer for scroll-triggered animations
    this.initIntersectionObserver();
  }

  ngAfterViewInit(): void {
    // Reset scroll position
    window.scrollTo(0, 0);
    
    // Delay to ensure all child components are rendered
    setTimeout(() => {
      // Clean up any existing triggers before initializing new ones
      this.cleanupScrollTriggers();
      this.initScrollTriggerAnimations();
    }, 100);
  }

  ngOnDestroy(): void {
    if (this.observer) {
      this.observer.disconnect();
    }
    this.cleanupScrollTriggers();
  }

  private cleanupScrollTriggers(): void {
    // Kill only the triggers created by this component
    this.scrollTriggers.forEach(trigger => {
      if (trigger && trigger.kill) {
        trigger.kill();
      }
    });
    this.scrollTriggers = [];
  }

  private initIntersectionObserver(): void {
    const options = {
      root: null,
      rootMargin: '-10% 0px -10% 0px',
      threshold: 0.1
    };

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in-view');
          // Add a subtle bounce effect for sections coming into view
          gsap.fromTo(entry.target,
            {
              scale: 0.98,
              filter: 'blur(2px)'
            },
            {
              scale: 1,
              filter: 'blur(0px)',
              duration: 0.8,
              ease: 'power2.out'
            }
          );
        }
      });
    }, options);

    // Observe all section components
    setTimeout(() => {
      const sections = this.elementRef.nativeElement.querySelectorAll(
        'app-hero-section, app-trusted-partner, app-our-services, app-why-choose-nexus, app-client-testimonials, app-faq-section'
      );
      sections.forEach((section: Element) => {
        this.observer.observe(section);
      });
    }, 50);
  }

  private initScrollTriggerAnimations(): void {
    // Reset any existing ScrollTrigger instances
    this.cleanupScrollTriggers();

    // Hero section parallax effect
    const heroTrigger = ScrollTrigger.create({
      trigger: 'app-hero-section',
      start: 'top top',
      end: 'bottom top',
      scrub: 1,
      animation: gsap.to('app-hero-section', {
        yPercent: -15,
        ease: 'none'
      })
    });
    this.scrollTriggers.push(heroTrigger);

    // Section reveal animations
    const sections = [
      'app-trusted-partner',
      'app-our-services', 
      'app-why-choose-nexus',
      'app-client-testimonials',
      'app-faq-section'
    ];

    sections.forEach((selector, index) => {
      const trigger = ScrollTrigger.create({
        trigger: selector,
        start: 'top 85%',
        end: 'top 50%',
        toggleActions: 'play none none reverse',
        animation: gsap.fromTo(selector,
          {
            y: 80,
            opacity: 0,
            filter: 'blur(6px)',
            scale: 0.95
          },
          {
            y: 0,
            opacity: 1,
            filter: 'blur(0px)',
            scale: 1,
            duration: 1.2,
            ease: 'power2.out'
          }
        )
      });
      this.scrollTriggers.push(trigger);
    });

    // Add floating elements animation for visual appeal
    this.addFloatingElements();
  }

  private addFloatingElements(): void {
    // Create subtle floating background elements
    const floatingElements = document.querySelectorAll('.floating-bg-element');
    
    floatingElements.forEach((element, index) => {
      gsap.to(element, {
        y: 'random(-100, 100)',
        x: 'random(-50, 50)',
        rotation: 'random(-180, 180)',
        duration: 'random(8, 12)',
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: index * 0.5
      });
    });
  }
}
