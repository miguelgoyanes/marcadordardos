

function anadirNombre() {
    let contenedorNom = document.querySelector(".contenedor-nom")
    // contenedorNom.innerHTML = `<div class="contenido-nom">
    //     <button class="btn-menos" type="button">-</button>
    //     <input type="text" name="nick" id="nick${numeroNombres}">
    // </div>`

    // creamos un nuevo nombre con btn de eliminas
    let divNombre = document.createElement("div")
    divNombre.classList.add("contenido-nom")
    let btnNombre = document.createElement("button")
    btnNombre.classList.add("btn-menos")
    btnNombre.type = "button"
    btnNombre.textContent = "-"
    let imputNombre = document.createElement("input")
    imputNombre.type = "text"
    imputNombre.name = "nick"
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


function domCargado(){
    //captura todos los elementos
    baseNombres()


}

//Inicio de carga evento
document.addEventListener('DOMContentLoaded', domCargado);