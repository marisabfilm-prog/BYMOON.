window.addEventListener('load', () => {
    const elementos = document.querySelectorAll('.animar');
    console.log('Elementos animar encontrados:', elementos.length);
    setTimeout(() => {
        setupObserver('.animar');
    }, 100);
});