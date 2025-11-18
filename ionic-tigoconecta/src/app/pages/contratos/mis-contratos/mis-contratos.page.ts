import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { SupabaseService } from 'src/app/services/supabase-service';

@Component({
  selector: 'app-mis-contratos',
  templateUrl: './mis-contratos.page.html',
  styleUrls: ['./mis-contratos.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule],

})
export class MisContratosPage implements OnInit {

  contratos: any[] = [];
  cargando = false;

  constructor(
    private sb: SupabaseService,
    private router: Router
  ) {}

  async ngOnInit() {
    await this.cargar();
  }

  async cargar() {
    this.cargando = true;
    const user = this.sb.getCurrentUser();
    if (!user) {
      this.cargando = false;
      return;
    }
    this.contratos = await this.sb.obtenerContratosPorUser(user.id) || [];
    this.cargando = false;
  }

  abrirChat(contrato: any) {
    this.router.navigate(['/chat', contrato.id]);
  }
}
