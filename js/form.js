

function anadirNombre(numeroNombres) {
    let contenedorNom = document.querySelector(".contenedor-nom")
    contenedorNom.innerHTML = `<div class="contenido-nom">
        <button class="btn-menos" type="button">-</button>
        <input type="text" name="nick" id="nick${numeroNombres}">
    </div>`
    console.log(contenedorNom);
    numeroNombres += 1

}

function baseNombres() {
    btnMas = document.getElementById("btn-mas")

    let numeroNombres = 1
    btnMas.addEventListener("click", () => {
        anadirNombre(numeroNombres)
    })
}


function domCargado(){
    //captura todos los elementos
    baseNombres()

}

//Inicio de carga evento
document.addEventListener('DOMContentLoaded', domCargado);