

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

function baseNombres() {
    let btnMas = document.getElementById("btn-mas")
    let contenedorNom = document.querySelector(".contenedor-nom")

    btnMas.addEventListener("click", () => {
        //comprobamos numero de hijos
        if (contenedorNom.childNodes.length <= 6) {
            anadirNombre()
        } else {
            let error = document.getElementById("error")
            error.innerText = "Solo puedes introducir 6 jugadores\nPuedes probar a jugar por equipos"
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

function datosUsuario(listaNombres, modalidadJuego) {
    sessionStorage.setItem('listaNombres', listaNombres);
    sessionStorage.setItem('modalidadJuego', modalidadJuego.value);
}

function comprobarForm(event) {
    let listaNombres = []
    let contenedorNom = document.querySelector(".contenedor-nom")
    let nombres = document.querySelectorAll(".nombre")
    let error = document.getElementById("error")
    if (contenedorNom.childNodes.length < 1) {
        event.preventDefault()
        error.innerText = "Debe introducir por lo mejos un jugador"
        return false
    } else {
        nombres.forEach(nombre => {
            if (nombre.value.length === 0) {
                nombre.focus()
                event.preventDefault()
                error.innerText = "Debe introducir todos los nombres"
                return false
            } else {
                listaNombres.push(nombre.value)
            }
        })
    }
    let modalidadJuego = document.getElementById("modalidad-juego")
    if(modalidadJuego.value == "0"){
        event.preventDefault();
        error.innerText="Debe seleccionar una modalida de juego"
        return false;
    }
    datosUsuario(listaNombres, modalidadJuego)
    return true
}


function domCargado(){
    //captura todos los elementos
    baseNombres()
    
    //comprobar formulario
    let btnSubmit = document.getElementById("formJuego")
    btnSubmit.addEventListener("submit", comprobarForm)

}

//Inicio de carga evento
document.addEventListener('DOMContentLoaded', domCargado);