import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { createClient, SupabaseClient, Session, User} from '@supabase/supabase-js'
import { BehaviorSubject, Observable } from 'rxjs';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

@Injectable({
  providedIn: 'root',
})
export class SupabaseService {

  private supabase: SupabaseClient;
  private session$ = new BehaviorSubject<Session| null>(null);
  private user$ = new BehaviorSubject<User| null>(null);

  constructor(){
    this.supabase=createClient(environment.Supabase_URL, environment.Supabase_ANON_KEY);

    this.supabase.auth.onAuthStateChange((event, session)=>{
      this.session$.next(session ?? null);
      this.user$.next( session?.user ?? null);
    });
  }
  //Funciones de autenticacion
  //Crear Usuario
  async signUp(email:string, password:string, nombre:string){
    const {data, error} = await this.supabase.auth.signUp({email, password})
    if(error){
      console.error("Error al insertar usuario")
      return;
    }
    if(data.user){
await this.crearUsuario(data.user.id, email, nombre, 'usuario_registrado');
    }
    return data;
  }
  //Logear a un usuario
  async signIn(email:string, password:string){
    const {data, error} = await this.supabase.auth.signInWithPassword({email, password})
    if (error) { console.error("No se ha podifdo hacer login"); return;}
    return data;
  }
  //Cerrar sesion
  async signOut(){
    await this.supabase.auth.signOut();
    this.session$.next(null);
    this.user$.next(null);
  }
  //Obtener el id de usuario
    async getIdUsuario(userId?: string) {
    const uid = userId ?? this.user$.value?.id;
    if (!uid) return null;
    const { data, error } = await this.supabase
          .from('usuarios').select('*').eq('id', uid).single();
    if (error) throw error;
    return data;
  }
  async crearUsuario(id:string, email:string, nombre:string,rol:string){
    const { error } = await this.supabase.from('usuarios')
        .upsert({ id, email, nombre, rol });
    if (error) throw error;
    return true;
  }

  /*  IMPLEMENTACION DE PLANES */
  async obtenerPlanesActivos(){
    const {data, error} = await this.supabase.from('planes_moviles')
        .select('*')
        .eq('activo', true)
        .order('created_at', { ascending: false });
    if(error){
      console.error("Error obtener datos de planes_moviles");
    }
    return data;
  }
  async obtenerPlanPorID(id:string){
    const { data, error } = await this.supabase
        .from('planes_moviles')
        .select('*')
        .eq('id', id)
        .single();
    if (error) throw error;
    return data;
  }
  async agregarPlan(plan:any){
    const { data, error } = await this.supabase.from('planes_moviles')
      .insert(plan)
      .select()
      .single();
    if (error) throw error;
    return data;
  }
  async actualizarPlan(id: string, changes: any) {
    const { data, error } = await this.supabase
        .from('planes_moviles')
        .update({ ...changes, updated_at: new Date()
        .toISOString() })
        .eq('id', id)
        .select()
        .single();
    if (error) throw error;
    return data;
  }
  async eliminarPlan(id: string) {
    const { error } = await this.supabase
        .from('planes_moviles')
        .delete()
        .eq('id', id);
    if (error) throw error;
    return true;
  }
   /* -------------------- ALMACENAMIENTO  -------------------- */

//Manejo de imagen para Planes
  async cargarPlanImage(file: Blob | string, filename: string) {

  let blobFile: Blob;

  if (typeof file === 'string') {
    // base64 → Blob
    const res = await fetch(file);
    blobFile = await res.blob();
  } else {
    blobFile = file;
  }

  // Validar tamaño
  if (blobFile.size > 5 * 1024 * 1024)
    throw new Error('La imagen supera 5MB');

  // Subir archivo
  const { data, error } = await this.supabase.storage
    .from('planes-imagenes')
    .upload(filename, blobFile, { upsert: true });

  if (error) throw error;

  // Obtener URL pública
  const { data: urlData } = this.supabase.storage
    .from('planes-imagenes')
    .getPublicUrl(data.path);

  return urlData.publicUrl;   // <<< ESTO SE GUARDA EN LA BD
}

  async eliminarImage(path: string) {
    const { error } = await this.supabase.storage.from('planes-imagenes').remove([path]);
    if (error) throw error;
    return true;
  }

  /* MANEJO DE CONTRATACIONES */
  async crearContrato(usuario_id: string, plan_id: string) {
    const { data, error } = await this.supabase
      .from('contratos')
      .insert({ usuario_id, plan_id })
      .select().single();
    if (error) throw error;
    return data;
  }

  async obtenerContratosPorUser(userId: string) {
    const { data, error } = await this.supabase
      .from('contratos')
      .select('*')
      .eq('usuario_id', userId)
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data;
  }

  async obtenerContratosPendientes() {
    const { data, error } = await this.supabase
      .from('contratos')
      .select('*')
      .eq('estado', 'pendiente')
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data;
  }
  /* MANEJO  CHAT / TIEMPO REAL */

  // Obtener mensajes por contrato
  async obtenerMensajesByContrato(contratoId: string) {
    const { data, error } = await this.supabase.from('mensajes_chat').select('*').eq('contrato_id', contratoId).order('created_at', { ascending: true });
    if (error) throw error;
    return data;
  }

  async enviarMensaje(contratoId: string, emisorId: string, mensaje: string) {
    const { data, error } = await this.supabase.from('mensajes_chat').insert({
      contrato_id: contratoId,
      emisor_id: emisorId,
      mensaje,
      tipo: 'texto'
    }).select().single();
    if (error) throw error;
    return data;
  }

  // Subscribirse a nuevos mensajes de un contrato
  iniciarConversacion(contratoId: string, callback: (payload: any) => void) {
    const sub = this.supabase.channel(`public:mensajes_chat:contrato=${contratoId}`)
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'mensajes_chat', filter: `contrato_id=eq.${contratoId}` }, (payload) => {
        callback(payload.new);
      }).subscribe();
    return sub;
  }

  // Subscribirse a cambios en planes (INSERT/UPDATE/DELETE)
  realizarCambiosPlanes(callback: (payload: any) => void) {
    const sub = this.supabase.channel('realtime:planes_moviles')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'planes_movil' }, (payload) => {
        callback(payload);
      }).subscribe();
    return sub;
  }
  /*INICIALIZAR LA CAMARA */
    // toma foto y devuelve data URL
  async takePhotoAsDataUrl(): Promise<string> {
    const photo = await Camera.getPhoto({
      quality: 70,
      allowEditing: false,
      resultType: CameraResultType.DataUrl,
     source: CameraSource.Camera
  });

  return photo.dataUrl as string;
}


  // helper: subir foto tomada
  async takeAndUploadImage(filename: string) {
  const dataUrl = await this.takePhotoAsDataUrl();
  return await this.cargarPlanImage(dataUrl, filename);
}

   getCurrentUser() {
    return this.user$.value;
  }

  getClient() {
    return this.supabase;
  }
  async obtenerPerfilActual() {
    const user = this.user$.value;
    if (!user) return null;

    const { data, error } = await this.supabase
      .from('usuarios')
      .select('*')
      .eq('id', user.id)
      .single();

    if (error) return null;
    return data;
  }

}
