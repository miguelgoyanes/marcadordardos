document.addEventListener('DOMContentLoaded',()=>{
    importarNavegador()
    importarFooter()
})
const importarNavegador = () => {
    const navegador = document.getElementById("navegador")
    let contenidoNavegador = 
        `<div class="logo"><a href="index.html"><img src="./img/dardo.png" alt="logo marcador dardos"></a></div>
        <div class="contenedor-navegacion ocultar-nav">
            <ul class="menu-horizontal">
                <li><a class="element-menu" href="index.html">Home</a></li>
                <li><a class="element-menu" href="seleccionJuego.html">Jugar</a></li>
                <li>
                    <a class="element-menu-desplegable" href="#">Como jugar <i
                            class="fa-solid fa-angle-down fa-xs"></i></a>
                    <ul class="menu-vertical">
                        <li><a class="element-menu" href="comoJugarCricket.html">Cricket</a></li>
                        <li><a class="element-menu" href="comoJugar301.html">301</a></li>
                        <li><a class="element-menu" href="comoJugar501.html">501</a></li>
                        <li><a class="element-menu" href="comoJugar701.html">701</a></li>
                    </ul>
                </li>
                <li>
                    <a class="element-menu-desplegable" href="#">Ayuda<i
                            class="fa-solid fa-angle-down fa-xs"></i></a>
                    <ul class="menu-vertical">
                        <li><a class="element-menu" href="equipamiento.html">Equipamiento</a></li>
                        <li><a class="element-menu" href="tecnicasEntrenamiento.html">Técnicas y Entrenamiento</a></li>
                        <li><a class="element-menu" href="curiosidades.html">Curiosidades</a></li>
                        <li><a class="element-menu" href="index.html#preguntas-frecuentes">FQs</a></li>
                    </ul>
                </li>
            </ul>
        </div>
        <div class="hamburguesa">
            <span></span><span></span><span></span>
        </div>`
    navegador.innerHTML = contenidoNavegador

    // hacemos abrible el menu
    const menu = document.querySelector('.hamburguesa');  
    menu.addEventListener('click', abrirMenu);
}   

const importarFooter = () => {
    const footer = document.getElementById("footer")
    if (footer !== null) {
        let contenidoFooter = 
            `<div>
                <a href="sobreNosotros.html">Contactanos</a>
            </div>
            <div>
                <a href="politicaPrivacidad.html">Politica de privacidad</a>
            </div>`
        footer.innerHTML = contenidoFooter
    }
} 

const abrirMenu = () => {
    const navegacion = document.querySelector('.contenedor-navegacion');
    navegacion.classList.remove('ocultar-nav');
    CrearBotonCerrar();
    crearElementosDesplegables()
}

const CrearBotonCerrar = () => {
    //crear elemento html
    const btnCerrar = document.createElement('p');

    btnCerrar.textContent = 'x'; //añadimos contenido
    btnCerrar.classList.add('btn-cerrar');
    const navegacion = document.querySelector('.contenedor-navegacion');
    navegacion.appendChild(btnCerrar);
    cerrarMenu(btnCerrar);
}

const crearElementosDesplegables = () =>{
    let tamañoPantalla =  window.innerWidth / window.devicePixelRatio
    if (tamañoPantalla <= "768") {
        let elementosMenuDesplegable = document.querySelectorAll(".element-menu-desplegable")
        elementosMenuDesplegable.forEach(elemento => {
            elemento.nextElementSibling.classList.add("ocultar-nav")
            elemento.addEventListener("click", () => {
                funcionamientoDesplegable(elemento)
            })
        })
        
    }
}

const funcionamientoDesplegable = (elemento) => {
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
        const navegacion = document.querySelector('.contenedor-navegacion');
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

