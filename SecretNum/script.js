
function esEnteroPositivo(num) {
    return Number.isInteger(num) && num >= 0;
}

function esPrimo(num) {
    if (num < 2 || !Number.isInteger(num)) return false;

    for (let i = 2; i <= Math.sqrt(num); i++) {
        if (num % i === 0) return false;
    }
    return true;
}

function mostrarPrimos() {
    const inicio = Number(document.getElementById("inicio").value);
    const fin = Number(document.getElementById("fin").value);

    if (
        isNaN(inicio) || isNaN(fin) ||
        !Number.isInteger(inicio) || !Number.isInteger(fin) ||
        inicio < 0 || fin < 0
    ) {
        document.getElementById("resultadoPrimos").innerText =
            "Error: introduce solo números enteros positivos.";
        return;
    }

    if (inicio > fin) {
        document.getElementById("resultadoPrimos").innerText =
            "El número de inicio no puede ser mayor que el fin.";
        return;
    }

    let primos = [];
    for (let i = inicio; i <= fin; i++) {
        if (esPrimo(i)) primos.push(i);
    }

    document.getElementById("resultadoPrimos").innerText =
        primos.length > 0
            ? "Números primos: " + primos.join(", ")
            : "No hay números primos en ese rango.";
}

let secreto = Math.floor(Math.random() * 100) + 1;
let intentos = 0;

function comprobarNumero() {
    const entrada = document.getElementById("numeroUsuario").value;
    const numero = Number(entrada);

    if (
        isNaN(numero) ||
        !Number.isInteger(numero) ||
        numero < 1 || numero > 100
    ) {
        document.getElementById("pista").innerText =
            "Introduce un número entero entre 1 y 100.";
        return;
    }

    intentos++;

    if (numero > secreto) {
        document.getElementById("pista").innerText = "📉 El número secreto es menor.";
    } else if (numero < secreto) {
        document.getElementById("pista").innerText = "📈 El número secreto es mayor.";
    } else {
        document.getElementById("pista").innerText = "🎉 ¡Correcto!";
        document.getElementById("resultadoSecreto").innerText =
            `Has acertado en ${intentos} intentos.`;

        secreto = Math.floor(Math.random() * 100) + 1;
        intentos = 0;
    }
}