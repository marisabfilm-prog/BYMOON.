function setupObserver(selector, options = {}) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(e => {
            if (e.isIntersecting) {
                e.target.classList.add('visible');
                observer.unobserve(e.target);
            }
        });
    }, { threshold: 0.1, ...options });

    const elements = document.querySelectorAll(selector);
    if (elements.length === 0) {
        console.warn(`No se encontraron elementos para: ${selector}`);
        return;
    }
    
    elements.forEach(el => observer.observe(el));
}

//Qué hace: Función que centraliza el IntersectionObserver para evitar repetir código

//FUNCIÓN setupObserver(selector, options = {}):

//Parámetros:
//- selector: string CSS para buscar elementos(".mi-clase, .otra-clase")
 //   - options: configuración opcional del Observer(threshold, etc)

//Funcionalidad:
//1. Crea un IntersectionObserver genérico
//2. Cuando un elemento entra en viewport:
//- Agrega clase 'visible'(CSS lo anima)
 //   - Para de observar ese elemento(se ejecuta una sola vez)
//3. Busca todos los elementos con el selector
//4. Si no encuentra ninguno, avisa en consola
//5. Si encuentra, los observa a todos

//Se usa en:
//- categorias.js
   // - desvelados.js

//Ventaja: El mismo código se reutiliza, sin repetir