import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// ESCENA
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xFFC0CB);

// CÁMARA
const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);
camera.position.z = 8;

// RENDERER
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// CONTROLES
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

// LUCES
const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(5, 5, 5);
scene.add(directionalLight);

// MATERIAL (plomo)
const material = new THREE.MeshStandardMaterial({
    color: 0xaaaaaa,
    metalness: 0.8,
    roughness: 0.4
});

// ===== SOLDADO (UN SOLO OBJETO) =====
const soldado = new THREE.Group();

// CABEZA
const cabeza = new THREE.Mesh(
    new THREE.SphereGeometry(0.6, 32, 32),
    material
);
cabeza.position.y = 2.6;
soldado.add(cabeza);

// SOMBRERO

// Ala del sombrero
const alaSombrero = new THREE.Mesh(
    new THREE.CylinderGeometry(0.6, 0.5, 0.9, 32),
    material
);
alaSombrero.position.y = 3.43;
soldado.add(alaSombrero);


// TORSO
const torso = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1.5, 0.6,),
    material
);
torso.position.y = 1.4;
soldado.add(torso);

// BRAZOS
const brazoGeom = new THREE.CylinderGeometry(0.15, 0.15, 2);

const brazoIzq = new THREE.Mesh(brazoGeom, material);
brazoIzq.position.set(-0.6, 1.2, 0);
brazoIzq.rotation.z = Math.PI / 1;
soldado.add(brazoIzq);

const brazoDer = brazoIzq.clone();
brazoDer.position.x = 0.6;
brazoDer.rotation.z = -Math.PI / 1;
soldado.add(brazoDer);

// PIERNAS
const piernaGeom = new THREE.CylinderGeometry(0.2, 0.2, 2.6);

const piernaIzq = new THREE.Mesh(piernaGeom, material);
piernaIzq.position.set(-0.3, 0.2, 0);
soldado.add(piernaIzq);
piernaIzq.position.y = -0.5;

const piernaDer = piernaIzq.clone();
piernaDer.position.x = 0.3;
piernaDer.position.y = -0.5;
soldado.add(piernaDer);

// AÑADIR A ESCENA
scene.add(soldado);

let tiempo = 0;
// ANIMACIÓN
function animate() {
    requestAnimationFrame(animate);

    soldado.rotation.y += 0.0;
    piernaDer.rotation.x = Math.PI / 1 + Math.sin(tiempo) * 0.3;
    piernaIzq.rotation.x = Math.PI / 1 - Math.sin(tiempo) * 0.3;

    tiempo += 0.05;
    controls.update();
    renderer.render(scene, camera);
}


animate();

// AJUSTE AL REDIMENSIONAR
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
