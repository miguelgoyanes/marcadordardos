//SE DECLARAN LAS VARIABLES GLOBALES PARA LOS DOS ARCHIVOS MOVIL Y PC
let listaHistorial = []
let objJugadores = {}
let listaIdsPuntosCerrados = []
const listaNombres = JSON.parse(sessionStorage.getItem('listaNombres'))

if (screen.width > 425) {
    //PINTAMOS EL TABLERO INICIAL
    function pintarTablero() {
        let contenedorControles = document.getElementById("contenedor-controles")
        contenedorControles.style.width = listaNombres.length * 150 + "px"
        let contenedorTablero = document.getElementById("contenedor-tablero")
        contenedorTablero.style.width = listaNombres.length * 150 + "px"
        contenedorTablero.style.gridTemplateColumns = `repeat(${listaNombres.length + 1}, 1fr)`
        //poner tamaño deshacer correcto
        if (listaNombres.length >= 3) {
            let botonDeshacer = document.querySelector(".btn")
            botonDeshacer.style.fontSize = "28px"
        }
        //pintar columnas
        let idsJugador = 1
        listaNombres.forEach(element => {
            //creando el contenedor del jugados
            let contenedorVertical = document.createElement("div")
            contenedorVertical.classList.add("contenedor-vertical")
            contenedorVertical.setAttribute("id", idsJugador)
            contenedorTablero.appendChild(contenedorVertical)
            //creamos objeto jugador
            objJugadores[idsJugador] = {
                nombre: element,
                puntos: 0,
                jugando: false,
                ganador: false,
            }
            //creando el contedido del div del jugador
            let htmlPorJugador = `<div class="cubo cubo-nombre">${element}</div>
            <div id="puntuacion${idsJugador}" class="cubo">0</div>`
            let contadorNumCasillas = 20
            for (let i = 1; i < 8; i++) {
                //adjudicando id al obj
                let numCasillas = null
                let valorCasilla = null
                if (contadorNumCasillas == 14) {
                    numCasillas = "B"
                    valorCasilla = 25
                } else {
                    numCasillas = contadorNumCasillas
                    valorCasilla = contadorNumCasillas
                }
                objJugadores[idsJugador][`${i}`] = {nombre: `casilla${numCasillas}`, valor: valorCasilla, impactos: 0},
                contadorNumCasillas -= 1
                // pintando casillas con id correspondintes
                htmlPorJugador += `<div id="${idsJugador}${i}" class="cubo btn-juego pto-0"></div>`
            }
            idsJugador += 1
            //Insertamos en el html
            contenedorVertical.innerHTML = htmlPorJugador
        });

        objJugadores[1].jugando = true
        //Guardar en historial
        guardarHistorias()
        //pintamos la primera columna
        pintarColumnaJugando()
    }

    //CREAMOS LOS EVENTOS CLICABLES DE LOS NOMBRES DEL SIGUIENTE Y DEL DESHACER
    function crearClickEleccionAndControls() {
        // creamos click eleccion jugador
        let columnasJugador = document.querySelectorAll(".cubo-nombre")
        columnasJugador.forEach(columnaJugador => {
            columnaJugador.classList.add("btn-clickable")
            columnaJugador.addEventListener("click", clickEleccionJugador)
        })

        // creamos click siguiente jugador
        let btnSigiente = document.getElementById("sig")
        btnSigiente.addEventListener("click", clickSiguienteJugador)
        
        // creamos click deshacer accion
        let btnDeshacer = document.getElementById("deshacer")
        btnDeshacer.addEventListener("click", deshacerAccion)
    }

    //GESTIONAMOS EL CLICK EN EL NOMBRE PARA ELEJIR UN JUGADOR
    function clickEleccionJugador(e) {
        for (let keyJugadores in objJugadores) {
            if (e.target.parentNode.id === keyJugadores) {
                objJugadores[keyJugadores].jugando = true
            } else {
                objJugadores[keyJugadores].jugando = false
            }
        }
        pintarColumnaJugando()
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
        pintarColumnaJugando()
    }

    //PINTAMOS LA COLUMNA QUE LE TOCA Y HACEMOS CLICKACBLE LOS PUNTOS A PARTIR DEL OBJ
    function pintarColumnaJugando() {
        let columnasJugador = document.querySelectorAll(".cubo-nombre")
        let btnsJuego = document.querySelectorAll(".btn-juego")
        //Eliminar todo de la columna anterior
        columnasJugador.forEach(columnaJugador => {
            columnaJugador.parentNode.classList.remove("fondo-azul")
        })
        for (let keyJugadores in objJugadores) {
            if (objJugadores[keyJugadores].jugando) {
                let columnaJugador = document.getElementById(keyJugadores)
                columnaJugador.classList.add("fondo-azul")

                btnsJuego.forEach(btnJuego => {
                    //Eliminar clickable del anterior
                    btnJuego.removeEventListener("click", clickPuntuacion)
                    btnJuego.classList.remove("btn-clickable")
                    //Añadir clickable del anterior
                    if (btnJuego.id[0] === keyJugadores && !listaIdsPuntosCerrados.includes(btnJuego.id[1])) {
                        btnJuego.classList.add("btn-clickable")
                        btnJuego.addEventListener("click", clickPuntuacion)
                    }
                })
            } 
        }
    }

    //GESTIONAMOS EL CLICK EN LAS PUNTUACIONES
    function clickPuntuacion(e) {
        let idJugador = e.target.id[0]
        let idCasilla = e.target.id[1]

        objJugadores[idJugador][idCasilla]["impactos"] += 1
        //si ya le dio 3 veces puede empezar a sumar puntos
        if (objJugadores[idJugador][idCasilla]["impactos"] > 3) {
            objJugadores[idJugador]["puntos"] += objJugadores[idJugador][idCasilla]["valor"]
        }

        comprobarCerrado()
        comprobarGanador()
        actualizarTablero()
        guardarHistorias()
    }

    //ACTUALIZAMOS LAS CASILLAS Y LOS PUNTOS
    function actualizarTablero() {
        let elGanador = null
        for (let keyJugadores in objJugadores) {
            for (let keyCasillas in objJugadores[keyJugadores]) {
                let puntuacion = document.getElementById(`puntuacion${keyJugadores}`)
                let casilla = document.getElementById(`${keyJugadores}${keyCasillas}`)
                //Limpiar todo para pintar despues
                if (casilla !== null) {
                    casilla.classList.remove("pto-1", "pto-2", "pto-3", "pto-close")
                }

                //Pintar casillas y puntos
                if (objJugadores[keyJugadores][keyCasillas]["impactos"] === 1) {
                    casilla.classList.add("pto-1")
                    puntuacion.innerText = objJugadores[keyJugadores]["puntos"]
                } else if (objJugadores[keyJugadores][keyCasillas]["impactos"] === 2) {
                    casilla.classList.add("pto-2")
                    puntuacion.innerText = objJugadores[keyJugadores]["puntos"]
                } else if (objJugadores[keyJugadores][keyCasillas]["impactos"] === 3) {
                    casilla.classList.add("pto-3")
                    puntuacion.innerText = objJugadores[keyJugadores]["puntos"]
                } else if (objJugadores[keyJugadores][keyCasillas]["impactos"] > 3) {
                    casilla.classList.add("pto-3")
                    puntuacion.innerText = objJugadores[keyJugadores]["puntos"]
                }
                if (listaIdsPuntosCerrados.includes(keyCasillas)) {
                    casilla.classList.add("pto-close")
                }
            }
            if (objJugadores[keyJugadores].ganador) {
                elGanador = keyJugadores
            }
        }
        if (elGanador !== null) {
            // eliminamos el event lisener de las casillas afectadas
            let btnSigiente = document.getElementById("sig")
            btnSigiente.removeEventListener("click", clickSiguienteJugador)
            // btnSigiente.classList.remove("btn-clickable")
        
            let columnasJugador = document.querySelectorAll(".cubo-nombre")
            columnasJugador.forEach(columnaJugador => {
                columnaJugador.removeEventListener("click", clickEleccionJugador)
                columnaJugador.classList.remove("btn-clickable")
            })
            
            let btnsJuego = document.querySelectorAll(".btn-juego")
            btnsJuego.forEach(btnJuego => {
                //Eliminar clickable del anterior
                btnJuego.removeEventListener("click", clickPuntuacion)
                btnJuego.classList.remove("btn-clickable")
            })

            //Pintar txt Ganar
            let ganar = document.getElementById("contenedor-ganar")
            ganar.innerText = `${(objJugadores[elGanador].nombre).toUpperCase()} HA GANADO LA PARTIDA`
        } else {
            //Pintar txt Ganar
            let ganar = document.getElementById("contenedor-ganar")
            ganar.innerText = ""

            // hacemos que el btn siguiente y los nombres sean clicables
            crearClickEleccionAndControls()
        
            pintarColumnaJugando()
        }
    }

    //ACTUALIZAMOS LAS CASILLAS Y LOS PUNTOS
    function comprobarCerrado() {
        //si no esta cerrado
        let objComprobacionPuntuaciones = {}
        for (let keyJugadores in objJugadores) {
            for (let keyCasillas in objJugadores[keyJugadores]) {
                if (objJugadores[keyJugadores][keyCasillas]["impactos"] >= 3) {
                    if (objComprobacionPuntuaciones.hasOwnProperty(keyCasillas)) {
                        objComprobacionPuntuaciones[keyCasillas] += 1
                    } else {
                        objComprobacionPuntuaciones[keyCasillas] = 1
                    }
                }
                if (objComprobacionPuntuaciones[keyCasillas] === listaNombres.length && !listaIdsPuntosCerrados.includes(keyCasillas)) {
                    listaIdsPuntosCerrados.push(keyCasillas)

                    // eliminamos el event lisener de las casillas afectadas
                    let btnsJuego = document.querySelectorAll(".btn-juego")
                    btnsJuego.forEach(btnJuego => {
                        if (listaIdsPuntosCerrados.includes(btnJuego.id[1])) {
                            btnJuego.classList.remove("btn-clickable")
                            btnJuego.removeEventListener("click", clickPuntuacion)
                        }
                    })
                }
            }
        }
    }

    //COMPROBAR SI HAY UN GANADOR Y ELIMINAR CLICKABLES EN ESE CASO
    function comprobarGanador() {
        let jugadorTodoCerrado = []
        let jugadoresEmpate = []
        let puntosMasAltos = -1
        //ver que jugadores tienen todo cerrado
        jugador:for (let keyJugadores in objJugadores) {
            //Limpiar ganador
            objJugadores[keyJugadores].ganador = false

            for (let keyCasillas in objJugadores[keyJugadores]) {
                if (objJugadores[keyJugadores][keyCasillas].impactos < 3) {
                    continue jugador;
                }
            }
            jugadorTodoCerrado.push(keyJugadores)
        }
        //ver que jugador tiene mas puntos
        for (let keyJugadores in objJugadores) {
            if (objJugadores[keyJugadores].puntos > puntosMasAltos) {
                puntosMasAltos = objJugadores[keyJugadores].puntos;
                jugadoresEmpate = [keyJugadores];
            } else if (objJugadores[keyJugadores].puntos === puntosMasAltos) {
                jugadoresEmpate.push(keyJugadores);
            }
        }
        //si ganas
        if (jugadoresEmpate.length === 1 && jugadorTodoCerrado.includes(jugadoresEmpate[0])) {
            objJugadores[jugadoresEmpate[0]].ganador = true
        }
    }

    //GUARDAMOS EN HISTORIAL
    function guardarHistorias() {
        listaHistorial.push(structuredClone({obj: objJugadores, listaCerrados: listaIdsPuntosCerrados}))
    }

    //DESHACER LA ACCION ANTERIOR
    function deshacerAccion() {
        if (listaHistorial.length > 1) {
            listaHistorial.pop()
            objJugadores = structuredClone(listaHistorial.slice(-1).pop().obj)      //importante usar el estructure clone para que la referencia del obj sea diferente a la referencia de la lista
            listaIdsPuntosCerrados = structuredClone(listaHistorial.slice(-1).pop().listaCerrados)
        }

        pintarColumnaJugando()
        comprobarCerrado()
        comprobarGanador()
        actualizarTablero()
    }

    function domCargado(){
        //coger datos usuarios
        pintarTablero()
        crearClickEleccionAndControls()
    }

    //Inicio de carga evento
    document.addEventListener('DOMContentLoaded', domCargado);
}