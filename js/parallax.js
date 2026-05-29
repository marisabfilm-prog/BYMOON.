// PARALLAX - scroll
const barcoHero = document.querySelector('.barco-hero');
const aguaHero = document.querySelector('.agua-hero');
const nubesHero = document.querySelector('.nubes-hero');
const lunaHero = document.querySelector('.luna-hero');
const textElement = document.querySelector('.text');
const acompSection = document.querySelector('.acomp-section');

if (!barcoHero || !aguaHero || !nubesHero || !lunaHero) {
    console.warn('Elementos del parallax no encontrados');
} else {
    window.addEventListener('scroll', function () {
        const scrolled = window.pageYOffset;
        
        barcoHero.style.transform = `translateY(${scrolled * -0.5}px)`;
        aguaHero.style.transform = `translateY(${scrolled * -0.5}px)`;
        nubesHero.style.transform = `translateY(${scrolled * -0.5}px)`;
        lunaHero.style.transform = `translateY(${scrolled * -0.9}px)`;

        // Efecto en texto del hero: subir y desvanecer
        if (textElement) {
            if (scrolled > 100) {
                const fadeStart = 100;
                const fadeEnd = 300;
                const progress = Math.min(
                    (scrolled - fadeStart) / (fadeEnd - fadeStart),
                    1,
                );
                textElement.style.opacity = 1 - progress;
                textElement.style.transform = `translateY(${-progress * 50}px)`;
            } else {
                textElement.style.opacity = 1;
                textElement.style.transform = 'translateY(0px)';
            }
        }

        // Desvanecer SVGs después de cierto scroll
        const svgs = document.querySelectorAll(
            '.barco-hero, .agua-hero, .nubes-hero, .luna-hero',
        );
        if (scrolled > 300) {
            const fadeStart = 300;
            const fadeEnd = 550;
            const progress = Math.min(
                (scrolled - fadeStart) / (fadeEnd - fadeStart),
                1,
            );
            svgs.forEach((svg) => {
                svg.style.opacity = 1 - progress;
            });
        } else {
            svgs.forEach((svg) => {
                svg.style.opacity = 1;
            });
        }

        if (acompSection) {
            if (scrolled > 250) {
                acompSection.classList.add('visible');
            } else {
                acompSection.classList.remove('visible');
            }
        }
    });
}


//Qué hace: Crea efecto de profundidad mientras scrolleas (objetos se mueven a diferentes velocidades)

//Elementos que se mueven:
//- .barco - hero → se mueve lentamente(0.5x scroll)
//    - .agua - hero → se mueve lentamente(0.5x scroll)
//        - .nubes - hero → se mueve lentamente(0.5x scroll)
 //           - .luna - hero → se mueve mucho(0.9x scroll - más profunda)
  //              - .text → desaparece mientras scrolleas
 //                  - .acomp - section → se hace visible pasado cierto punto

//Funcionalidad detallada:

//1. EFECTO PARALLAX PRINCIPAL:
//- Cuando scrolleas:
 //    * barco, agua, nubes = -0.5px por cada px scrolleado
 //   * luna = -0.9px(se queda más atrás, efecto profundidad)
 //       - Usa: style.transform = translateY(scrolled * velocidad)

//2. TEXTO QUE DESAPARECE(fade - out):
//- Entre scroll 100px y 300px:
  //   * El texto desaparece gradualmente(opacity: 1 → 0)
  //  * Se sube(translateY: 0 → -50px)
  //      - Es un efecto suave, no desaparece de golpe

//3. SVGs QUE SE DESVANECEN:
//- Entre scroll 300px y 550px:
   //  * Los 4 SVGs se desvanecen(opacity: 1 → 0)
  //  - Cuando llegas a 550px están completamente invisibles

//4. SECCIÓN DE ACOMPAÑAMIENTO:
//- Cuando scrolleas más de 250px:
  //   * La sección.acomp - section recibe clase 'visible'
  //  * CSS la anima(aparece)