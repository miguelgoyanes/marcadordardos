function getDatosUsuario() {
    listaNombres = sessionStorage.getItem('listaNombres');
    modalidadJuego = sessionStorage.getItem('modalidadJuego');
    console.log(listaNombres);
    console.log(modalidadJuego);
}

function domCargado(){
    //coger datos usuarios
    getDatosUsuario()

}

//Inicio de carga evento
document.addEventListener('DOMContentLoaded', domCargado);