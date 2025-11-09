import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

interface NavItem {
  label: string;
  route: string;
  active: boolean;
}

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  isMenuOpen = false;
  
  navigationItems: NavItem[] = [
    { label: 'Home', route: '/', active: true },
    { label: 'Services', route: '/services', active: false },
    { label: 'Work', route: '/work', active: false },
    { label: 'Process', route: '/process', active: false },
    { label: 'Pricing', route: '/pricing', active: false },
    { label: 'About', route: '/about', active: false },
    { label: 'Careers', route: '/careers', active: false }
  ];

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Set active state based on current route
    this.updateActiveState(this.router.url);

    // Listen to route changes
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        this.updateActiveState(event.urlAfterRedirects);
      });
  }

  private updateActiveState(url: string): void {
    this.navigationItems.forEach(item => {
      item.active = (url === item.route || (item.route !== '/' && url.startsWith(item.route)));
    });
  }

  onNavigationClick(item: NavItem): void {
    this.router.navigate([item.route]).then(() => {
      window.scrollTo(0, 0);
      this.closeMenu();
    });
  }

  onLogoClick(): void {
    if (this.router.url === '/') {
      window.location.reload();
    } else {
      this.router.navigate(['/']).then(() => {
        window.scrollTo(0, 0);
      });
    }
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu(): void {
    this.isMenuOpen = false;
  }

  onContactClick(): void {
    this.router.navigate(['/contact']);
  }
}
