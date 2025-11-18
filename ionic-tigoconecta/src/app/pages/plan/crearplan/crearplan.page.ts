import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { SupabaseService } from 'src/app/services/supabase-service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-crearplan',
  standalone: true,
  templateUrl: './crearplan.page.html',
  styleUrls: ['./crearplan.page.scss'],
  imports: [IonicModule, CommonModule, FormsModule]
})
export class CrearplanPage {

  nombre = '';
  precio: number | null = null;
  segmento = '';
  descripcion = '';
  fotoTomada: string | null = null;   
  imagenUrlFinal: string | null = null;

  cargando = false;

  constructor(
    private sb: SupabaseService,
    private router: Router
  ) {}

  // ⬇️ CORREGIDO: Manejo seguro de la cámara
  async tomarFoto() {
    try {
      const foto = await this.sb.takePhotoAsDataUrl();
      this.fotoTomada = foto;
    } catch (error: any) {

      // Si el usuario cancela la cámara → NO ES ERROR
      if (error?.message?.includes('cancel') || error?.message?.includes('User cancelled')) {
        console.log("El usuario canceló la cámara.");
        return;
      }

      // Otros errores sí se muestran
      console.error("Error al tomar foto", error);
    }
  }

  async crearPlan() {
    if (!this.nombre || !this.precio || !this.segmento) {
      alert("Todos los campos obligatorios deben llenarse");
      return;
    }

    this.cargando = true;

    // Subir imagen solo si fue tomada
    if (this.fotoTomada) {
      const filename = `plan_${Date.now()}.jpg`;
      this.imagenUrlFinal = await this.sb.cargarPlanImage(this.fotoTomada, filename);
    }

    const nuevoPlan = {
      nombre: this.nombre,
      precio: this.precio,
      segmento: this.segmento,
      descripcion: this.descripcion,
      imagen_url: this.imagenUrlFinal,
      activo: true
    };

    await this.sb.agregarPlan(nuevoPlan);
    this.cargando = false;

    this.router.navigate(['/asesor/dashboard']);
  }
}
