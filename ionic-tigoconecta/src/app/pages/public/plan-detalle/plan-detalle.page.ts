import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule, Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { SupabaseService } from 'src/app/services/supabase-service';

@Component({
  selector: 'app-plan-detalle',
  standalone: true,
  templateUrl: './plan-detalle.page.html',
  styleUrls: ['./plan-detalle.page.scss'],
  imports: [IonicModule, CommonModule]
})
export class PlanDetallePage {

  plan: any = null;
  rol: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private sb: SupabaseService,
    private router: Router,
    private location: Location
  ) {}

  async ionViewWillEnter() {
    await this.cargarRol();
    await this.cargarPlan();
  }

  async cargarRol() {
    const perfil = await this.sb.obtenerPerfilActual();
    this.rol = perfil?.rol ?? null;
  }

  async cargarPlan() {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) { return; }

    this.plan = await this.sb.obtenerPlanPorID(id);
  }

  // ----------- ROLE CHECKS -----------
  esUsuario() {
    return this.rol === 'usuario_registrado';
  }

  esInvitado() {
    return !this.rol;
  }

  // ----------- ACCIONES -----------
  async contratar() {
    const user = this.sb.getCurrentUser();
    if (!user) return;

    const contrato = await this.sb.crearContrato(user.id, this.plan.id);

    // Redirigir al chat del cliente
    this.router.navigate(['/chat-cliente', contrato.id]);
  }

  irLogin() {
    this.router.navigate(['/login']);
  }

  volver() {
    this.location.back();
  }

}
