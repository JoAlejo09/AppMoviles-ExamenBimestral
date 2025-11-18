import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { SupabaseService } from '../services/supabase-service';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  imports: [IonicModule, CommonModule],
})
export class HomePage {

  rolActual: string | null = null;
  rolCargado = false;   // ← controla cuándo mostrar botones
  cargando = false;

  constructor(
    private sb: SupabaseService,
    private router: Router
  ) {}

  /**
   * Se ejecuta SIEMPRE que la página aparece en pantalla.
   * Esto incluye entrar después de iniciar sesión o cerrar sesión.
   */
  async ionViewWillEnter() {
    this.cargando = true;
    await this.obtenerRol();
    this.cargando = false;
    this.rolCargado = true; // ← ya se puede mostrar contenido
  }

  async obtenerRol() {
    const perfil = await this.sb.obtenerPerfilActual();
    this.rolActual = perfil?.rol ?? null;
  }

  // Lógica según rol
  esInvitado() { return !this.rolActual; }
  esUsuario() { return this.rolActual === 'usuario_registrado'; }
  esAsesor() { return this.rolActual === 'asesor_comercial'; }

  ir(ruta: string) {
    this.router.navigate([ruta]);
  }

  async logout() {
    await this.sb.signOut();
    this.rolActual = null;
    this.rolCargado = true;

    // Forzar recarga de la página home
    this.router.navigateByUrl('/home', { replaceUrl: true });
  }
}
