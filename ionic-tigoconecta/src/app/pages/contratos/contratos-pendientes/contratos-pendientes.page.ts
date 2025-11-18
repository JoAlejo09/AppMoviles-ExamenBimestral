import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { SupabaseService } from 'src/app/services/supabase-service';

@Component({
  selector: 'app-contratos-pendientes',
  templateUrl: './contratos-pendientes.page.html',
  styleUrls: ['./contratos-pendientes.page.scss'],
  standalone: true,
   imports: [IonicModule, CommonModule],
})
export class ContratosPendientesPage implements OnInit {

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
    this.contratos = await this.sb.obtenerContratosPendientes() || [];
    this.cargando = false;
  }

  abrirChat(c: any) {
    this.router.navigate(['/asesor/chat', c.id]);
  }
}
