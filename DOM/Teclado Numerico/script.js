function esPrimo(num) {
    if (num <= 1) return false;
    if (num === 2) return true;
    if (num % 2 === 0) return false;

    for (let i = 3; i <= Math.sqrt(num); i += 2) {
        if (num % i === 0) return false;
    }
    return true;
}

let teclado = document.getElementById("teclado");

for (let i = 1; i < 100; i++) {
    let tecla = document.createElement("div");
    tecla.innerHTML = "<p>" + i + "</p>";
    tecla.className = "tecla";

    if (i % 2 === 0) {
        tecla.style.background = "blue";
        tecla.style.color = "white";
    }

    if (i % 3 === 0) {
        tecla.style.background = "red";
        tecla.style.color = "white";
    }

    if (i % 5 === 0) {
        tecla.style.background = "yellow";
        tecla.style.color = "black";
    }

    if (esPrimo(i)) {
        tecla.style.background = "green";
        tecla.style.color = "white";
    }

    teclado.appendChild(tecla);
}
