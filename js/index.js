
const clickableComoJugar = () => {
    const instrucciones = document.querySelectorAll(".btn-instrucciones")
    instrucciones.forEach(instruccion => {
        instruccion.addEventListener("click", () => {
            window.location.href = "./comoJugar" + instruccion.innerText + ".html"
        })
    })
}


function domCargado(){
    clickableComoJugar()
}

//Inicio de carga evento
document.addEventListener('DOMContentLoaded', domCargado);