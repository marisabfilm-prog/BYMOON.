// 1. Escucha global de clics para activar el reproductor
document.addEventListener("click", (e) => {
    if (e.target.closest(".btn-play")) {
        const player = document.getElementById("audioPlayer");
        if (player) {
            player.classList.add("active");
            player.style.opacity = "1";
            player.style.transform = "translateY(0)";
        }
    }
});

document.addEventListener("DOMContentLoaded", () => {
    // 2. DETECTAR LA RAÍZ CORTANDO EN 'js/utils/'
    const scriptActual = document.currentScript || document.querySelector('script[src*="main.js"]');

    if (!scriptActual) {
        console.error("No se pudo encontrar el script para calcular las rutas.");
        return;
    }

    const urlScript = scriptActual.src;
    const raizProyecto = urlScript.substring(0, urlScript.indexOf('js/utils/'));

    const mainEl = document.querySelector('main');
    if (mainEl) mainEl.style.visibility = 'hidden';

    // 3. CARGA DEL NAV DINÁMICO
    fetch(`${raizProyecto}componentes/nav.html`)
        .then(response => response.text())
        .then(html => {
            let htmlAjustado = html;
            htmlAjustado = htmlAjustado.replace(/src="svg\//g, `src="${raizProyecto}svg/`);
            htmlAjustado = htmlAjustado.replace(/src="\.\.\/svg\//g, `src="${raizProyecto}svg/`);
            htmlAjustado = htmlAjustado.replace(/href="index\.html"/g, `href="${raizProyecto}index.html"`);
            htmlAjustado = htmlAjustado.replace(/href="html\//g, `href="${raizProyecto}html/`);

            document.body.insertAdjacentHTML('afterbegin', htmlAjustado);

            if (mainEl) mainEl.style.visibility = 'visible';

            initNav();
        })
        .catch(error => {
            console.error("Error al cargar Nav:", error);
            if (mainEl) mainEl.style.visibility = 'visible';
        });

    // 4. CARGA DEL FOOTER DINÁMICO
    fetch(`${raizProyecto}componentes/footer.html`)
        .then(response => response.text())
        .then(html => {
            let htmlAjustado = html;
            htmlAjustado = htmlAjustado.replace(/src="svg\//g, `src="${raizProyecto}svg/`);
            htmlAjustado = htmlAjustado.replace(/src="\.\.\/svg\//g, `src="${raizProyecto}svg/`);

            document.body.insertAdjacentHTML('beforeend', htmlAjustado);
            cargarReproductorAudio(raizProyecto);
        })
        .catch(error => console.error("Error al cargar Footer:", error));
});

// 5. MENÚ HAMBURGUESA
function initNav() {
    const menuToggle = document.getElementById('menuToggle');
    const nav = document.getElementById('nav');

    if (!menuToggle || !nav) return;

    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        nav.classList.toggle('active');
    });

    // Cierra el menú al pulsar un enlace (móvil)
    nav.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            nav.classList.remove('active');
        });
    });
}

// 6. INYECCIÓN DEL REPRODUCTOR FLOTANTE
function cargarReproductorAudio(raizProyecto) {
    if (document.getElementById("audioPlayer")) return;

    const linkCSS = document.createElement("link");
    linkCSS.rel = "stylesheet";
    linkCSS.href = `${raizProyecto}css/reproductor-flotante.css`;
    document.head.appendChild(linkCSS);

    const playerContainer = document.createElement("div");
    playerContainer.className = "audio-player-footer";
    playerContainer.id = "audioPlayer";

    playerContainer.style.opacity = "0";
    playerContainer.style.transform = "translateY(100%)";
    playerContainer.style.transition = "transform 0.4s ease, opacity 0.4s ease";

    playerContainer.innerHTML = `
        <div class="player-container" style="position: relative;">
            <button class="btn-close-player" style="position: absolute; top: -13px; right: 0.5rem; background: none; border: none; font-size: 24px; cursor: pointer; z-index: 10;" >⌄</button>
            <div class="player-meta">
                <img src="${raizProyecto}svg/luna.svg" alt="Portada" class="player-thumb">
                <div class="player-text">
                    <p class="player-title">TÍTULO AUDIO</p>
                    <p class="player-subtitle">Sonidos para un descanso profundo</p>
                </div>
            </div>
            <div class="player-controls-wrapper">
                <div class="progress-bar-container">
                    <div class="progress-bar-fill"></div>
                    <div class="progress-bar-bullet"></div>
                </div>
                <div class="player-buttons">
                    <button class="btn-prev"><</button>
                    <button class="btn-play-footer" aria-label="Reproducir">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
                    </button>
                    <button class="btn-next">></button>
                </div>
            </div>
            <div class="player-volume">
                <span class="icon-volume">🔊</span>
                <div class="volume-bar"><div class="volume-bar-fill"></div></div>
            </div>
        </div>
    `;

    document.body.appendChild(playerContainer);

    playerContainer.querySelector(".btn-close-player").addEventListener("click", () => {
        playerContainer.classList.remove("active");
        playerContainer.style.opacity = "0";
        playerContainer.style.transform = "translateY(100%)";
    });
}


// Botón flotante Céfiro
const cefirofloat = document.createElement('a');
cefirofloat.href = '/html/cefiro/cefiro2.html';
cefirofloat.className = 'cefiro-float';
cefirofloat.setAttribute('aria-label', 'Habla con Céfiro');
cefirofloat.innerHTML = `
  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
  </svg>
`;
document.body.appendChild(cefirofloat);

if (window.location.pathname.includes('cefiro2')) {
    cefirofloat.style.display = 'none';
}