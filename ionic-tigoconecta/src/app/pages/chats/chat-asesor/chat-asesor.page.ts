import { Component, OnInit, OnDestroy } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SupabaseService } from 'src/app/services/supabase-service';
@Component({
  selector: 'app-chat-asesor',
  templateUrl: './chat-asesor.page.html',
  styleUrls: ['./chat-asesor.page.scss'],
  standalone: true,
   imports: [IonicModule, CommonModule, ReactiveFormsModule],
})
export class ChatAsesorPage implements OnInit, OnDestroy {

  contratoId!: string;
  mensajes: any[] = [];
  form: FormGroup;
  cargando = false;
  canalRealtime: any;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private sb: SupabaseService
  ) {
    this.form = this.fb.group({
      mensaje: ['', Validators.required]
    });
  }

  async ngOnInit() {
    this.contratoId = this.route.snapshot.paramMap.get('contratoId') || '';
    await this.cargarMensajes();
    this.suscribirMensajes();
  }

  ngOnDestroy() {
    if (this.canalRealtime) {
      this.canalRealtime.unsubscribe();
    }
  }

  async cargarMensajes() {
    this.cargando = true;
    this.mensajes = await this.sb.obtenerMensajesByContrato(this.contratoId) || [];
    this.cargando = false;
  }

  suscribirMensajes() {
    this.canalRealtime = this.sb.iniciarConversacion(this.contratoId, (nuevo) => {
      this.mensajes = [...this.mensajes, nuevo];
    });
  }

  esMio(m: any) {
    const user = this.sb.getCurrentUser();
    return user && m.emisor_id === user.id;
  }

  async enviar() {
    if (this.form.invalid) return;

    const user = this.sb.getCurrentUser();
    if (!user) return;

    const texto = this.form.value.mensaje;
    this.form.reset();
    await this.sb.enviarMensaje(this.contratoId, user.id, texto);
  }
}
