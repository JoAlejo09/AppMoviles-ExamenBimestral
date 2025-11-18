import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SupabaseService } from 'src/app/services/supabase-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, ReactiveFormsModule],
})
export class LoginPage{
  form: FormGroup;
  cargando = false;
  errorMsg = '';

  constructor(
    private fb: FormBuilder,
    private sb: SupabaseService,
    private router: Router
  ) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  async login() {
    if (this.form.invalid) return;

    this.errorMsg = '';
    this.cargando = true;

    const { email, password } = this.form.value;

    try {
      await this.sb.signIn(email, password);
      const perfil = await this.sb.obtenerPerfilActual();

      if (perfil?.rol === 'asesor_comercial') {
        this.router.navigate(['/asesor/dashboard']);
      } else {
        this.router.navigate(['/']);
      }
    } catch (e) {
      this.errorMsg = 'Error al iniciar sesión';
    }

    this.cargando = false;
  }

  irRegistro() {
    this.router.navigate(['/register']);
  }
}
