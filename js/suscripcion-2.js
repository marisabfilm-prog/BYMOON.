const radios = document.querySelectorAll('.metodo input[type=radio]');
const camposTarjeta = document.getElementById('campos-tarjeta');

if (!radios.length) {
    console.warn('Inputs de método de pago no encontrados');
} else if (!camposTarjeta) {
    console.warn('Campo de tarjeta no encontrado');
} else {
    radios.forEach(radio => {
        radio.addEventListener('change', () => {
            document.querySelectorAll('.metodo').forEach(m => m.classList.remove('activo'));
            radio.closest('.metodo').classList.add('activo');
            camposTarjeta.style.display = radio.value === 'tarjeta' ? 'flex' : 'none';
        });
    });
}


//Qué hace: Mostrar/ocultar campo de tarjeta según el método elegido

//Elementos HTML necesarios:
//- .metodo input[type = radio](botones radio de métodos)
 //   - #campos - tarjeta(formulario de tarjeta que se muestra / oculta)

//Funcionalidad:

//1. Cuando seleccionas un radio button:
//- Quita 'activo' de todos los métodos
 //   - Agrega 'activo' al que seleccionaste(CSS lo resalta)

//2. Lógica:
//- Si value = 'tarjeta':
  //   * Muestra el campo de tarjeta(display: flex)
  //  - Si value ≠ 'tarjeta':
  //   * Oculta el campo de tarjeta(display: none)

//Resultado: Campo de tarjeta aparece / desaparece según el método