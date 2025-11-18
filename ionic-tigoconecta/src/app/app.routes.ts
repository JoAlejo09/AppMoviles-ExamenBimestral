import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth-guard';
import { RoleGuard } from './guards/roles-guard';

export const routes: Routes = [

  {
    path: 'home',
    loadComponent: () =>
      import('./home/home.page').then((m) => m.HomePage),
  },

  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },

  {
    path: 'login',
    loadComponent: () =>
      import('./pages/auth/login/login.page').then((m) => m.LoginPage),
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./pages/auth/register/register.page').then((m) => m.RegisterPage),
  },


  {
    path: 'catalogo',
    loadComponent: () =>
      import('./pages/public/catalogo/catalogo.page').then((m) => m.CatalogoPage),
  },
  {
    path: 'plan/:id',
    loadComponent: () =>
      import('./pages/public/plan-detalle/plan-detalle.page').then((m) => m.PlanDetallePage),
  },

  {
    path: 'mis-contratos',
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['usuario_registrado'] },
    loadComponent: () =>
      import('./pages/contratos/mis-contratos/mis-contratos.page').then((m) => m.MisContratosPage),
  },
  {
    path: 'chat-cliente/:contratoId',
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['usuario_registrado'] },
    loadComponent: () =>
      import('./pages/chats/chat-cliente/chat-cliente.page').then((m) => m.ChatClientePage),
  },
  {
    path: 'perfil-usuario',
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['usuario_registrado'] },
    loadComponent: () =>
      import('./pages/usuario/perfil-usuario/perfil-usuario.page').then((m) => m.PerfilUsuarioPage),
  },

  {
    path: 'asesor/dashboard',
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['asesor_comercial'] },
    loadComponent: () =>
      import('./pages/asesor/asesor-dashboard/asesor-dashboard.page').then((m) => m.AsesorDashboardPage),
  },

  {
    path: 'asesor/plan-form',
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['asesor_comercial'] },
    loadComponent: () =>
      import('./pages/plan/crearplan/crearplan.page').then((m) => m.CrearplanPage),
  },
  {
    path: 'asesor/plan-form/:id',
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['asesor_comercial'] },
    loadComponent: () =>
      import('./pages/plan/crearplan/crearplan.page').then((m) => m.CrearplanPage),
  },

  {
    path: 'asesor/contratos-pendientes',
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['asesor_comercial'] },
    loadComponent: () =>
      import('./pages/contratos/contratos-pendientes/contratos-pendientes.page').then((m) => m.ContratosPendientesPage),
  },

  {
    path: 'asesor/chat/:contratoId',
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['asesor_comercial'] },
    loadComponent: () =>
      import('./pages/chats/chat-asesor/chat-asesor.page').then((m) => m.ChatAsesorPage),
  },

  {
    path: 'asesor/perfil-asesor',
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['asesor_comercial'] },
    loadComponent: () =>
      import('./pages/asesor/perfil-asesor/perfil-asesor.page').then((m) => m.PerfilAsesorPage),
  },

  {
    path: '**',
    redirectTo: 'home',
  },
];
