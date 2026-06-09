document.addEventListener('DOMContentLoaded', () => {

    const btn = document.querySelector('.respiracion-btn');
    const numero = document.querySelector('.respiracion-numero');
    const instruccion = document.querySelector('.respiracion-instruccion');
    const anillos = document.querySelector('.respiracion-anillos');

    if (!btn || !numero || !instruccion || !anillos) {
        console.warn('Elementos de respiración no encontrados');
    } else {
        const fases = [
            { texto: 'Inhala...', duracion: 4 },
            { texto: 'Aguanta...', duracion: 4 },
            { texto: 'Exhala...', duracion: 6 },
        ];

        let activo = false;
        let intervalo = null;

        function iniciarCiclo() {
            let faseActual = 0;
            let segundos = fases[0].duracion;

            numero.textContent = segundos;
            instruccion.textContent = fases[0].texto;

            intervalo = setInterval(() => {
                segundos--;

                if (segundos <= 0) {
                    faseActual = (faseActual + 1) % fases.length;
                    segundos = fases[faseActual].duracion;
                    instruccion.textContent = fases[faseActual].texto;
                }

                numero.textContent = segundos;
            }, 1000);
        }

        btn.addEventListener('click', () => {
            if (!activo) {
                activo = true;
                anillos.classList.add('activo');
                iniciarCiclo();
            } else {
                activo = false;
                clearInterval(intervalo);
                anillos.classList.remove('activo');
                instruccion.textContent = 'Pulsa para comenzar';
                numero.textContent = '3';
            }
        });
    }

});

//EXPLICACIÓN CON MIS PALABRAS

//Qué hace: Un ciclo de respiración interactivo(inhala 4s, aguanta 4s, exhala 6s)

//Elementos HTML necesarios:
//- .respiracion - btn → botón para iniciar
//    - .respiracion - numero → muestra los segundos
//        - .respiracion - instruccion → muestra "Inhala", "Aguanta", "Exhala"
//            - .respiracion - anillos → elemento que se anima

//Funcionalidad:
//1. Define 3 FASES:
//- Inhala(4 segundos)
//    - Aguanta(4 segundos)
//    - Exhala(6 segundos)

//2. Cuando clickeas el botón:
//- Primera vez: Activa el ciclo
//    * Muestra "Inhala... 4"
//       * Cuenta hacia atrás cada segundo
//           * Al llegar a 0, pasa a la siguiente fase automáticamente
//               * Agrega clase 'activo' al anillo(se ve la animación)

//                    - Segunda vez: Detiene el ciclo
//                        * Limpia el intervalo(para la cuenta)
//                            * Vuelve a mostrar "Pulsa para comenzar"
//                                * Quita la clase 'activo'

//3. Usa setInterval para contar cada 1000ms(1 segundo)