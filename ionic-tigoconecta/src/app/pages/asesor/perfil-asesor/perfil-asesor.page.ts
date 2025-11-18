import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { SupabaseService } from 'src/app/services/supabase-service';

@Component({
  selector: 'app-perfil-asesor',
  templateUrl: './perfil-asesor.page.html',
  styleUrls: ['./perfil-asesor.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule],
})
export class PerfilAsesorPage implements OnInit {

  perfil: any = null;

  constructor(private sb: SupabaseService) {}

  async ngOnInit() {
    this.perfil = await this.sb.obtenerPerfilActual();
  }
}
