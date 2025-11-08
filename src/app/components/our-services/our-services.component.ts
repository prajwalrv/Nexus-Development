import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

interface Service {
  title: string;
  shortDescription: string;
  description: string;
  iconPath: string;
  iconAlt: string;
  tags: string[];
  features: string[];
}

interface ProcessStep {
  title: string;
  description: string;
}

@Component({
  selector: 'app-our-services',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './our-services.component.html',
  styleUrls: ['./our-services.component.scss']
})
export class OurServicesComponent {
  constructor(private router: Router) {}
  // Section content
  sectionTitle = 'Our Services';
  sectionSubtitle = 'Transform your brand with our innovative digital solutions that captivate and engage your audience.';
  
  // Active service tracking
  activeServiceIndex = 0;

  // Services data with enhanced information
  services: Service[] = [
    {
      title: 'Design',
      shortDescription: 'User-centric design solutions',
      description: 'At Nexus Development, our design team is passionate about creating stunning, user-centric designs that captivate your audience and elevate your brand. We believe that great design is not just about aesthetics; it\'s about creating seamless and intuitive user experiences that drive results.',
      iconPath: 'assets/images/design-icon.svg',
      iconAlt: 'Design service icon representing creative design solutions',
      tags: ['UI/UX', 'Brand Identity', 'Prototyping'],
      features: [
        'User Research & Analysis',
        'Wireframing & Prototyping',
        'Visual Design & Branding',
        'Responsive Design',
        'Usability Testing',
        'Design System Creation'
      ]
    },
    {
      title: 'Engineering',
      shortDescription: 'Robust & scalable development',
      description: 'Our engineering team combines technical expertise with a passion for innovation to build robust and scalable digital solutions. We leverage the latest technologies and best practices to deliver high-performance applications tailored to your specific needs and business objectives.',
      iconPath: 'assets/images/engineering-icon.svg',
      iconAlt: 'Engineering service icon representing technical development',
      tags: ['Frontend', 'Backend', 'Mobile'],
      features: [
        'Custom Web Applications',
        'Mobile App Development',
        'API Development & Integration',
        'Database Design & Optimization',
        'Performance Optimization',
        'Security Implementation'
      ]
    },
    {
      title: 'Project Management',
      shortDescription: 'Seamless project delivery',
      description: 'Our experienced project management team ensures that your projects are delivered on time, within budget, and according to your specifications. We follow industry-standard methodologies and employ effective communication and collaboration tools to keep you informed throughout the development process.',
      iconPath: 'assets/images/project-management-icon.svg',
      iconAlt: 'Project management icon representing organized workflow management',
      tags: ['Agile', 'Scrum', 'DevOps'],
      features: [
        'Project Planning & Strategy',
        'Resource Allocation',
        'Risk Management',
        'Quality Assurance',
        'Timeline Management',
        'Client Communication'
      ]
    }
  ];
  
  // Development process steps
  processSteps: ProcessStep[] = [
    {
      title: 'Discovery & Planning',
      description: 'We start by understanding your needs, goals, and target audience to create a comprehensive project roadmap.'
    },
    {
      title: 'Design & Prototyping',
      description: 'Our design team creates wireframes, mockups, and interactive prototypes to visualize your solution.'
    },
    {
      title: 'Development & Testing',
      description: 'We build your solution using best practices, with continuous testing to ensure quality and performance.'
    },
    {
      title: 'Launch & Support',
      description: 'We deploy your solution and provide ongoing support, maintenance, and optimization services.'
    }
  ];

  // Active service management
  setActiveService(index: number): void {
    this.activeServiceIndex = index;
  }

  // Button click handlers
  onLearnMore(serviceTitle: string): void {
    console.log(`Learn more clicked for: ${serviceTitle}`);
    // Implement navigation or modal logic here
  }
  
  onGetStarted(serviceTitle: string): void {
    console.log(`Get started clicked for: ${serviceTitle}`);
    // Navigate to contact page; include service title as a query param so contact page can prefill/contextualize
    this.router.navigate(['/contact'], { queryParams: { service: serviceTitle } });
  }
  

  // Track by function for ngFor performance
  trackByService(index: number, service: Service): string {
    return service.title;
  }
  
  trackByStep(index: number, step: ProcessStep): string {
    return step.title;
  }
}
