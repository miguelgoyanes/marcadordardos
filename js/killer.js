let listaHistorial = []
let objJugadores = {}
let listaIdsJugadoresVivos = []
// const listaNombres = JSON.parse(sessionStorage.getItem('listaNombres'))
const listaNombres = ["Ana", "Miguel", "Javier", "Miguel", "Javier"]

// CREAMOS EL OBJETO
function establecerObj() {
    let idsJugador = 1
    listaNombres.forEach(element => {
        //creamos objeto jugador
        objJugadores[idsJugador] = {
            nombre: element,
            numero: null,
            vidas: 1,
            killer: false,
            asesinatos: 0,
            jugando: false,
            ganador: false,
        }

        listaIdsJugadoresVivos.push(idsJugador)

        idsJugador += 1
    })
    objJugadores[1].jugando = true
}

//------------------------
//---ELECCION DE NUMERO---
//------------------------

// PINTAMOS EL NOMBRE DE JUGADOR QUE ESTA JUGANDO
function pintarJugadorJugandoE() {
    let casillaJugadorJugando = document.getElementById("casillaJugadorJugando")
    for (let keyJugadores in objJugadores) {
        if (objJugadores[keyJugadores].jugando) {
            casillaJugadorJugando.innerText = objJugadores[keyJugadores].nombre
        }
    }
}

// HACEMOS LOS NUMERO CLICKABLE DE LA ELECCION
function hacerNumerClickablesE() {
    let teclasClickables = document.querySelectorAll(".tecla-clickable")
    teclasClickables.forEach(element => {
        element.addEventListener("click", clickEnNumeroE)
    })
}

// GESTIONAMOS EL CLICK EN EL NUMERO EN LA PARTE DE ELECCION
function clickEnNumeroE(element) {
    element.target.removeEventListener("click", clickEnNumeroE)
    element.target.classList.remove("tecla-verde")
    element.target.classList.remove("tecla-clickable")
    element.target.classList.add("tecla-gris")

    for (let keyJugadores in objJugadores) {
        if (objJugadores[keyJugadores].jugando) {
            objJugadores[keyJugadores].numero = element.target.innerText
        }
    }
    clickSiguienteJugadorE()
}

//GESTIONAMOS EL CLICK EN SIGUIENTE PARA ELEJIR UN JUGADOR
function clickSiguienteJugadorE() {
    let idTrueActual = null
    for (let keyJugadores in objJugadores) {
        if (objJugadores[keyJugadores].jugando) {
            idTrueActual = keyJugadores
            objJugadores[keyJugadores].jugando = false
        }
    }
    if (Number(idTrueActual) + 1 <= listaNombres.length) {
        objJugadores[String(Number(idTrueActual) + 1)].jugando = true
    } else {
        objJugadores[1].jugando = true
    }
    pintarJugadorJugandoE()
    todosJugadoresTienenNumeroE()
}

// SI TODOS LOS JUGADORES TIENEN NUMERO ASIGNADO PARAMOS A LA SIGUIENTE FASE
function todosJugadoresTienenNumeroE() {
    let todostienenNum = true
    for (let keyJugadores in objJugadores) {
        if (objJugadores[keyJugadores].numero === null) {
            todostienenNum = false
        }
    }
    if (todostienenNum) {
        establecimientoJuego()
    }

}

//------------------------
//---JUEGO---
//------------------------

// ESTABLECER LOS CAMBIOS NECESARIOS EN EL JUEGO
function establecimientoJuego() {
    //cambiar css
    let linkCss = document.getElementById("linkCSS")
    linkCss.href = "css/killerJuego.css"
    // mostrar botones control
    let controles = document.querySelectorAll(".btn")
    controles.forEach(element => {
        element.classList.remove("ocultar")
    })
    // eliminar event listener
    let teclasClickables = document.querySelectorAll(".tecla-clickable")
    teclasClickables.forEach(element => {
        element.removeEventListener("click", clickEnNumeroE)
    })
    // vaciar tablero
    let tablero = document.getElementById("contenedor-tablero")
    tablero.innerHTML = `<div class="contenido-tablero">
        <div class="contenedor-numeros">
        </div>
    </div>`
    // preparar grid
    let contNumeros = document.querySelector(".contenedor-numeros")
    if (screen.width > 425) {
        if (listaNombres.length <= 2) {
            contNumeros.style.gridTemplateColumns = `repeat(${listaNombres.length}, 1fr)`
        }else if (listaNombres.length <= 4) {
            contNumeros.style.gridTemplateColumns = `repeat(2, 1fr)`
        }else {
            contNumeros.style.gridTemplateColumns = `repeat(3, 1fr)`
        }
    }else {
        if (listaNombres.length <= 3) {
            contNumeros.style.gridTemplateColumns = ` 1fr`
        }else if (listaNombres.length <= 6){
            contNumeros.style.gridTemplateColumns = `repeat(2, 1fr)`
        }else {
            contNumeros.style.gridTemplateColumns = `repeat(3, 1fr)`
        }
    }

    pintartableroJ()
}

// PINTAR EL TABLERO DEL JUEGO CON LOS JUGADORES QUE JUEGUEN
function pintartableroJ() {
    // casillas jugadores
    let contenidoJugadores = ``
    for (let keyJugadores in objJugadores) {
        contenidoJugadores = contenidoJugadores + `<div id="${keyJugadores}" class="casilla jugador">
            <p>${objJugadores[keyJugadores].nombre}</p>
            <p><i class="fa-solid fa-bullseye"></i> ${objJugadores[keyJugadores].numero}</p>
            <p class="vidas"></p>
            <p class="killer"></p>
            </div>`
    }
    //añadimos la cassilla hacer killer
    contenidoJugadores = contenidoJugadores + `<div id="hacer-killer" class="casilla">
            <p><i class="fa-solid fa-gun"></i></p>
            <p>HACER</p>
            <p>KILLER</p>
        </div>`

    let contNumeros = document.querySelector(".contenedor-numeros")
    contNumeros.innerHTML = contenidoJugadores
    actualizarTableroJ()
    guardarHistorias()
}

// ACTUALIZAR TABLERO REFLEJANDO EL CONTENIDO DEL OBJ EN LA PANTALLA
function actualizarTableroJ() {
    // limpiar clases jugadores
    let jugadores = document.querySelectorAll(".jugador")
    jugadores.forEach(jugador => {
        jugador.classList.remove("tecla-roja", "tecla-gris", "tecla-azul", "tecla-clickable")
        // limpiar palabra killer
        jugador.querySelector(".killer").innerHTML = ""
    })

    // limpiar clases btn hacer killer
    let hacerKiller = document.getElementById("hacer-killer")
    hacerKiller.classList.remove("tecla-gris","tecla-verde", "killer-clickable")
    eliminarTodosClickablesJ()

    // averiguamos si jugador jugando en killer
    let jugadorJugandoKiller = false
    for (let keyJugadores in objJugadores) {
        if (objJugadores[keyJugadores].jugando) {
            jugadorJugandoKiller = objJugadores[keyJugadores].killer
        }
    }

    // ponemos cada clase a cada tecla
    for (let keyJugadores in objJugadores) {
        let jugador = document.getElementById(keyJugadores)
        if (objJugadores[keyJugadores].vidas <= 0) {
            jugador.classList.add("tecla-gris")
        }else {
            if (objJugadores[keyJugadores].jugando) {
                jugador.classList.add("tecla-azul")
            }else {
                jugador.classList.add("tecla-roja")
                if (jugadorJugandoKiller) {
                    jugador.classList.add("tecla-clickable")
                }
            }
        }
        // pintamos hacer killer
        if (jugadorJugandoKiller) {
            hacerKiller.classList.add("tecla-gris")
        }else {
            hacerKiller.classList.add("tecla-verde", "killer-clickable")
        }
        // ponemos las vidas del jugador
        jugador.querySelector(".vidas").innerHTML = `<i class="fa-solid fa-heart"></i> ${objJugadores[keyJugadores].vidas}`
        // ponemos killer al jugador si lo es
        if (objJugadores[keyJugadores].killer) {
            jugador.querySelector(".killer").innerHTML = '<i class="fa-solid fa-gun"></i> Killer'
        }
    }

    if (jugadorJugandoKiller) {
        hacerJugadoresClickablesJ()
    }else {
        hacerKillerClickableJ()
    }

    hacerBtnClickable()
}

// CREAMOS EL CLICK EN LOS JUGADORES
function hacerJugadoresClickablesJ() {
    let jugadores = document.querySelectorAll(".tecla-clickable")
    jugadores.forEach(element => {
        element.addEventListener("click", clickEnJugador)
    })
}

// CREAMOS EL CLICK EN HACER KILLER
function hacerKillerClickableJ() {
    let hacerKiller = document.getElementById("hacer-killer")
    hacerKiller.addEventListener("click", clickHacerKiller)
}

// CREAMOS EL CLICK EN BTN 
function hacerBtnClickable() {
    // hacer click en siguiente
    let btnSigiente = document.getElementById("sig")
    btnSigiente.addEventListener("click", clickSiguienteJugador)

    // hacer click en deshacer
    let btnDeshacer = document.getElementById("deshacer")
    btnDeshacer.addEventListener("click", deshacerAccion)
}

// ELIMINAMOS EL CLICK DE TODOS LO CLICKABLE
function eliminarTodosClickablesJ() {
    // eliminar click en jugadores
    let jugadores = document.querySelectorAll(".jugador")
    jugadores.forEach(element => {
        element.removeEventListener("click", clickEnJugador)
    })

    // eliminar click en hacer killer
    let hacerKiller = document.getElementById("hacer-killer")
    hacerKiller.removeEventListener("click", clickHacerKiller)

    // eliminar click en siguiente
    let btnSigiente = document.getElementById("sig")
    btnSigiente.removeEventListener("click", clickSiguienteJugador)
    
    // eliminar click en deshacer
    let btnDeshacer = document.getElementById("deshacer")
    btnDeshacer.removeEventListener("click", deshacerAccion)
}

// GESTIONAMOS EL CLICK EN LOS JUGADORES
function clickEnJugador(element) {
    let jugadorClickado = element.target
    let idJugadorClickado = null
    if (jugadorClickado.tagName === "DIV") {
        idJugadorClickado = jugadorClickado.id
    }else if (jugadorClickado.tagName === "P") {
        idJugadorClickado = jugadorClickado.parentNode.id
    }else if (jugadorClickado.tagName === "I") {
        idJugadorClickado = jugadorClickado.parentNode.parentNode.id
    }

    objJugadores[idJugadorClickado].vidas -= 1

    comprobarGanador(idJugadorClickado)
    guardarHistorias()
}

// GESTIONAMOS EL CLICK EN HACER KILLER
function clickHacerKiller() {
    for (let keyJugadores in objJugadores) {
        if (objJugadores[keyJugadores].jugando) {
            objJugadores[keyJugadores].killer = true
        }
    }
    actualizarTableroJ()
    guardarHistorias()
}

// GESTIONAMOS EL CLICK EN BTN SIGUIENTE
function clickSiguienteJugador() {
    let idTrueActual = null
    for (let keyJugadores in objJugadores) {
        if (objJugadores[keyJugadores].jugando) {
            idTrueActual = keyJugadores
            objJugadores[keyJugadores].jugando = false
        }
    }
    let posicion = listaIdsJugadoresVivos.indexOf(Number(idTrueActual))
    let siguienteValor = null
    if (posicion !== -1 && posicion < listaIdsJugadoresVivos.length - 1) {
        siguienteValor = listaIdsJugadoresVivos[posicion + 1];
    } else {
        siguienteValor = listaIdsJugadoresVivos[0];
    }
    objJugadores[siguienteValor].jugando = true
    actualizarTableroJ()
    guardarHistorias()
}

// COMPROBAMOS SI EL JUGADOR JUGANDO HA GANADO
function comprobarGanador(idJugadorClickado) {
    let numeroJugadoresVivos = 0
    let idJugadorJugando = 0
    for (let keyJugadores in objJugadores) {
        if (objJugadores[keyJugadores].vidas > 0) {
            numeroJugadoresVivos += 1
        }
        if (objJugadores[keyJugadores].jugando) {
            idJugadorJugando = keyJugadores
        }
    }
    if (numeroJugadoresVivos === 1) {
        pintartableroGanar(idJugadorJugando)
    }else {
        comprobarmuerto(idJugadorClickado)
        actualizarTableroJ()
    }
}

// COMPROBAMOS SI EL JUGADOR ESTA MUERTO
function comprobarmuerto(idJugadorClickado) {
    if (objJugadores[idJugadorClickado].vidas === 0) {
        listaIdsJugadoresVivos = listaIdsJugadoresVivos.filter(item => item != idJugadorClickado)

        for (let keyJugadores in objJugadores) {
            if (objJugadores[keyJugadores].jugando) {
                objJugadores[keyJugadores].vidas += 1
                objJugadores[keyJugadores].asesinatos += 1
            }
        }
    }
}

// PINTAR TABLERO SI HA GANADO
function pintartableroGanar(idJugadorJugando) {
    let contNumeros = document.querySelector(".contenedor-numeros")
    // casillas jugadores
    let contenidoJugadores = ``
    contenidoJugadores = contenidoJugadores + `<div class="casilla jugador-ganador tecla-verde">
        <p>GANADOR</p>
        <div>
            <p>${objJugadores[idJugadorJugando].nombre}</p>
            <p><i class="fa-solid fa-bullseye"></i> ${objJugadores[idJugadorJugando].numero}</p>
            <p class="vidas"><i class="fa-solid fa-heart"></i> ${objJugadores[idJugadorJugando].vidas}</p>
            <p class="killer"><i class="fa-solid fa-gun"></i> ${objJugadores[idJugadorJugando].asesinatos}</p>
        </div>
    </div>`
    contNumeros.innerHTML = contenidoJugadores
    
    // mostrar botones control
    let controles = document.querySelectorAll(".btn")
    controles.forEach(element => {
        element.classList.add("ocultar")
    })
    // estilo
    contNumeros.style.gridTemplateColumns = ` 1fr`
    let jugadorGanador = document.querySelector(".jugador-ganador")
    jugadorGanador.style.height = " auto"
}

//GUARDAMOS EN HISTORIAL
function guardarHistorias() {
    listaHistorial.push(structuredClone({obj: objJugadores, listaJugadoresVivos: listaIdsJugadoresVivos}))
}

//DESHACER LA ACCION ANTERIOR
function deshacerAccion() {
    if (listaHistorial.length > 1) {
        listaHistorial.pop()
        objJugadores = structuredClone(listaHistorial.slice(-1).pop().obj)
        listaIdsJugadoresVivos = structuredClone(listaHistorial.slice(-1).pop().listaJugadoresVivos)
    }
    console.log(listaHistorial);
    actualizarTableroJ()
}


function domCargado(){
    establecerObj()
    pintarJugadorJugandoE()
    hacerNumerClickablesE()
}

//Inicio de carga evento
document.addEventListener('DOMContentLoaded', domCargado);