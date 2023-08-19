
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

//comprobaciones y eventListener para los botones + - 
function baseNombres() {
    let btnMas = document.getElementById("btn-mas")
    let contenedorNom = document.querySelector(".contenedor-nom")

    btnMas.addEventListener("click", () => {
        //comprobamos numero de hijos
        if (contenedorNom.childNodes.length < 6) {
            anadirNombre()
        } else {
            let error = document.getElementById("error")
            error.innerText = "Solo puedes introducir 6 jugadores"
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

//Subir los dados del usuario al sessionStorage
function datosUsuario(listaNombres, juego01) {
    // al subirlo como array el storage lo convierte a str
    // asi que vamos a subirlo con un json
    sessionStorage.setItem('listaNombres', JSON.stringify(listaNombres));
    sessionStorage.setItem('juego_01', juego01)
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
    let modalidadJuego = document.getElementById("modalidad-juego")
    if(modalidadJuego.value === "0"){
        event.preventDefault();
        error.innerText="Debe seleccionar una modalida de juego"
        return false;
    } else if (modalidadJuego.value === "cricket") {
        datosUsuario(listaNombres)
        let formJuego = document.getElementById("formJuego")
        formJuego.action = "cricket.html"
        return true
    } else if (modalidadJuego.value === "301" || modalidadJuego.value === "501" || modalidadJuego.value === "701") {
        datosUsuario(listaNombres, modalidadJuego.value)
        let formJuego = document.getElementById("formJuego")
        formJuego.action = "501.html"
        return true
    }
}


function domCargado(){
    //captura todos los elementos
    baseNombres()
    
    //comprobar formulario
    let formJuego = document.getElementById("formJuego")
    formJuego.addEventListener("submit", comprobarForm)

}

//Inicio de carga evento
document.addEventListener('DOMContentLoaded', domCargado);