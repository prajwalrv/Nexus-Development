import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

interface Service {
  id: string;
  label: string;
  selected: boolean;
}

@Component({
  selector: 'app-contact-us',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss']
})
export class ContactUsComponent implements OnInit {
  contactForm!: FormGroup;
  budgetValue: number = 15000;

  services: Service[] = [
    { id: 'web', label: 'Web Development', selected: false },
    { id: 'mobile', label: 'Mobile Apps', selected: false },
    { id: 'design', label: 'UI/UX Design', selected: false },
    { id: 'consulting', label: 'Consulting', selected: false }
  ];

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.contactForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      message: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  get fullName() {
    return this.contactForm.get('fullName');
  }

  get email() {
    return this.contactForm.get('email');
  }

  get message() {
    return this.contactForm.get('message');
  }

  getSelectedServices(): string {
    return this.services
      .filter(service => service.selected)
      .map(service => service.label)
      .join(', ');
  }

  toggleService(id: string): void {
    const service = this.services.find(s => s.id === id);
    if (service) {
      service.selected = !service.selected;
    }
  }

  onBudgetChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.budgetValue = parseInt(target.value);
  }

  formatBudget(value: number): string {
    if (value >= 1000) {
      const thousands = value / 1000;
      return thousands % 1 === 0 
        ? `$${thousands.toFixed(0)}K` 
        : `$${thousands.toFixed(1)}K`;
    }
    return `$${value}`;
  }

  async onSubmit(): Promise<void> {
    if (this.contactForm.valid) {
      try {
        const formData = {
          access_key: '35178444-30eb-4d7e-bf1e-5bb3e8e8b818',
          subject: 'New Contact Form Submission - Nexus Development',
          from_name: this.contactForm.get('fullName')?.value,
          email: this.contactForm.get('email')?.value,
          message: this.contactForm.get('message')?.value,
          budget: this.budgetValue.toString(),
          selected_services: this.getSelectedServices()
        };

        const response = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify(formData)
        });

        const data = await response.json();
        
        if (response.ok) {
          console.log('Form submitted successfully:', data);
          this.contactForm.reset();
          // Reset services
          this.services.forEach(service => service.selected = false);
          // Reset budget
          this.budgetValue = 15000;
          this.toastr.success(
            'We will get back to you soon!',
            'Thank you for contacting Nexus Development Pvt Ltd',
            {
              timeOut: 5000,
              positionClass: 'toast-top-right',
              progressBar: true,
              closeButton: true
            });
        } else {
          console.error('Form submission failed:', data);
          this.toastr.error(
            'Please try again later.',
            'Form submission failed',
            {
              timeOut: 5000,
              positionClass: 'toast-top-right',
              progressBar: true,
              closeButton: true
            });
        }
      } catch (error) {
        console.error('Error submitting form:', error);
        alert('Sorry, there was an error submitting the form. Please try again.');
      }
      this.contactForm.reset();
      this.services.forEach(s => s.selected = false);
      this.budgetValue = 15000;
    }
  }
}
