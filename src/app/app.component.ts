import { Component, OnInit, signal, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { PremiumLoaderComponent } from './components/premium-loader/premium-loader.component';
import { gsap } from 'gsap';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent, FooterComponent, PremiumLoaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit, AfterViewInit {
  @ViewChild('mainContent', { static: false }) mainContent!: ElementRef;
  
  title = 'NexusDevelopment';
  protected showLoader = signal(true);
  private isContentReady = false;

  constructor(private router: Router) {
    // Subscribe to router events to handle navigation
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      // Reset GSAP ScrollTrigger on route change
      if ('ScrollTrigger' in window) {
        ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      }

      // Ensure scroll reset happens after view update and before animations
      Promise.resolve().then(() => {
        window.scrollTo({ top: 0, behavior: 'instant' });
        
        // Trigger page entrance animations
        setTimeout(() => {
          this.animatePageEntrance();
        }, 100);
      });
    });
  }

  ngOnInit(): void {
    // Pre-load any critical resources
    setTimeout(() => {
      this.isContentReady = true;
    }, 100);
  }

  ngAfterViewInit(): void {
    // Initial state for main content - hidden and ready for animation
    if (this.mainContent?.nativeElement) {
      gsap.set(this.mainContent.nativeElement, {
        opacity: 0,
        y: 30,
        filter: 'blur(8px)'
      });
    }
  }

  onLoadComplete(): void {
    // Smooth transition from loader to main content
    const tl = gsap.timeline();
    
    tl.to('.premium-loader', {
      opacity: 0,
      scale: 1.1,
      filter: 'blur(10px)',
      duration: 0.8,
      ease: 'power2.inOut'
    })
    .call(() => {
      this.showLoader.set(false);
    })
    .to(this.mainContent?.nativeElement, {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      duration: 1.2,
      ease: 'power2.out'
    }, '-=0.3')
    .call(() => {
      // Trigger entrance animations for sections
      this.animatePageEntrance();
    });

    console.log('Premium loading complete - Welcome to Nexus Development');
  }

  private animatePageEntrance(): void {
    // Staggered entrance animation for main sections
    const sections = document.querySelectorAll('app-hero-section, app-trusted-partner, app-our-services, app-why-choose-nexus, app-client-testimonials, app-faq-section');
    
    gsap.fromTo(sections, 
      {
        opacity: 0,
        y: 60,
        filter: 'blur(4px)'
      },
      {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        duration: 1,
        stagger: 0.2,
        ease: 'power2.out',
        delay: 0.3
      }
    );

    // Animate navbar with a subtle slide down
    gsap.fromTo('app-navbar',
      {
        y: -80,
        opacity: 0
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power2.out',
        delay: 0.1
      }
    );
  }
}
