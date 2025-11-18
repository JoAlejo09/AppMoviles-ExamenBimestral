# AppMoviles-ExamenBimestral
# 📱 Tigo Conecta – Aplicación Móvil Ionic + Supabase
**Creado por: _José Pila_**

Aplicación móvil desarrollada en **Ionic Angular (Standalone Components)** que permite a TIGO gestionar y promocionar planes móviles, contratar servicios y comunicarse mediante chat en tiempo real entre usuarios y asesores comerciales.

---

## 🎯 Objetivos del Proyecto

- Implementar un sistema de **roles** con autenticación segura.  
- Administrar planes móviles (CRUD).  
- Integrar **Supabase Storage** para subir imágenes.  
- Implementar **chat en tiempo real** mediante Supabase Realtime.  
- Desarrollar navegación moderna usando **Standalone Components**.  

---

# 👥 Roles del Sistema

## 🟣 Invitado
- Ver catálogo de planes  
- Ver detalle del plan  
- No puede contratar  
- No tiene chat  

## 🔵 Usuario Registrado
- Ver catálogo y detalle  
- **Contratar planes**  
- Ver historial de contrataciones  
- Acceder al **chat cliente ↔ asesor**  
- Ver su perfil  

## 🟢 Asesor Comercial
- Dashboard de gestión  
- CRUD de planes móviles  
- Subida de imágenes  
- Ver contrataciones pendientes  
- Chat con clientes  
- Perfil de asesor  

---

# 🧱 Tecnologías Utilizadas

| Tecnología | Uso |
|-----------|-----|
| **Ionic Framework** | UI móvil + PWA |
| **Angular Standalone Components** | Arquitectura moderna |
| **Supabase Auth** | Login, registro, sesión |
| **Supabase Database (Postgres)** | Tablas del sistema |
| **Supabase Storage** | Imágenes de los planes |
| **Supabase Realtime** | Chat y actualizaciones |
| **Capacitor Camera** | Captura de fotos desde el dispositivo |

---

# 📂 Estructura del Proyecto

<img width="347" height="572" alt="image" src="https://github.com/user-attachments/assets/41a5dd79-51c2-45c6-8fe2-32ac65e7ce71" />


---

# 🧩 Funcionalidades Principales

## 🔐 Autenticación
- Inicio de sesión  
- Registro de usuarios  
- Asignación automática del rol **usuario_registrado**  
- Controle de acceso con **AuthGuard** y **RoleGuard**

---

## 📄 Gestión de Planes (Asesor)
- Crear nuevo plan  
- Editar plan existente  
- Eliminar plan  
- Subir imagen al Storage  
- Actualización automática (Realtime)

---

## 📚 Catálogo de Planes
- Vista pública  
- Vista mejorada para usuarios registrados  
- Botón **“Contratar”** solo para usuario registrado  

---

## 📝 Contrataciones
- Creación de contrato  
- Ver mis contratos  
- Lista de contratos pendientes (asesor)  

---

## 💬 Chat en Tiempo Real
- Un chat por contrato  
- Conexión cliente ↔ asesor  
- Mensajes en vivo  
- Subscripciones Realtime  

---

# 🛢 Base de Datos Supabase

**Tablas principales:**
- `usuarios`
- `planes_moviles`
- `contratos`
- `mensajes_chat`

Incluye políticas RLS ajustadas para cada rol:

### Invitado
- Solo lectura de planes

### Usuario Registrado
- CRUD de mensajes en su chat  
- Ver solo sus contratos  

### Asesor Comercial
- CRUD planes  
- Ver todos los contratos  
- Chat con todos los clientes  

---

# 🌄 Capturas del Proyecto
Agrega imágenes aquí:
- Login:

 <img width="1314" height="309" alt="image" src="https://github.com/user-attachments/assets/ac3e1d53-9acc-4a94-8a01-6751c1237a1d" />
 
 - Usuario

  <img width="1316" height="290" alt="image" src="https://github.com/user-attachments/assets/c269610f-6868-4ea4-b7f8-b63bc86fe414" />

 - Invitado

  <img width="1306" height="300" alt="image" src="https://github.com/user-attachments/assets/035d0160-f9fd-4bab-a7f1-81255ff614c2" />

 - Asesor

   <img width="1314" height="303" alt="image" src="https://github.com/user-attachments/assets/82a6b232-3e37-4fad-9f77-23733c400afc" />

---

# ✨ Autor

**Desarrollado por:**  
### 👉 *José Pila*  
Estuddiante de Tecnólogía en Desarrollo de Software – EPN  

Proyecto académico profesional demostrando manejo de:  
✔ Ionic  
✔ Angular  
✔ Supabase  
✔ Arquitectura Standalone  
✔ Tiempo real  



