// 1. Escucha global de clics para activar el reproductor
document.addEventListener("click", (e) => {
    if (e.target.closest(".btn-play")) {
        const player = document.getElementById("audioPlayer");
        if (player) {
            // Añadimos la clase active para que suba y se muestre
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

    // Sacamos la URL absoluta del script (ej: http://127.0.0.1:5500/js/utils/main.js)
    const urlScript = scriptActual.src;

    // Cortamos justo antes de 'js/utils/' para tener la raíz limpia del proyecto
    const raizProyecto = urlScript.substring(0, urlScript.indexOf('js/utils/'));

    // Ocultamos el main para que no se vea el salto cuando se inyecta el nav
    const mainEl = document.querySelector('main');
    if (mainEl) mainEl.style.visibility = 'hidden';

    // 3. CARGA DEL NAV DINÁMICO DESDE LA RAÍZ REAL
    fetch(`${raizProyecto}componentes/nav.html`)
        .then(response => response.text())
        .then(html => {
            let htmlAjustado = html;
            // Ajustamos las imágenes y enlaces del Nav inyectado usando la raíz real
            htmlAjustado = htmlAjustado.replace(/src="svg\//g, `src="${raizProyecto}svg/`);
            htmlAjustado = htmlAjustado.replace(/src="\.\.\/svg\//g, `src="${raizProyecto}svg/`);
            htmlAjustado = htmlAjustado.replace(/href="index\.html"/g, `href="${raizProyecto}index.html"`);
            htmlAjustado = htmlAjustado.replace(/href="html\//g, `href="${raizProyecto}html/`);

            document.body.insertAdjacentHTML('afterbegin', htmlAjustado);

            // Mostramos el main una vez el nav ya está colocado
            if (mainEl) mainEl.style.visibility = 'visible';

            if (typeof initNav === 'function') initNav();
        })
        .catch(error => {
            console.error("Error al cargar Nav:", error);
            // Si falla el fetch, mostramos el main igualmente
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

// 5. INYECCIÓN DEL REPRODUCTOR FLOTANTE
function cargarReproductorAudio(raizProyecto) {
    if (document.getElementById("audioPlayer")) return;

    const linkCSS = document.createElement("link");
    linkCSS.rel = "stylesheet";
    linkCSS.href = `${raizProyecto}css/reproductor-flotante.css`;
    document.head.appendChild(linkCSS);

    const playerContainer = document.createElement("div");
    playerContainer.className = "audio-player-footer";
    playerContainer.id = "audioPlayer";

    // CLAVE: Nace con opacidad 0 y desplazado hacia abajo (translateY 100%) para evitar el parpadeo inicial
    playerContainer.style.opacity = "0";
    playerContainer.style.transform = "translateY(100%)";
    playerContainer.style.transition = "transform 0.4s ease, opacity 0.4s ease";

    playerContainer.innerHTML = `
        <div class="player-container" style="position: relative;">
            <button class="btn-close-player" style="position: absolute; top: -13px; right: 0.5rem; background: none; border: none; font-size: 24px; cursor: pointer; z-index: 10;" >⌄</button>
            
            <div class="player-meta">
                <img src="${raizProyecto}svg/luna.svg" alt="Portada" class="player-thumb">
                <div class="player-text">
                    <h4 class="player-title">TÍTULO AUDIO</h4>
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
                    <button class="btn-play-footer">
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

    // ESCUCHA PARA EL BOTÓN DE CERRAR
    playerContainer.querySelector(".btn-close-player").addEventListener("click", () => {
        playerContainer.classList.remove("active");
        // Lo devolvemos a su estado oculto original
        playerContainer.style.opacity = "0";
        playerContainer.style.transform = "translateY(100%)";
    });
}