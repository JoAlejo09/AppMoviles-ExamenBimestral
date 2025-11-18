import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { SupabaseService } from 'src/app/services/supabase-service';

@Component({
  selector: 'app-asesor-dashboard',
  templateUrl: './asesor-dashboard.page.html',
  styleUrls: ['./asesor-dashboard.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule],
})
export class AsesorDashboardPage implements OnInit {

  planes: any[] = [];
  cargando = false;

  constructor(
    private sb: SupabaseService,
    private router: Router
  ) {}

  async ngOnInit() {
    await this.cargarPlanes();
  }

  async cargarPlanes() {
    this.cargando = true;
    const client = this.sb.getClient();
    const { data, error } = await client
      .from('planes_moviles')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error) {
      this.planes = data || [];
    }
    this.cargando = false;
  }

  crearPlan() {
    this.router.navigate(['/asesor/plan-form']);
  }

  editarPlan(plan: any) {
    this.router.navigate(['/asesor/plan-form', plan.id]);
  }

  async eliminarPlan(plan: any) {
    const confirmar = confirm('¿Eliminar este plan?');
    if (!confirmar) return;

    await this.sb.eliminarPlan(plan.id);
    await this.cargarPlanes();
  }

  irContratosPendientes() {
    this.router.navigate(['/asesor/contratos']);
  }

  irPerfil() {
    this.router.navigate(['/asesor/perfil']);
  }
  async logout() {
  await this.sb.signOut();
  this.router.navigate(['/home']);
}
}
