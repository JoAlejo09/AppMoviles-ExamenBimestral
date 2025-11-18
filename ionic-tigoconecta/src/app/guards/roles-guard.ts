import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { SupabaseService } from '../services/supabase-service'; 

@Injectable({ providedIn: 'root' })
export class RoleGuard implements CanActivate {
  
  constructor(
    private sb: SupabaseService,
    private router: Router
  ) {}

  async canActivate(route: ActivatedRouteSnapshot) {
    const user = this.sb.getCurrentUser();
    if (!user) return false;

    const perfil = await this.sb.obtenerPerfilActual();
    const rolesPermitidos = route.data['roles'] as string[];

    if (!rolesPermitidos.includes(perfil.rol)) {
      this.router.navigate(['/']);
      return false;
    }

    return true;
  }
}
