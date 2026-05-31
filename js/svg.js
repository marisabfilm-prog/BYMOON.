async function inlineSvg(host) {
    const src = host.dataset.inlineSvg;
    if (!src) return null;

    try {
        const response = await fetch(src);
        if (!response.ok) throw new Error(`No se pudo cargar ${src}`);
        host.innerHTML = await response.text();
        return host.querySelector('svg');
    } catch (error) {
        console.error('Error cargando SVG inline:', error);
        return null;
    }
}

function getFillColor(svg) {
    const styleEl = svg.querySelector('style');
    if (styleEl) {
        const match = styleEl.textContent.match(/fill\s*:\s*([^;]+)/);
        if (match) return match[1].trim();
    }
    const firstPath = svg.querySelector('path, polygon, circle');
    if (firstPath) {
        return firstPath.getAttribute('fill') || null;
    }
    return null;
}

function animarViento(vientoSvg) {
    if (!vientoSvg) return;

    setTimeout(() => {
        const shapes = vientoSvg.querySelectorAll('path, line, polyline');
        if (!shapes.length) {
            console.warn('No se encontraron shapes en el SVG');
            return;
        }

        const fillColor = getFillColor(vientoSvg);

        shapes.forEach((shape) => {
            try {
                if (shape.getTotalLength) {
                    const len = shape.getTotalLength();
                    if (len > 0) {
                        shape.style.strokeDasharray = len;
                        shape.style.strokeDashoffset = len;
                        shape.style.transition = 'none';
                    }
                }
            } catch (e) { }

            try {
                const attrFill = shape.getAttribute('fill');
                const hasStroke = shape.getAttribute('stroke');

                if (!hasStroke && attrFill !== 'none') {
                    const colorToUse = attrFill || fillColor || '#c6b6da';
                    shape.style.fill = 'transparent';
                    shape.style.stroke = colorToUse;
                    shape.style.strokeWidth = '0.2px';
                }
            } catch (e) { }
        });

        let vientoPintado = false;
        const vientoObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting && !vientoPintado) {
                        vientoPintado = true;

                        shapes.forEach((shape, i) => {
                            try {
                                if (shape.getTotalLength && shape.getTotalLength() > 0) {
                                    shape.style.transition = `stroke-dashoffset 0.6s ease ${i * 0.04}s`;
                                    shape.style.strokeDashoffset = '0';
                                }
                            } catch (e) { }
                        });
                    }
                });
            },
            { threshold: 0.1 }
        );

        vientoObserver.observe(vientoSvg);
    }, 150);
}

async function inicializarSvgsInline() {
    const hosts = document.querySelectorAll('[data-inline-svg]');
    if (!hosts.length) {
        console.warn('No se encontraron SVGs para cargar');
        return;
    }

    for (const host of hosts) {
        const svg = await inlineSvg(host);
        if (svg?.classList.contains('viento-oeste')) {
            animarViento(svg);
        }
    }
}

window.addEventListener('load', inicializarSvgsInline);


//Qué hace: Carga archivos SVG dentro del HTML y los anima

//Funcionalidad compleja - Paso a paso:

//1. FUNCIÓN inlineSvg(host):
//- Lee el atributo data - inline - svg del elemento
 //   - Hace fetch del archivo SVG
  //      - Si existe y no hay error:
  //   * Inserta el SVG dentro del elemento(innerHTML)
   // * Devuelve el elemento SVG
   //     - Si hay error:
  //   * Avisa en consola
  //  * Devuelve null

//2. FUNCIÓN animarViento(vientoSvg):
//- Busca todos los < path >, <line>, <polyline> del SVG
  //  - Para cada shape:
  //  * Calcula su longitud total (getTotalLength)
  //  * Prepara un efecto stroke-dasharray (línea discontinua invisible)
  //  * Si tiene fill, lo convierte a stroke (contorno)

  //  - Usa IntersectionObserver:
  //  * Cuando el SVG entra en viewport:
  //  - Anima el stroke-dashoffset (dibuja la línea)
  //  - Después de 600ms, anima el fill (rellena)

  //  - Efecto final: Las líneas se dibujan solas, luego se rellenan

   // 3. FUNCIÓN inicializarSvgsInline():
  //  - Al cargar la página busca todos los elementos con data-inline-svg
  //  - Para cada uno:
  //  * Carga el SVG con inlineSvg()
  //  * Si es clase 'viento-oeste', lo anima con animarViento()