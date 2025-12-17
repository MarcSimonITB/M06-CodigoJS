let teclado = document.getElementById("teclado");

for (let i = 1; i < 101; i++) {
    let tecla = document.createElement("div");
    tecla.className = "Tecla";
    tecla.innerHTML = "<p>" + i + "</p>";

    if (i % 2 === 0) {
        tecla.style.backgroundColor = "cyan";
    }

    teclado.appendChild(tecla);
}
