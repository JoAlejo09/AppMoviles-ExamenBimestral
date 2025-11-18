import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { SupabaseService } from 'src/app/services/supabase-service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, ReactiveFormsModule],
})
export class RegisterPage {
 
  form: FormGroup;
  cargando = false;
  errorMsg = '';

  constructor(
    private fb: FormBuilder,
    private sb: SupabaseService,
    private router: Router
  ) {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  async registrar() {
    if (this.form.invalid) return;

    this.errorMsg = '';
    this.cargando = true;

    const { nombre, email, password } = this.form.value;

    try {
      await this.sb.signUp(email, password, nombre);
      this.router.navigate(['/login']);
    } catch (e) {
      this.errorMsg = 'Error al registrarse';
    }

    this.cargando = false;
  }
}
