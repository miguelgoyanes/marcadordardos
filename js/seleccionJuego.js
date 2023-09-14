let juegoElegido = null

function siExisteJuegoElegido() {
    juegoElegido = sessionStorage.getItem('juegoElegido')
    let casillaJuego = document.getElementById(juegoElegido)
    if (juegoElegido !== null) {
        casillaJuego.classList.add("tecla-verde")        
    }
}


function hacerJuegosClickables() {
    let juegos = document.querySelectorAll(".juego")
    juegos.forEach(juego => {
        juego.addEventListener("click", event => {
            juegos.forEach(juego => {
                juego.classList.remove("tecla-verde")
            })
            
            let juegoClickado = event.target
            if (juegoClickado.tagName === "P") {
                juegoClickado.parentNode.classList.add("tecla-verde")
                juegoElegido = juegoClickado.parentNode.id
            }else if (juegoClickado.tagName === "I") {
                juegoClickado.parentNode.parentNode.classList.add("tecla-verde")
                juegoElegido = juegoClickado.parentNode.parentNode.id
            }else {
                juegoClickado.classList.add("tecla-verde")
                juegoElegido = juegoClickado.id
            }
        })
    })
}

function hacerSigClickable() {
    let btnSigiente = document.getElementById("ir-seleccionar-nombres")
    btnSigiente.addEventListener("click", clickEnSig)
}

function clickEnSig() {
    console.log("hola");
    if (juegoElegido !== null) {
        // subir juego
        sessionStorage.setItem("juegoElegido", juegoElegido)
        // cambiar a pagina nombres
        window.location.href = "seleccionNombres.html";
    }
}

function domCargado(){
    siExisteJuegoElegido()
    hacerJuegosClickables()
    hacerSigClickable()
}

//Inicio de carga evento
document.addEventListener('DOMContentLoaded', domCargado);