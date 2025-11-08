import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Testimonial {
  quote: string;
  content: string;
  name: string;
  position: string;
  avatar: string;
  website: string;
}

@Component({
  selector: 'app-client-testimonials',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './client-testimonials.component.html',
  styleUrls: ['./client-testimonials.component.scss']
})
export class ClientTestimonialsComponent {
  
  testimonials: Testimonial[] = [
    {
      quote: 'Nexus Development has been Instrumental in Transforming our Online Presence.',
      content: 'Their team\'s expertise in web development and design resulted in a visually stunning and user-friendly cybersecurity website. The modern design and seamless functionality have significantly improved our digital presence and client engagement.',
      name: 'Manjunatha Konteker Rajappa',
      position: 'Founder & CEO of DhiWare Technologies',
      avatar: 'assets/images/Manjunatha Konteker Rajappa.jpg',
      website: 'https://www.dhiwaretech.com'
    },
    {
      quote: 'Outstanding AI Development and User Experience Design.',
      content: 'Nexus Development delivered an exceptional web platform for elderly assistance. Their expertise in website development and intuitive UI/UX design created a solution that truly makes a difference in supporting independent aging.',
      name: 'Arun Velayudhan',
      position: 'Elderly Assist Team',
      avatar: 'assets/images/Arun Velayudhan.jpeg',
      website: 'https://elderlyassist.ai'
    }
  ];

  currentTestimonialIndex = 0;

  openWebsite(url: string): void {
    window.open(url, '_blank', 'noopener,noreferrer');
  }

  getCurrentTestimonial(): Testimonial {
    return this.testimonials[this.currentTestimonialIndex];
  }

  nextTestimonial(): void {
    this.currentTestimonialIndex = (this.currentTestimonialIndex + 1) % this.testimonials.length;
  }

  previousTestimonial(): void {
    this.currentTestimonialIndex = this.currentTestimonialIndex === 0 
      ? this.testimonials.length - 1 
      : this.currentTestimonialIndex - 1;
  }

  selectTestimonial(index: number): void {
    this.currentTestimonialIndex = index;
  }
}