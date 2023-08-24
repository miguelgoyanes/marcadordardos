const menu = document.querySelector('.hamburguesa');  
const navegacion = document.querySelector('.contenedor-navegacion');

document.addEventListener('DOMContentLoaded',()=>{
    menu.addEventListener('click', abrirMenu);
    
})

const abrirMenu = () => {
    navegacion.classList.remove('ocultar-nav');
    CrearBotonCerrar();
    CrearElementosDesplegables()
}

const CrearBotonCerrar = () => {
    //crear elemento html
    const btnCerrar = document.createElement('p');

    btnCerrar.textContent = 'x'; //añadimos contenido
    btnCerrar.classList.add('btn-cerrar');
    navegacion.appendChild(btnCerrar);
    cerrarMenu(btnCerrar);
}

const CrearElementosDesplegables = () =>{
    let tamañoPantalla =  window.innerWidth / window.devicePixelRatio
    if (tamañoPantalla <= "768") {
        let elementosMenuDesplegable = document.querySelectorAll(".element-menu-desplegable")
        elementosMenuDesplegable.forEach(elemento => {
            elemento.nextElementSibling.classList.add("ocultar-nav")
            elemento.addEventListener("click", () => {
                elemento.nextElementSibling.classList.remove("ocultar-nav")
            })
        })
        
    }
}

const cerrarMenu = (boton) => {
    boton.addEventListener('click',()=>{
        navegacion.classList.add('ocultar-nav');
        boton.remove();
    })
    let elementosMenu = document.querySelectorAll(".element-menu")
    elementosMenu.forEach(elemento => {
        elemento.addEventListener("click", () => {
            navegacion.classList.add('ocultar-nav');
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