
let titulo = document.getElementById("titulo");
titulo.textContent = "Titulo actualizado";
console.log("Contenido del <h1>: " + titulo.textContent);

let parrafo = document.getElementById("paragrafo");
parrafo.textContent="Texto Importante"

let Mascota = document.getElementById("Mascota");
Mascota.src="SRC/Mascota.jpeg";
Mascota.alt="Perrito";

for (let i = 0; i < 3; i++) { 
  let newArticle = document.createElement("article");
  newArticle.innerHTML = "<h3>Titulo del articulo</h3><p>Parrafo</p>";
  
  document.body.appendChild(newArticle);
}