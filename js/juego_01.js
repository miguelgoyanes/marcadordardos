let listaHistorial = []
let objJugadores = {}
const listaNombres = JSON.parse(sessionStorage.getItem('listaNombres'))
let puntosJuego = sessionStorage.getItem('juegoElegido')

//PINTAMOS EL TABLERO INICIAL
function pintarTablero() {
    let contenedorTablero = document.querySelector(".contenedor-jugadores")
    //pintar columnas
    let idsJugador = 1
    listaNombres.forEach(element => {
        //creando el contenedor del jugados
        let contenedorJugador = document.createElement("div")
        contenedorJugador.classList.add("contenedor-jugador")
        contenedorJugador.setAttribute("id", idsJugador)
        contenedorTablero.appendChild(contenedorJugador)
        //creamos objeto jugador
        objJugadores[idsJugador] = {
            nombre: element,
            puntos: puntosJuego,
            jugando: false,
            ganador: false,
        }
        //creando el contedido del div del jugador
        let htmlPorJugador = `<div class="cubo"><p>${element}</p></div>
        <div id="puntuacion${idsJugador}" class="cubo">${puntosJuego}</div>`
        idsJugador += 1
        //Insertamos en el html
        contenedorJugador.innerHTML = htmlPorJugador
    })

    objJugadores[1].jugando = true
    // //Guardar en historial
    guardarHistorial()
    // //pintamos la primera columna
    pintarJugadorJugando()
}

//CREAMOS LOS EVENTOS CLICABLES DE LOS NOMBRES DEL SIGUIENTE Y DEL DESHACER
function crearClickEleccionAndControls() {
    // creamos click siguiente jugador
    let btnSigiente = document.getElementById("sig")
    btnSigiente.addEventListener("click", clickSiguienteJugador)
    
    // creamos click deshacer accion
    let btnDeshacer = document.getElementById("deshacer")
    btnDeshacer.addEventListener("click", deshacerAccion)

    // creamos click en teclas puntos
    let btnsPuntos = document.querySelectorAll(".tecla-puntos")
    btnsPuntos.forEach(btnPunto => {
        btnPunto.addEventListener("click", clickTeclaPto)
    });
}

//GESTIONAMOS EL CLICK EN SIGUIENTE PARA ELEJIR UN JUGADOR
function clickSiguienteJugador() {
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
    pintarJugadorJugando()
    //Guardar en historial
    guardarHistorial()
}

//PINTAMOS LA COLUMNA QUE LE TOCA Y HACEMOS CLICKACBLE LOS PUNTOS A PARTIR DEL OBJ
function pintarJugadorJugando() {
    let contenedoresJugador = document.querySelectorAll(".contenedor-jugador")
    //Eliminar todo de la columna anterior
    contenedoresJugador.forEach(contenedorJugador => {
        contenedorJugador.classList.remove("jugando")
    })
    for (let keyJugadores in objJugadores) {
        if (objJugadores[keyJugadores].jugando) {
            let contenedorJugador = document.getElementById(keyJugadores)
            contenedorJugador.classList.add("jugando")
        } 
    }
}

//HACEMOS TECLA CLICABLE
function clickTeclaPto(e) {
    let valorTecla = e.target.innerText
    if (valorTecla === "B") {
        valorTecla = 25
    }
    for (let keyJugadores in objJugadores) {
        if (objJugadores[keyJugadores].jugando) {
            let restaPuntos = objJugadores[keyJugadores].puntos - valorTecla
            if (restaPuntos > 0) {
                objJugadores[keyJugadores].puntos = restaPuntos
                guardarHistorial()
            } else if (restaPuntos == 0) {
                objJugadores[keyJugadores].puntos = restaPuntos
                objJugadores[keyJugadores].ganador = true
                guardarHistorial()
            }
        }
    }

    actualizarTablero()
}


//ACTUALIZAMOS LAS CASILLAS Y LOS PUNTOS
function actualizarTablero() {
    let elGanador = null
    for (let keyJugadores in objJugadores) {
        let jugador = document.getElementById(keyJugadores)
        jugador.lastElementChild.innerText = objJugadores[keyJugadores].puntos

        if (objJugadores[keyJugadores].ganador) {
            elGanador = keyJugadores
        }
    }
    if (elGanador !== null) {
        // eliminamos el event lisener de las casillas afectadas
        let btnSigiente = document.getElementById("sig")
        btnSigiente.removeEventListener("click", clickSiguienteJugador)
        
        // eliminamos click en teclas puntos
        let btnsPuntos = document.querySelectorAll(".tecla-puntos")
        btnsPuntos.forEach(btnPunto => {
            btnPunto.removeEventListener("click", clickTeclaPto)
        });

        //Pintar txt Ganar
        let ganar = document.getElementById("contenedor-ganar")
        ganar.innerText = `${(objJugadores[elGanador].nombre).toUpperCase()} HA GANADO LA PARTIDA`
    } else {
        //Pintar txt Ganar
        let ganar = document.getElementById("contenedor-ganar")
        ganar.innerText = ""

        // hacemos que el btn siguiente y los nombres sean clicables
        crearClickEleccionAndControls()
        pintarJugadorJugando()
    }
}


//GUARDAMOS EN HISTORIAL
function guardarHistorial() {
    listaHistorial.push(structuredClone({obj: objJugadores}))
}


//DESHACER LA ACCION ANTERIOR
function deshacerAccion() {
    if (listaHistorial.length > 1) {
        listaHistorial.pop()
        objJugadores = structuredClone(listaHistorial.slice(-1).pop().obj)
    }

    pintarJugadorJugando()
    actualizarTablero()
}

function domCargado(){
    //coger datos usuarios
    pintarTablero()
    crearClickEleccionAndControls()
}

//Inicio de carga evento
document.addEventListener('DOMContentLoaded', domCargado);