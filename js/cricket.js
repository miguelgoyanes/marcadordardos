const listaJugadores = []
function pintarTablero() {
    let listaNombres = JSON.parse(sessionStorage.getItem('listaNombres'))
    let contenedorTablero = document.getElementById("contenedor-tablero")
    contenedorTablero.style.width = listaNombres.length * 100 + "px"
    contenedorTablero.style.gridTemplateColumns = `repeat(${listaNombres.length + 1}, 1fr)`
    //pintar columnas
    let contadorIds = 1
    listaNombres.forEach(element => {
        //creando el contenedor del jugados
        let contenedorVertical = document.createElement("div")
        contenedorVertical.classList.add("contenedor-vertical")
        contenedorTablero.appendChild(contenedorVertical)
        //creamos objeto jugador
        let objJugador = {
            nombre: element,
            puntos: 0,
        }
        //creando el contedido del div del jugador
        let htmlPorJugador = `<div class="cubo"><p class="nombre-jugadores">${element}</p></div>
        <div class="cubo puntuacion"><p>0</p></div>`
        let contadorNumCasillas = 20
        for (let i = 1; i < 8; i++) {
            //adjudicando id al obj
            let NumCasillas = null
            if (contadorNumCasillas == 14) {
                NumCasillas = "B"
            } else {
                NumCasillas = contadorNumCasillas
            }
            objJugador[contadorIds] = {nombre: `casilla${NumCasillas}`, impactos: 0},
            contadorNumCasillas -= 1
            // pintando casillas con id correspondintes
            htmlPorJugador += `<div class="cubo btn-juego"><div id="${contadorIds}"></div></div>`
            contadorIds += 1
        }
        listaJugadores.push(objJugador)
        contenedorVertical.innerHTML = htmlPorJugador
    });
}

function hacerClickable() {
    let btnsJurgo = document.querySelectorAll(".btn-juego")
    btnsJurgo.forEach(btnJuego => {
        btnJuego.addEventListener("click", event => {
            for(let obj of listaJugadores) {
                let numero = event.target.firstElementChild.id
                if (obj[numero]) {
                    console.log(obj[numero]);
                }

            }
        })
    })
}

function domCargado(){
    //coger datos usuarios
    pintarTablero()
    hacerClickable()

}

//Inicio de carga evento
document.addEventListener('DOMContentLoaded', domCargado);