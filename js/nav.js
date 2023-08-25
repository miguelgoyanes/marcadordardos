const menu = document.querySelector('.hamburguesa');  
const navegacion = document.querySelector('.contenedor-navegacion');

document.addEventListener('DOMContentLoaded',()=>{
    menu.addEventListener('click', abrirMenu);
    
})

const abrirMenu = () => {
    navegacion.classList.remove('ocultar-nav');
    CrearBotonCerrar();
    crearElementosDesplegables()
}

const CrearBotonCerrar = () => {
    //crear elemento html
    const btnCerrar = document.createElement('p');

    btnCerrar.textContent = 'x'; //añadimos contenido
    btnCerrar.classList.add('btn-cerrar');
    navegacion.appendChild(btnCerrar);
    cerrarMenu(btnCerrar);
}

const crearElementosDesplegables = () =>{
    let tamañoPantalla =  window.innerWidth / window.devicePixelRatio
    if (tamañoPantalla <= "768") {
        let elementosMenuDesplegable = document.querySelectorAll(".element-menu-desplegable")
        elementosMenuDesplegable.forEach(elemento => {
            elemento.nextElementSibling.classList.add("ocultar-nav")
            console.log(elemento);
            elemento.addEventListener("click", () => {
                funcionamientoDesplegable(elemento)
            })
        })
        
    }
}

const funcionamientoDesplegable = (elemento) => {
    console.log(elemento);
    if (elemento.nextElementSibling.classList.contains('ocultar-nav')) {
        elemento.nextElementSibling.classList.remove("ocultar-nav")
    } else {
        elemento.nextElementSibling.classList.add("ocultar-nav")
    }
}

const eliminamosElementosDesplegables = () =>{
    let elementosMenuDesplegable = document.querySelectorAll(".element-menu-desplegable")
    elementosMenuDesplegable.forEach(elemento => {
        elemento.removeEventListener("click", () => {
            funcionamientoDesplegable(elemento)
        })
    })
}

const cerrarMenu = (boton) => {
    boton.addEventListener('click',()=>{
        navegacion.classList.add('ocultar-nav');
        boton.remove();
        eliminamosElementosDesplegables()
    })
    let elementosMenu = document.querySelectorAll(".element-menu")
    elementosMenu.forEach(elemento => {
        elemento.addEventListener("click", () => {
            navegacion.classList.add('ocultar-nav');
            boton.remove();
            eliminamosElementosDesplegables()
        })
    })
}


// function ponerPuntosElementosMenu() {
//     if (window.innerWidth <= "768") {
//         const elementosMenu = document.querySelectorAll(".menu-vertical > li > a ")
//         elementosMenu.forEach(elemento => {
//             elemento.innerText = "- " + elemento.innerText
//         })
//     }
// }