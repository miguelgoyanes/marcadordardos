let juegoElegido = sessionStorage.getItem('juegoElegido')
let numJugadoresPosibles = 0

// si no hay ningun juego elegido se redirije a la otra pagina
function existenJuego() {
    let juegosPosibles = ["cricket", "killer", "301", "501", "701"]
    if (!juegosPosibles.includes(juegoElegido)) {
        window.location.href = "seleccionJuego.html";
    }

    // establecer numero jugadores posible
    if (juegoElegido === "killer") {
        numJugadoresPosibles = 11
    }else {
        numJugadoresPosibles = 6
    }
}

function cambiarJuego() {
    let btnCambiarJuego = document.getElementById("btn-cambiar-juego")
    btnCambiarJuego.addEventListener("click", () => {
        // cambiar a pagina juegos
        window.location.href = "seleccionJuego.html";
    })
}


// comprobar si hay nombres guardados
function existenNombres() {
    const listaNombres = JSON.parse(sessionStorage.getItem('listaNombres'))
    if (listaNombres !== null) {
        listaNombres.forEach(nombre => {
            let contenedorNom = document.querySelector(".contenedor-nom")
            //comprobamos numero de hijos
            if (contenedorNom.childNodes.length < numJugadoresPosibles) {
                // creamos un nuevo nombre con btn de eliminas
                let divNombre = document.createElement("div")
                divNombre.classList.add("contenido-nom")
                let btnNombre = document.createElement("button")
                btnNombre.classList.add("btn-menos", "btn")
                btnNombre.type = "button"
                btnNombre.textContent = "-"
                let imputNombre = document.createElement("input")
                imputNombre.type = "text"
                imputNombre.name = "nick"
                imputNombre.value = nombre
                imputNombre.classList.add("nombre")
                divNombre.appendChild(btnNombre)
                divNombre.appendChild(imputNombre)
                contenedorNom.appendChild(divNombre)
            }
        })
        //recorremos todos nombres
        let btnMenos = document.querySelectorAll(".btn-menos")
        btnMenos.forEach(btn => {
            btn.addEventListener("click", e => {
                //haccedemos al padre del btn menos y lo eliminamos
                e.target.parentNode.remove(e.target.parentNode)
            })
        })
    }
}

//comprobaciones y eventListener para los botones + - 
function baseAnadirNombres() {
    let btnMas = document.getElementById("btn-mas")
    let contenedorNom = document.querySelector(".contenedor-nom")

    btnMas.addEventListener("click", () => {
        //comprobamos numero de hijos
        if (contenedorNom.childNodes.length < numJugadoresPosibles) {
            anadirNombre()
        } else {
            let error = document.getElementById("error")
            error.innerText = `Para el juego ${juegoElegido} el numero maximo de jugadores es ${numJugadoresPosibles}`
        }

        //recorremos todos nombres
        let btnMenos = document.querySelectorAll(".btn-menos")
        btnMenos.forEach(btn => {
            btn.addEventListener("click", e => {
                //haccedemos al padre del btn menos y lo eliminamos
                e.target.parentNode.remove(e.target.parentNode)
            })
        })
    })
}

//crear todo el elemento nombre y meterlo en el contenedor
function anadirNombre() {
    let contenedorNom = document.querySelector(".contenedor-nom")

    // creamos un nuevo nombre con btn de eliminas
    let divNombre = document.createElement("div")
    divNombre.classList.add("contenido-nom")
    let btnNombre = document.createElement("button")
    btnNombre.classList.add("btn-menos", "btn")
    btnNombre.type = "button"
    btnNombre.textContent = "-"
    let imputNombre = document.createElement("input")
    imputNombre.type = "text"
    imputNombre.name = "nick"
    imputNombre.classList.add("nombre")
    divNombre.appendChild(btnNombre)
    divNombre.appendChild(imputNombre)
    contenedorNom.appendChild(divNombre)

}
//Subir los dados del usuario al sessionStorage
function datosUsuario(listaNombres) {
    // al subirlo como array el storage lo convierte a str
    // asi que vamos a subirlo con un json
    sessionStorage.setItem('listaNombres', JSON.stringify(listaNombres));
}

//Comprobar formulario
function comprobarForm(event) {
    let listaNombres = new Array
    let contenedorNom = document.querySelector(".contenedor-nom")
    let nombres = document.querySelectorAll(".nombre")
    let error = document.getElementById("error")
    if (contenedorNom.childNodes.length < 1) {
        event.preventDefault()
        error.innerText = "Debe introducir por lo mejos un jugador"
        return false
    } else {
        nombres.forEach(nombre => {
            if (nombre.value.length === 0 || nombre.value.length > 7) {
                nombre.focus()
                event.preventDefault()
                error.innerText = "Los nombres deben tener más de 0 caracteres y menor de 7"
                return false
            } else {
                listaNombres.push(nombre.value)
            }
        })
    }
    // si ningun nombre dio error rediriguimos al juego elegido
    if (nombres.length === listaNombres.length) {
        datosUsuario(listaNombres)
        let formJuego = document.getElementById("formJuego")
        // cambiar 301 por juego_01
        if (juegoElegido == "301" || juegoElegido === "501" || juegoElegido === "701") {
            formJuego.action = "juego_01.html" 
        }else {
            formJuego.action = `${juegoElegido}.html` 
        }
    }
    
}


function domCargado(){
    existenJuego()
    // cambiar juego
    cambiarJuego()
    //comprobar si existe lista nombres
    existenNombres()
    //captura todos los elementos
    baseAnadirNombres()
    
    //comprobar formulario
    let formJuego = document.getElementById("formJuego")
    formJuego.addEventListener("submit", comprobarForm)

}

//Inicio de carga evento
document.addEventListener('DOMContentLoaded', domCargado);