// -----------------------------------------------------
// 1. Imprime del 1 al 10
// -----------------------------------------------------
function ejercicio1() {
  let salida = "---- FOR ----\n";

  // FOR
  for (let i = 1; i <= 10; i++) {
    salida += i + "\n";
  }

  // WHILE
  salida += "\n---- WHILE ----\n";
  let i = 1;
  while (i <= 10) {
    salida += i + "\n";
    i++;
  }

  // DO WHILE
  salida += "\n---- DO WHILE ----\n";
  let x = 1;
  do {
    salida += x + "\n";
    x++;
  } while (x <= 10);

  // Mostrar en el recuadro
  document.getElementById("out1").textContent = salida;
}



// -----------------------------------------------------
// 2. Suma del 1 al N
// -----------------------------------------------------
function ejercicio2() {
  let n = parseInt(prompt("Introduce un número N:"));
  let suma = 0;

  for (let i = 1; i <= n; i++) {
    suma += i;
  }

  document.getElementById("out2").textContent =
    `La suma de 1 al ${n} es: ${suma}`;
}


// -----------------------------------------------------
// 3. Números pares dentro de un rango
// -----------------------------------------------------
function ejercicio3() {
  let inicio = parseInt(prompt("Número inicial:"));
  let fin = parseInt(prompt("Número final:"));

  let salida = "";

  for (let i = inicio; i <= fin; i++) {
    if (i % 2 === 0) salida += i + " ";
  }

  document.getElementById("out3").textContent = salida;
}


// -----------------------------------------------------
// 4. Triángulo
// -----------------------------------------------------
function ejercicio4() {
  let lineas = parseInt(prompt("Número de líneas del triángulo:"));
  let salida = "";

  for (let i = 1; i <= lineas; i++) {
    salida += "*".repeat(i) + "\n";
  }

  document.getElementById("out4").textContent = salida;
}


// -----------------------------------------------------
// 5. Árbol de Navidad
// -----------------------------------------------------
function ejercicio5() {
  let altura = parseInt(prompt("Altura del árbol:"));
  let salida = "";

  // copa
  for (let i = 1; i <= altura; i++) {
    salida += " ".repeat(altura - i) + "*".repeat(i * 2 - 1) + "\n";
  }

  // tronco
  salida += " ".repeat(altura - 1) + "||";

  document.getElementById("out5").textContent = salida;
}
