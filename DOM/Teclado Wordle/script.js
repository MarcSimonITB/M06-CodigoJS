let campoTexto = document.getElementById("campoTexto");
let tecladoLetras = document.getElementById("tecladoLetras");
let tecladoNumeros = document.getElementById("tecladoNumeros");


const letrasVerdes = ["A", "E", "I", "O", "U"];
const letras = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

letras.forEach(letra => {
    let tecla = document.createElement("div");
    tecla.classList.add("tecla");

    if (letrasVerdes.includes(letra)) {
        tecla.classList.add("letra-verde");
    } else {
        tecla.classList.add("letra");
    }

    tecla.textContent = letra;
    tecla.onclick = () => campoTexto.textContent += letra;

    tecladoLetras.appendChild(tecla);
});

const numeros = [1, 2, 3, 4, 5, 6, 7, 8, 9];

numeros.forEach(num => {
    let tecla = document.createElement("div");
    tecla.classList.add("tecla");

    if (num % 2 === 0) {
        tecla.classList.add("num-azul");
    } else if (num % 3 === 0) {
        tecla.classList.add("num-amarillo");
    } else {
        tecla.classList.add("num-verde");
    }

    tecla.textContent = num;
    tecla.onclick = () => campoTexto.textContent += num;

    tecladoNumeros.appendChild(tecla);
});


document.getElementById("enviar").onclick = () => {
    alert("Texto enviado: " + campoTexto.textContent);
    campoTexto.textContent = "";
};


document.getElementById("borrar").onclick = () => {
    campoTexto.textContent = campoTexto.textContent.slice(0, -1);
};


document.getElementById("espacio").onclick = () => {
    campoTexto.textContent += " ";
};
