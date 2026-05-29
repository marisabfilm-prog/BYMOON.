// Definimos los contenidos en variables para que el código sea limpio
const contenidoHilos = `
    <div class="hilo-card hilo-propio" style="background-image: url('jpg/hilo1.jpg');">
        <div class="hilo-overlay"><p>La luna sabe de mis secretos</p></div>
    </div>
    <div class="hilo-card hilo-ajeno">
        <p class="hilo-autor">HILO de @porsinovuelves</p>
        <p class="hilo-cita">Dormir es el arte de soltar todo lo que no puedes controlar hasta mañana.</p>
    </div>
    `;

const contenidoGuardados = `
    <div class="hilo-card hilo-propio" style="background-image: url('jpg/hilo1.jpg');">
        <span class="icon-corazon">❤️</span>
        <div class="hilo-overlay"><p>La luna sabe de mis secretos</p></div>
    </div>
    <div class="hilo-card hilo-ajeno">
        <span class="icon-corazon">❤️</span>
        <p class="hilo-autor">HILO de @porsinovuelves</p>
        <p class="hilo-cita">Dormir es el arte de soltar todo lo que no puedes controlar hasta mañana.</p>
    </div>
    <div class="hilo-card hilo-propio" style="background-image: url('jpg/hilo2.jpg');">
        <span class="icon-corazon">❤️</span>
        <div class="hilo-overlay"><p>Lo que pasa si no te duermes</p></div>
    </div>
    `;

const btnHilos = document.getElementById('btn-hilos');
const btnGuardados = document.getElementById('btn-guardados');
const infoTab = document.getElementById('info-tab');
const grid = document.getElementById('grid-contenido');

if (!btnHilos || !btnGuardados || !infoTab || !grid) {
    console.warn('Elementos de actividad nocturna no encontrados');
} else {
    function cambiarTab(tipo) {
        // Resetear estados de botones
        btnHilos.classList.remove('active');
        btnGuardados.classList.remove('active');

        if (tipo === 'guardados') {
            btnGuardados.classList.add('active');
            infoTab.innerText = "Aquí encontrarás los hilos que has guardado";
            grid.innerHTML = contenidoGuardados;
        } else {
            // Volver a Hilos
            btnHilos.classList.add('active');
            infoTab.innerText = "Aquí encontrarás los hilos y comentarios creados por ti";
            grid.innerHTML = contenidoHilos;
        }
    }

    // Ejecutar una vez al cargar para que aparezcan los hilos al principio
    window.addEventListener('load', () => cambiarTab('hilos'));
}


//Qué hace: Cambiar entre dos tabs: "Mis Hilos" y "Hilos Guardados"

//Elementos HTML necesarios:
//- #btn - hilos → botón "Mis Hilos"
//    - #btn - guardados → botón "Guardados"
//        - #info - tab → texto descriptivo
//            - #grid - contenido → contenedor donde se muestran los hilos

//Funcionalidad:

//1. Define dos CONTENIDOS HTML:
//- contenidoHilos: Muestra tus hilos creados
 //   - contenidoGuardados: Muestra hilos que guardaste con ❤️

//2. Función cambiarTab(tipo):
//- Si tipo = 'guardados':
//     * Marca el botón como activo
//    * Cambia el texto descriptivo
 //       * Carga contenidoGuardados en el grid

 //           - Si tipo = 'hilos'(u otro):
 //    * Marca el botón como activo
 //   * Cambia el texto descriptivo
 //       * Carga contenidoHilos en el grid

//3. Al cargar la página:
//- Se ejecuta cambiarTab('hilos') automáticamente
 //   - Por eso ves "Mis Hilos" al principio