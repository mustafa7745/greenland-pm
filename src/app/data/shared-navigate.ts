import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID, inject } from '@angular/core';
import { Router } from '@angular/router';
export class SharedNavigate {
  public router = inject(Router);
  navigateToLogin() {
    this.router.navigate(['/login'], { replaceUrl: true });
  }
  navigateToDashboard() {
    this.router.navigate(['/dashboard'], { replaceUrl: true });
  }
  navigateToHome() {
    this.router.navigate([''], { replaceUrl: true });
  }
  navigateToPermissions() {
    this.router.navigate(['/permission'], { replaceUrl: true });
  }
}
