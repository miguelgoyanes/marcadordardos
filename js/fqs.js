document.addEventListener('DOMContentLoaded',()=>{
    crearFqsDesplegable()
})


const crearFqsDesplegable = () =>{
    let fqsDesplegable = document.querySelectorAll(".titulo-fqs")
    fqsDesplegable.forEach(elemento => {
        elemento.nextElementSibling.classList.add("ocultar-fqs")
        elemento.addEventListener("click", () => {
            funcionamientoFqsDesplegable(elemento)
        })
    })
}

const funcionamientoFqsDesplegable = (elemento) => {
    if (elemento.nextElementSibling.classList.contains("ocultar-fqs")) {
        elemento.nextElementSibling.classList.remove("ocultar-fqs")
    } else {
        elemento.nextElementSibling.classList.add("ocultar-fqs")
    }
}