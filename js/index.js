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
    let jugar501 = document.getElementById("btn-jugar-501")
    jugar501.addEventListener("click", e => {
        // Redireccionar a otra página dentro del mismo sitio
        window.location.href = "/seleccionJuego.html";
    })
    let jugar701 = document.getElementById("btn-jugar-701")
    jugar701.addEventListener("click", e => {
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
    let saber501 = document.getElementById("btn-saber-501")
    saber501.addEventListener("click", e => {
        window.location.href = "/comoJugar501.html";
    })
    let saber701 = document.getElementById("btn-saber-701")
    saber701.addEventListener("click", e => {
        window.location.href = "/comoJugar701.html";
    })
}

function domCargado(){
    Jugar()
    saberMas()
}

//Inicio de carga evento
document.addEventListener('DOMContentLoaded', domCargado);