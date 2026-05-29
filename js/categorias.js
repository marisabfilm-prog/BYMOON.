setupObserver('.categoria-hero, .hilos');


//EXPLICACIÓN CON MIS PALABRAS
//Qué hace: Hace visible los elementos cuando entran en la pantalla

//Usa la función setupObserver() del archivo utils / observer.js

//Elementos que anima:
//- .categoria - hero
//    - .hilos

//Funcionalidad:
//- Cuando scrolleas y el elemento entra en viewport:
//  * Agrega clase 'visible'(CSS lo anima)
//    * Deja de observar ese elemento(se ejecuta una sola vez)