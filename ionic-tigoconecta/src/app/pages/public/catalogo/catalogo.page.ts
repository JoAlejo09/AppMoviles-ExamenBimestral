import { Component, OnInit, OnDestroy } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { SupabaseService } from 'src/app/services/supabase-service';
@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.page.html',
  styleUrls: ['./catalogo.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule]
})
export class CatalogoPage implements OnInit, OnDestroy {

  planes: any[] = [];
  cargando = false;
  canalRealtime: any;

  constructor(private sb: SupabaseService, private router: Router) {}

  async ngOnInit() {
    await this.cargar();
    this.escucharCambios();
  }

  ngOnDestroy() {
    if (this.canalRealtime) this.canalRealtime.unsubscribe();
  }

  async cargar() {
    this.cargando = true;
    this.planes = await this.sb.obtenerPlanesActivos() || [];
    this.cargando = false;
  }

  irDetalle(id: string) {
    this.router.navigate(['/plan', id]);
  }

  escucharCambios() {
    this.canalRealtime = this.sb.realizarCambiosPlanes(async () => {
      await this.cargar();
    });
  }
}