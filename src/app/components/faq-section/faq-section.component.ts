import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

interface FaqItem {
  id: number;
  index: number;
  displayNumber: string;
  question: string;
  answer: string;
}

@Component({
  selector: 'app-faq-section',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './faq-section.component.html',
  styleUrls: ['./faq-section.component.scss']
})
export class FaqSectionComponent implements OnInit {
  openFaqIndex: number | null = null; // No FAQ is initially expanded
  leftColumnFaqs: FaqItem[] = [];
  rightColumnFaqs: FaqItem[] = [];

  private faqItems: FaqItem[] = [
    {
      id: 1,
      index: 0,
      displayNumber: '01',
      question: 'What services does Nexus Development provide?',
      answer: 'Nexus Development offers a comprehensive range of services including design, engineering, and project management. We specialize in user experience design, web development, mobile app development, custom software development, branding and identity, and digital transformation solutions.'
    },
    {
      id: 2,
      index: 1,
      displayNumber: '02',
      question: 'How can Nexus Development help my business?',
      answer: 'We help businesses by providing comprehensive digital solutions that enhance user experience, improve operational efficiency, and drive growth through innovative technology implementations. Our team works closely with you to understand your unique challenges and deliver tailored solutions.'
    },
    {
      id: 3,
      index: 2,
      displayNumber: '03',
      question: 'What industries does Nexus Development work with?',
      answer: 'We work across various industries including technology, healthcare, finance, e-commerce, education, manufacturing, and many others. Our adaptable approach allows us to understand and serve diverse business needs regardless of industry vertical.'
    },
    {
      id: 4,
      index: 3,
      displayNumber: '04',
      question: 'How long does it take to complete a project with Nexus Development?',
      answer: 'Project timelines vary depending on scope and complexity. Typically, small projects take 2-4 weeks, medium projects 1-3 months, and large-scale projects 3-6 months. We provide detailed timelines and milestones during our initial consultation to set clear expectations.'
    },
    {
      id: 5,
      index: 4,
      displayNumber: '05',
      question: 'Do you offer ongoing support and maintenance after the project is completed?',
      answer: 'Yes, we provide comprehensive post-launch support including bug fixes, security updates, performance optimization, feature enhancements, and ongoing maintenance to ensure your solution continues to meet your evolving business needs and stays current with technology trends.'
    },
    {
      id: 6,
      index: 5,
      displayNumber: '06',
      question: 'Can you work with existing design or development frameworks?',
      answer: 'Absolutely! We are experienced in working with various existing frameworks and systems. We can integrate seamlessly with your current technology stack, enhance existing solutions, or help you migrate to more modern and efficient frameworks as needed.'
    },
    {
      id: 7,
      index: 6,
      displayNumber: '07',
      question: 'How involved will I be in the project development process?',
      answer: 'We believe in collaborative development and transparent communication. You will be actively involved throughout the process with regular check-ins, milestone reviews, feedback sessions, and progress updates to ensure the final product aligns perfectly with your vision and requirements.'
    },
    {
      id: 8,
      index: 7,
      displayNumber: '08',
      question: 'Can you help with website or app maintenance and updates?',
      answer: 'Yes, we offer comprehensive maintenance services including content updates, security patches, performance monitoring, feature additions, bug fixes, and technical support to keep your digital presence current, secure, and performing optimally.'
    }
  ];

  ngOnInit(): void {
    this.initializeFaqColumns();
  }

  /**
   * Initialize FAQ items into left and right columns
   */
  private initializeFaqColumns(): void {
    this.leftColumnFaqs = this.faqItems.slice(0, 4); // Items 01-04
    this.rightColumnFaqs = this.faqItems.slice(4, 8); // Items 05-08
  }

  /**
   * Toggle the FAQ item expansion state
   * @param index - The index of the FAQ item to toggle
   */
  toggleFaq(index: number): void {
    // Prevent invalid indices
    if (index < 0 || index >= this.faqItems.length) {
      return;
    }

    if (this.openFaqIndex === index) {
      // If clicking on the currently open FAQ, close it
      this.openFaqIndex = null;
    } else {
      // Open the clicked FAQ (close any other open FAQ)
      this.openFaqIndex = index;
    }
  }

  /**
   * Check if a FAQ item is currently expanded
   * @param index - The index of the FAQ item to check
   * @returns boolean indicating if the FAQ is expanded
   */
  isFaqExpanded(index: number): boolean {
    return this.openFaqIndex === index;
  }

  /**
   * Get the FAQ item data by index
   * @param index - The index of the FAQ item
   * @returns FaqItem or undefined if index is invalid
   */
  getFaqItem(index: number): FaqItem | undefined {
    return this.faqItems[index];
  }

  /**
   * TrackBy function for ngFor optimization
   * @param index - The index of the item
   * @param item - The FAQ item
   * @returns unique identifier for tracking
   */
  trackByFaqId(index: number, item: FaqItem): number {
    return item.id;
  }

  /**
   * Handle keyboard events for accessibility
   * @param event - The keyboard event
   * @param faqIndex - The index of the FAQ item
   */
  onKeyDown(event: KeyboardEvent, faqIndex: number): void {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.toggleFaq(faqIndex);
    }
  }
}
