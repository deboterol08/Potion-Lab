//Para identificar los datos en el localStorage
const CLAVE_GREMIOS="pociones_lab_gremios";
const CLAVE_USUARIOS="pociones_lab_usuarios";

//creo objetos base para cuando no se tenga nada guardado en el localStorage
const gremiosBase = [
    {id:1, nombre:"Gremio de Alquimistas", descripcion:"Un gremio dedicado a la alquimia y la creación de pociones."},
    {id:2, nombre:"Gremio de Hechiceros", descripcion:"Un gremio de magos y hechiceros que estudian las artes mágicas."},
    {id:3, nombre:"Gremio de Cazadores", descripcion:"Un gremio especializado en la caza de criaturas mágicas y monstruos."}
];
const usuariosBase = [
    {id:101, nombre:"Alice", gremioId:1},
    {id:102, nombre:"Bob", gremioId:2},   

];

//Inicializacion y lectura de datos del localStorage

export const inicializacionAlmacenamiento = () => {
    if(!localStorage.getItem(CLAVE_GREMIOS)){ //Si no hay gremios guardados, se guardan los gremios base
        localStorage.setItem(CLAVE_GREMIOS, JSON.stringify(gremiosBase)); 
}
 if (!localStorage.getItem(CLAVE_USUARIOS)){ //Si no hay usuarios guardados, se guardan los usuarios base
        localStorage.setItem(CLAVE_USUARIOS, JSON.stringify(usuariosBase));
    }
};

//Obtener gremios:
export const obtenerGremios = () => {
    const gremios = JSON.parse(localStorage.getItem(CLAVE_GREMIOS));
    if(!gremios){
        inicializacionAlmacenamiento();
        return gremiosBase;
    }
    return gremios;
};

//Obtener usuarios:
export const obtenerUsuarios = () => {
    const usuarios = JSON.parse(localStorage.getItem(CLAVE_USUARIOS));
    if(!usuarios){
        inicializacionAlmacenamiento();
        return usuariosBase;
    }
    return usuarios;
};

//Escritura y guardado de datos en el localStorage

//guardar gremios 
export const guardarGremios = (listagremios) => {
    localStorage.setItem(CLAVE_GREMIOS, JSON.stringify(listagremios));
};

//guardar usuarios
export const guardarUsuarios = (listausuarios) => {
    localStorage.setItem(CLAVE_USUARIOS, JSON.stringify(listausuarios));
};
