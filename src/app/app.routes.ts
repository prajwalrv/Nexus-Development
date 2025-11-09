import { Routes, ExtraOptions } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ServicesComponent } from './pages/services/services.component';

// Set default scroll behavior for all routes
export const routerOptions: ExtraOptions = {
  scrollPositionRestoration: 'enabled',
  anchorScrolling: 'enabled'
};
import { WorkComponent } from './pages/work/work.component';
import { ProcessComponent } from './pages/process/process.component';
import { AboutComponent } from './pages/about/about.component';
import { CareersComponent } from './pages/careers/careers.component';
import { ContactComponent } from './pages/contact/contact.component';
import { PricingComponent } from './pages/pricing/pricing.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: 'Home - Nexus Development'
  },
  {
    path: 'services',
    component: ServicesComponent,
    title: 'Services - Nexus Development'
  },
  {
    path: 'work',
    component: WorkComponent,
    title: 'Our Work - Nexus Development'
  },
  {
    path: 'process',
    component: ProcessComponent,
    title: 'Our Process - Nexus Development'
  },
  {
    path: 'about',
    component: AboutComponent,
    title: 'About Us - Nexus Development'
  },
  {
    path: 'careers',
    component: CareersComponent,
    title: 'Careers - Nexus Development'
  },
  {
    path: 'pricing',
    component: PricingComponent,
    title: 'Pricing - Nexus Development'
  },
  {
    path: 'contact',
    component: ContactComponent,
    title: 'Contact Us - Nexus Development'
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }
];
