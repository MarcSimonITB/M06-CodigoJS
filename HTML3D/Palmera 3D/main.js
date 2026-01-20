// Importar Three.js
import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js';

// Importar GLTFLoader
import { GLTFLoader } from 'https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/loaders/GLTFLoader.js';

// ESCENA
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xdddddd);

// CÁMARA
const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);
camera.position.set(0, 1, 3);

// RENDER
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// LUZ
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(5, 5, 5);
scene.add(light);

// LUZ AMBIENTE
scene.add(new THREE.AmbientLight(0xffffff, 0.5));


// ==============================
// LOADER (igual que en la diapositiva)
// ==============================
const loader = new GLTFLoader();

loader.load(
    'models/Box.glb', // ruta al modelo
    function (gltf) {
        scene.add(gltf.scene);
    },
    undefined,
    function (error) {
        console.error('Error cargando GLB:', error);
    }
);


// ANIMACIÓN
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

animate();
