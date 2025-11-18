import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { SupabaseService } from '../services/supabase-service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private supabase: SupabaseService, private router: Router) {}
  canActivate(): boolean {
    const user = this.supabase.getCurrentUser();
    if (!user) {
      this.router.navigateByUrl('/login');
      return false;
    }
    return true;
  }
}