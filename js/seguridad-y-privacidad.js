const tabs = document.querySelectorAll('.privacidad-tab');
const secciones = document.querySelectorAll('.privacidad-seccion');

if (!tabs.length || !secciones.length) {
    console.warn('Elementos de privacidad no encontrados');
} else {
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('privacidad-tab-activo'));
            tab.classList.add('privacidad-tab-activo');
        });
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                tabs.forEach(tab => {
                    tab.classList.remove('privacidad-tab-activo');
                    if (tab.getAttribute('href') === `#${id}`) {
                        tab.classList.add('privacidad-tab-activo');
                    }
                });
            }
        });
    }, { rootMargin: '-40% 0px -55% 0px' });

    secciones.forEach(sec => observer.observe(sec));
}


//Qué hace: Sistema de tabs para navegar por secciones de privacidad

//Elementos HTML necesarios:
//- .privacidad - tab(botones / links del menú)
//    - .privacidad - seccion(contenido de cada sección)

//Funcionalidad:

//1. CLICK EN TAB:
//- Cuando haces click en un tab:
 //    * Quita 'privacidad-tab-activo' de todos los tabs
 //   * Agrega 'privacidad-tab-activo' solo al que clickeaste
  //      * CSS lo resalta

//2. SCROLL AUTOMÁTICO:
//- Usa IntersectionObserver para detectar qué sección ves
  //  - Cuando scrolleas y una sección entra en viewport:
  //   * El observador detecta su ID
  //  * Busca el tab que corresponde a ese ID
   //     * Lo marca como activo automáticamente

          //  - rootMargin: '-40% 0px -55% 0px'
        //        * Significa: empieza a detectar cuando está al 40 % desde arriba

//Resultado: Mientras scrolleas, el menú se actualiza automáticamente