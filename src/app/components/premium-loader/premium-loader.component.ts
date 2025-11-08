import { Component, OnInit, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { gsap } from 'gsap';

@Component({
  selector: 'app-premium-loader',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="premium-loader" [class.loaded]="isLoaded">
      <!-- Background -->
      <div class="loader-bg">
        <div class="bg-gradient"></div>
        <div class="bg-pattern"></div>
      </div>

      <!-- Main Content -->
      <div class="loader-content">
        <!-- Logo Animation -->
        <div class="loader-logo">
          <div class="logo-container">
            <div class="logo-letter letter-n">N</div>
            <div class="logo-letter letter-x">X</div>
          </div>
          <div class="logo-tagline">
            <span class="tagline-word">NEXUS</span>
            <span class="tagline-word">DEVELOPMENT</span>
          </div>
        </div>

        <!-- Progress Bar -->
        <div class="progress-container">
          <div class="progress-bar">
            <div class="progress-fill" [style.width.%]="progress"></div>
            <div class="progress-glow"></div>
          </div>
          <div class="progress-text">
            <span class="progress-number">{{ progress }}%</span>
            <span class="progress-label">{{ currentStatus }}</span>
          </div>
        </div>

        <!-- Animated Text -->
        <div class="loader-text">
          <div class="text-carousel">
            <div class="carousel-item" *ngFor="let text of carouselTexts; let i = index" 
                 [class.active]="i === activeTextIndex">
              {{ text }}
            </div>
          </div>
        </div>

        <!-- Floating Elements -->
        <div class="floating-orbs">
          <div class="orb" *ngFor="let i of [1,2,3,4,5]" [style.--orb-index]="i"></div>
        </div>
      </div>

      <!-- Corner Details -->
      <div class="corner-details">
        <div class="corner top-left">
          <div class="corner-line horizontal"></div>
          <div class="corner-line vertical"></div>
        </div>
        <div class="corner top-right">
          <div class="corner-line horizontal"></div>
          <div class="corner-line vertical"></div>
        </div>
        <div class="corner bottom-left">
          <div class="corner-line horizontal"></div>
          <div class="corner-line vertical"></div>
        </div>
        <div class="corner bottom-right">
          <div class="corner-line horizontal"></div>
          <div class="corner-line vertical"></div>
        </div>
      </div>

      <!-- Sound Wave Animation -->
      <div class="sound-wave">
        <span *ngFor="let i of [1,2,3,4,5]" class="wave-bar" [style.--bar-index]="i"></span>
      </div>
    </div>
  `,
  styleUrls: ['./premium-loader.component.scss']
})
export class PremiumLoaderComponent implements OnInit, AfterViewInit {
  @Output() loadComplete = new EventEmitter<void>();

  isLoaded = false;
  progress = 0;
  currentStatus = 'Initializing...';
  activeTextIndex = 0;

  carouselTexts = [
    'Crafting Digital Excellence',
    'Where Code Meets Luxury',
    'Precision Engineering',
    'Innovation at Light Speed',
    'Enterprise-Grade Quality'
  ];

  loadingStages = [
    { progress: 20, status: 'Loading Assets...' },
    { progress: 40, status: 'Initializing Components...' },
    { progress: 60, status: 'Establishing Connection...' },
    { progress: 80, status: 'Preparing Experience...' },
    { progress: 100, status: 'Welcome to Excellence' }
  ];

  ngOnInit(): void {
    this.startLoading();
    this.startTextCarousel();
  }

  ngAfterViewInit(): void {
    this.initAnimations();
  }

  private startLoading(): void {
    let currentStage = 0;
    
    const loadInterval = setInterval(() => {
      if (currentStage < this.loadingStages.length) {
        const stage = this.loadingStages[currentStage];
        
        // Smooth progress animation
        const progressAnimation = setInterval(() => {
          if (this.progress < stage.progress) {
            this.progress += 1;
          } else {
            clearInterval(progressAnimation);
          }
        }, 15);
        
        this.currentStatus = stage.status;
        currentStage++;
      } else {
        clearInterval(loadInterval);
        setTimeout(() => {
          this.completeLoading();
        }, 150);
      }
    }, 350);
  }

  private startTextCarousel(): void {
    setInterval(() => {
      this.activeTextIndex = (this.activeTextIndex + 1) % this.carouselTexts.length;
    }, 2000);
  }

  private initAnimations(): void {
    // Logo animation
    gsap.timeline({ repeat: -1, yoyo: true })
      .to('.letter-n', {
        duration: 2,
        rotationY: 360,
        ease: 'power2.inOut'
      })
      .to('.letter-x', {
        duration: 2,
        rotationY: -360,
        ease: 'power2.inOut'
      }, '-=1.5');

    // Floating orbs
    gsap.to('.orb', {
      y: 'random(-50, 50)',
      x: 'random(-50, 50)',
      duration: 'random(3, 5)',
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      stagger: {
        each: 0.2,
        from: 'random'
      }
    });

    // Corner details animation
    gsap.to('.corner-line', {
      scaleX: 1,
      scaleY: 1,
      duration: 1,
      stagger: 0.1,
      ease: 'power2.out'
    });

    // Sound wave animation
    gsap.to('.wave-bar', {
      scaleY: 'random(0.3, 1)',
      duration: 0.3,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      stagger: {
        each: 0.05,
        from: 'center'
      }
    });
  }

  private completeLoading(): void {
    // Final animation
    gsap.timeline()
      .to('.loader-logo', {
        scale: 1.2,
        duration: 0.5,
        ease: 'power2.in'
      })
      .to('.loader-logo', {
        scale: 0,
        opacity: 0,
        duration: 0.5,
        ease: 'power2.out'
      })
      .to('.premium-loader', {
        opacity: 0,
        duration: 0.8,
        ease: 'power2.inOut',
        onComplete: () => {
          this.isLoaded = true;
          this.loadComplete.emit();
        }
      });
  }
}