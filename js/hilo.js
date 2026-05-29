const elementos = document.querySelectorAll(
    '.hilo-titulo, .hilo-principal, .respuesta-item, .escribir-respuesta'
);

if (!elementos.length) {
    console.warn('Elementos del hilo no encontrados');
} else {
    elementos.forEach((el, i) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = `opacity 0.6s ease, transform 0.6s ease`;

        setTimeout(() => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }, i * 150);
    });
}


//Qué hace: Anima los elementos del hilo con efecto de entrada

//Elementos que anima:
//- .hilo - titulo
//    - .hilo - principal
//    - .respuesta - item
//    - .escribir - respuesta

//Funcionalidad:
//1. Al cargar la página:
//- Todos los elementos comienzan invisibles(opacity: 0)
//    - Desplazados hacia abajo(translateY: 20px)

//2. Usa setTimeout para hacer stagger animation:
//- Primer elemento: anima en 0ms
//    - Segundo elemento: anima en 150ms
//        - Tercer elemento: anima en 300ms
//            - Etc. (cada uno 150ms después del anterior)

//3. La animación:
//- Opacidad: 0 → 1(aparece)
//    - Posición: 20px abajo → 0(sube)
//       - Duración: 0.6s

//Resultado: Efecto cascada de elementos subiendo