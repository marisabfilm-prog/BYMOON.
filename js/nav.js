const menuToggle = document.getElementById('menuToggle');
const nav = document.getElementById('nav');

if (!menuToggle || !nav) {
    console.warn('Elementos del menú no encontrados');
} else {
    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        nav.classList.toggle('active');
    });

    // Cerrar menú al hacer click en un link
    document.querySelectorAll('nav a').forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            nav.classList.remove('active');
        });
    });
}


//EXPLICACIÓN CON MIS PALABRAS

//Qué hace: Abre y cierra el menú móvil cuando clickeas el botón hamburguesa

  //  - Selecciona el botón del menú(menuToggle) y la barra de navegación(nav)
   //     - Valida que ambos elementos existan(si no, avisa en consola)
    //        - Cuando haces click en el botón:
//  * Agrega la clase 'active'(lo abre / cierra)
//   * Hace toggle: si está cerrado lo abre, si está abierto lo cierra
   //     - Cuando haces click en un link del menú:
 // * Automáticamente cierra el menú(mejora UX)