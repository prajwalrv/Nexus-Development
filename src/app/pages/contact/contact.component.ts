import { Component } from '@angular/core';
import { ContactUsComponent } from '../../components/contact-us/contact-us.component';

@Component({
  selector: 'app-contact',
  imports: [ContactUsComponent],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {}
