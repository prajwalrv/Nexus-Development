import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

interface Feature {
  title: string;
  description: string;
  iconPath: string;
  highlights: string[];
}

@Component({
  selector: 'app-why-choose-nexus',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './why-choose-nexus.component.html',
  styleUrls: ['./why-choose-nexus.component.scss']
})
export class WhyChooseNexusComponent {
  
  allFeatures: Feature[] = [
    {
      title: 'Technical Expertise',
      description: 'Our team consists of highly skilled professionals with deep understanding of modern technologies and best practices.',
      iconPath: 'assets/icons/expertise-icon.svg',
      highlights: ['Latest Technologies', 'Best Practices', 'Continuous Learning']
    },
    {
      title: 'Client-Centric Approach',
      description: 'We prioritize our clients and their unique needs, tailoring solutions that align with your business goals.',
      iconPath: 'assets/icons/client-centric-icon.svg',
      highlights: ['Custom Solutions', 'Direct Communication', 'Your Success Focus']
    },
    {
      title: 'Results-Driven Solutions',
      description: 'We focus on delivering measurable results that drive business growth and provide competitive advantages.',
      iconPath: 'assets/icons/results-driven-icon.svg',
      highlights: ['Business Growth', 'Performance Metrics', 'ROI Focused']
    },
    {
      title: 'Long-term Partnership',
      description: 'We build lasting relationships, providing ongoing support and updates to ensure your digital products thrive.',
      iconPath: 'assets/icons/collaborative-icon.svg',
      highlights: ['Ongoing Support', 'Regular Updates', 'Strategic Guidance']
    }
  ];

  onStartYourProjectClick() {
    // Navigate to contact page
    this.router.navigate(['/contact']);
  }

  constructor(private router: Router) { }
}
