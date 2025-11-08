import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { OurServicesComponent } from '../../components/our-services/our-services.component';

@Component({
  selector: 'app-services',
  imports: [RouterLink, OurServicesComponent],
  templateUrl: './services.component.html',
  styleUrl: './services.component.scss'
})
export class ServicesComponent {}
