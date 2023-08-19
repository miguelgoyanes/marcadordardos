function Jugar() {
    let jugarCricket = document.getElementById("btn-jugar-cricket")
    jugarCricket.addEventListener("click", e => {
        // Redireccionar a otra página dentro del mismo sitio
        window.location.href = "/seleccionJuego.html";
    })
    let jugar301 = document.getElementById("btn-jugar-301")
    jugar301.addEventListener("click", e => {
        // Redireccionar a otra página dentro del mismo sitio
        window.location.href = "/seleccionJuego.html";
    })
}
function saberMas() {
    let saberCricket = document.getElementById("btn-saber-cricket")
    saberCricket.addEventListener("click", e => {
        window.location.href = "/comoJugarCricket.html";
    })
    let saber301 = document.getElementById("btn-saber-301")
    saber301.addEventListener("click", e => {
        window.location.href = "/comoJugar301.html";
    })
}

function domCargado(){
    Jugar()
    saberMas()
}

//Inicio de carga evento
document.addEventListener('DOMContentLoaded', domCargado);