const grid = document.getElementById("grid");
const tecladoLetras = document.getElementById("tecladoLetras");


const palabras = ["LOCAS", "CAZAS", "PATOS", "LAMER", "JAMON"];
const palabraSecreta = palabras[Math.floor(Math.random() * palabras.length)];

let intento = "";
let filaActual = 0;


for (let i = 0; i < 6*5; i++) {
    const celda = document.createElement("div");
    celda.classList.add("celda");
    grid.appendChild(celda);
}


"ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").forEach(letra => {
    let tecla = document.createElement("div");
    tecla.classList.add("tecla");
    tecla.textContent = letra;

    tecla.onclick = () => {
        if (intento.length < 5) {
            intento += letra;
            actualizarGrid();
        }
    };

    tecladoLetras.appendChild(tecla);
});

function actualizarGrid() {
    for (let i = 0; i < 5; i++) {
        const celda = grid.children[filaActual*5 + i];
        celda.textContent = intento[i] || "";
        celda.style.backgroundColor = "white";
    }
}


document.getElementById("borrar").onclick = () => {
    intento = intento.slice(0, -1);
    actualizarGrid();
};

document.getElementById("comprobar").onclick = () => {
    if (intento.length !== 5) {
        alert("La palabra debe tener 5 letras");
        return;
    }

    for (let i = 0; i < 5; i++) {
        const celda = grid.children[filaActual*5 + i];

        if (intento[i] === palabraSecreta[i]) {
            celda.style.backgroundColor = "green";
        } else if (palabraSecreta.includes(intento[i])) {
            celda.style.backgroundColor = "goldenrod";
        } else {
            celda.style.backgroundColor = "gray";
        }
    }

    if (intento === palabraSecreta) {
        alert("¡Has ganado!");
    }

    intento = "";
    filaActual++;
    if (filaActual >= 6 && intento !== palabraSecreta) {
        alert("¡Juego terminado! La palabra era: " + palabraSecreta);
    }
};
