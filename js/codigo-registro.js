const inputs = document.querySelectorAll('.otp-input');

if (!inputs.length) {
    console.warn('Inputs OTP no encontrados');
} else {
    inputs.forEach((input, i) => {
        input.addEventListener('input', () => {
            input.value = input.value.replace(/\D/g, '');
            if (input.value) {
                input.classList.add('relleno');
                if (i < inputs.length - 1) inputs[i + 1].focus();
            } else {
                input.classList.remove('relleno');
            }
        });

        input.addEventListener('keydown', (e) => {
            if (e.key === 'Backspace' && !input.value && i > 0) {
                inputs[i - 1].focus();
            }
        });

        input.addEventListener('paste', (e) => {
            e.preventDefault();
            const texto = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 4);
            texto.split('').forEach((char, j) => {
                if (inputs[j]) {
                    inputs[j].value = char;
                    inputs[j].classList.add('relleno');
                }
            });
            if (inputs[texto.length - 1]) inputs[texto.length - 1].focus();
        });
    });
}


//EXPLICACIÓN CON MIS PALABRAS

//Qué hace: Validar entrada de código de registro(4 números)

//Elementos HTML necesarios:
//- .otp - input(4 inputs, uno para cada dígito)

//Funcionalidad:

//1. INPUT - Cuando escribes:
//- Solo acepta números(elimina cualquier otra cosa)
//    - Cuando escribes un número:
//     * Agrega clase 'relleno'(para CSS)
//    * Pasa automáticamente al siguiente input
//        - Si borras el número:
//     * Quita la clase 'relleno'

//2. BACKSPACE - Cuando presionas atrás:
//- Si el input está vacío y presionas Backspace:
//     * Te lleva al input anterior

//3. PASTE - Cuando pegas texto:
//- e.preventDefault() → evita pegar normalmente
//    - Extrae solo números del texto pegado
//        - Toma máximo 4 números
//            - Los distribuye automáticamente en los 4 inputs
//                - Ejemplo: Pegas "1a2b3c4" → se convierte en "1234"