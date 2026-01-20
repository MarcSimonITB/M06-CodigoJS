import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

// =======================
// ESCENA
// =======================
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xdddddd);

// =======================
// CÁMARA
// =======================
const camera = new THREE.PerspectiveCamera(
    60,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);
camera.position.set(0, 2, 6);
camera.lookAt(0, 1, 0);

// =======================
// RENDERER
// =======================
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
document.body.appendChild(renderer.domElement);

// =======================
// CONTROLES
// =======================
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

// =======================
// LUCES
// =======================
scene.add(new THREE.AmbientLight(0xffffff, 0.6));

const dirLight = new THREE.DirectionalLight(0xffffff, 1);
dirLight.position.set(5, 5, 5);
scene.add(dirLight);

// =======================
// LOADER GLB
// =======================
const loader = new GLTFLoader();

loader.load('models/palmera.glb', function(gltf) {
    const model = gltf.scene;

    // Ajustes y agregar modelo original
    model.scale.set(1,1,1);
    model.position.set(0,-2.5,0);
    model.name = 'palmera_0';
    scene.add(model);

    // Crear clones en círculo
    const numCopies = 8;
    const radius = 5;
    for (let i = 1; i <= numCopies; i++) {
        const copy = model.clone();
        const angle = (i / numCopies) * Math.PI * 2;
        copy.position.set(Math.cos(angle)*radius, -2.5, Math.sin(angle)*radius);
        copy.name = `palmera_${i}`;
        scene.add(copy);
    }

    // 🔹 AQUÍ es donde modificamos la palmera_3
    const palmera3 = scene.getObjectByName('palmera_3');
    if (palmera3) {
        palmera3.scale.set(2,2,2); // escalamos la palmera_3
    }

}, undefined, (error) => {
    console.error('❌ Error cargando GLB:', error);
});

// =======================
// PLANO SUELO (DESIERTO)
// =======================
const planeGeometry = new THREE.PlaneGeometry(50, 50); // tamaño del plano
const planeMaterial = new THREE.MeshStandardMaterial({ color: 0xFFD966 }); // amarillo desierto
const plane = new THREE.Mesh(planeGeometry, planeMaterial);

plane.rotation.x = -Math.PI / 2; // girar para que quede horizontal
plane.position.y = -2.5;          // alineado con la base de los modelos
scene.add(plane);

// =======================
// ANIMACIÓN
// =======================
function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}
// =======================
// EVENTO CLICK SOBRE PALMERA_3
// =======================
const divHola = document.getElementById('saludos');
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

window.addEventListener('click', (event) => {
    // Coordenadas normalizadas del mouse
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);

    // Buscamos la palmera_3
    const palmera3 = scene.getObjectByName('palmera_3');
    if (!palmera3) return;

    // Intersección con la palmera_3 y sus hijos
    const intersects = raycaster.intersectObject(palmera3, true);

    if (intersects.length > 0) {
        // Mostramos el div con mensaje
        divHola.style.display = 'block';
        divHola.innerHTML = `
            <h1 style="margin:0;color:#333;">¡HOLA!</h1>
            <img src="muerto.gif" alt="locura">
        `;
        // Ocultamos después de 6 segundos
        setTimeout(() => {
            divHola.style.display = 'none';
        }, 6000);
    }
});
// =======================
// ARRAY DE OBJETOS INTERACTIVOS
// =======================
const interactivos = [];
const palmera3 = scene.getObjectByName('palmera_3');
if (palmera3) {
    interactivos.push(palmera3); // agregamos la palmera_3 a los interactivos
}

let bordeSeleccion = null; // guardamos el borde actual

window.addEventListener('click', (event) => {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);

    // intersectar solo con los objetos interactivos
    const intersects = raycaster.intersectObjects(interactivos, true);

    if (intersects.length > 0) {
        const objeto = intersects[0].object;

        // eliminar borde anterior si existe
        if (bordeSeleccion) scene.remove(bordeSeleccion);

        // crear borde solo sobre este objeto
        const edges = new THREE.EdgesGeometry(objeto.geometry);
        bordeSeleccion = new THREE.LineSegments(
            edges,
            new THREE.LineBasicMaterial({ color: 0xffffff, linewidth: 2 })
        );

        bordeSeleccion.position.copy(objeto.getWorldPosition(new THREE.Vector3()));
        bordeSeleccion.rotation.copy(objeto.getWorldRotation(new THREE.Euler()));
        bordeSeleccion.scale.copy(objeto.getWorldScale(new THREE.Vector3()));

        scene.add(bordeSeleccion);

        // mostrar el div de saludo
        divHola.style.display = 'block';
        divHola.innerHTML = `
            <h1 style="margin:0;color:#333;">¡HOLA!</h1>
            <p style="margin:5px 0 0 0;">Has hecho clic en ${objeto.name}</p>
        `;
        setTimeout(() => { divHola.style.display = 'none'; }, 6000);
    }
});
animate();

// =======================
// RESIZE
// =======================
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});