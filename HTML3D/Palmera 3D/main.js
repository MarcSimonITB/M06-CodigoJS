import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

// ===== ESCENA =====
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x111111);

// ===== CÁMARA =====
const camera = new THREE.PerspectiveCamera(60, window.innerWidth/window.innerHeight,0.1,1000);
camera.position.set(0,2,6);

// ===== RENDERER =====
const renderer = new THREE.WebGLRenderer({antialias:true});
renderer.setSize(window.innerWidth,window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
document.body.appendChild(renderer.domElement);

// ===== CONTROLES =====
const controls = new OrbitControls(camera,renderer.domElement);
controls.enableDamping = true;
controls.target.set(0,1,0);

// ===== LUCES (ambient + direccional) =====
const luzAmbient = new THREE.AmbientLight(0xffffff, 0.8);
scene.add(luzAmbient);

const luzDir = new THREE.DirectionalLight(0xffffff,1.2);
luzDir.position.set(10,10,10);
scene.add(luzDir);

let esDia = true;
const btnLuz = document.getElementById('btnLuz');
btnLuz.addEventListener('click', ()=>{
    esDia = !esDia;
    if(esDia){
        luzAmbient.intensity = 0.8;
        luzDir.intensity = 1.2;
        luzDir.color.set(0xffffff);
        scene.background.set(0x111111);
    } else {
        luzAmbient.intensity = 0.3;
        luzDir.intensity = 0.4;
        luzDir.color.set(0x5555ff);
        scene.background.set(0x000022);
    }
});

// ===== SUELO =====
const suelo = new THREE.Mesh(
    new THREE.PlaneGeometry(50,50),
    new THREE.MeshStandardMaterial({color:0xFFD966})
);
suelo.rotation.x=-Math.PI/2;
suelo.position.y=-2.5;
scene.add(suelo);

// ===== INTERACCIÓN =====
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
const interactivos=[];
let objetoHover=null;
let bordeSeleccion=null;
const divHola = document.getElementById('saludos');
const audioClick = document.getElementById('audioClick');

let camaraInicio = new THREE.Vector3();
let camaraDestino = new THREE.Vector3();
let targetInicio = new THREE.Vector3();
let targetDestino = new THREE.Vector3();
let moviendoCamara=false;
let progresoCamara=0;
const duracionCamara = 1.2;

function enfocarObjeto(objeto){
    const centro = new THREE.Vector3();
    objeto.getWorldPosition(centro);
    const cameraTarget = centro.clone();
    cameraTarget.y += 2.8;
    const direccion = new THREE.Vector3().subVectors(camera.position, controls.target).normalize();
    const distancia = 4;
    camaraInicio.copy(camera.position);
    camaraDestino.copy(cameraTarget).add(direccion.multiplyScalar(distancia));
    targetInicio.copy(controls.target);
    targetDestino.copy(cameraTarget);
    progresoCamara=0;
    moviendoCamara=true;
}

// ===== BORDE =====
function crearBorde(objeto){
    if(bordeSeleccion){
        scene.remove(bordeSeleccion);
        bordeSeleccion.traverse(o=>{ if(o.geometry)o.geometry.dispose(); });
    }
    const grupo = new THREE.Group();
    objeto.traverse(child=>{
        if(child.isMesh){
            const edges = new THREE.EdgesGeometry(child.geometry);
            const line = new THREE.LineSegments(edges,new THREE.LineBasicMaterial({color:0xffffff}));
            line.position.copy(child.position);
            line.rotation.copy(child.rotation);
            line.scale.copy(child.scale);
            grupo.add(line);
        }
    });
    grupo.position.copy(objeto.position);
    grupo.rotation.copy(objeto.rotation);
    grupo.scale.copy(objeto.scale);
    bordeSeleccion=grupo;
    scene.add(bordeSeleccion);
}

// ===== COLORES PALMERA_4 =====
const coloresPalmera4=[0xff0000,0x00ff00,0x0000ff,0xffff00];

// ===== LOADER GLB =====
const loader = new GLTFLoader();
loader.load('models/palmera.glb',(gltf)=>{
    const base=gltf.scene;
    base.scale.set(1,1,1);
    base.position.set(0,-2.5,0);
    base.name='palmera_0';
    scene.add(base);
    base.traverse(c=>{if(c.isMesh)c.userData.materialOriginal=c.material.clone();});

    const total=8;
    const radio=5;
    for(let i=1;i<=total;i++){
        const palmera=base.clone();
        const angulo=(i/total)*Math.PI*2;
        palmera.position.set(Math.cos(angulo)*radio,-2.5,Math.sin(angulo)*radio);
        palmera.name=`palmera_${i}`;
        scene.add(palmera);

        if(palmera.name==='palmera_3'||palmera.name==='palmera_5'||palmera.name==='palmera_4') interactivos.push(palmera);
        if(palmera.name==='palmera_4') palmera.userData.colorIndex=0;
    }
});

// ===== HOVER =====
window.addEventListener('mousemove',event=>{
    mouse.x=(event.clientX/window.innerWidth)*2-1;
    mouse.y=-(event.clientY/window.innerHeight)*2+1;
    raycaster.setFromCamera(mouse,camera);
    const hits=raycaster.intersectObjects(interactivos,true);
    if(hits.length===0){
        if(objetoHover){ scene.remove(bordeSeleccion); bordeSeleccion=null; objetoHover=null; document.body.style.cursor='default'; }
        return;
    }
    const nuevo=hits[0].object.parent;
    if(objetoHover!==nuevo){ objetoHover=nuevo; crearBorde(objetoHover); document.body.style.cursor='pointer'; }
});

// ===== CLICK =====
window.addEventListener('click',()=>{
    if(!objetoHover) return;
    enfocarObjeto(objetoHover);

    if(objetoHover.name==='palmera_4'){
        objetoHover.userData.colorIndex=(objetoHover.userData.colorIndex+1)%coloresPalmera4.length;
        const colorNuevo=coloresPalmera4[objetoHover.userData.colorIndex];
        objetoHover.traverse(c=>{if(c.isMesh){c.material=c.material.clone();c.material.color.set(colorNuevo);}});
    } else {
        audioClick.pause();
        audioClick.currentTime=0;
        audioClick.play();
        divHola.style.display='block';
        const titulo = divHola.querySelector('h1');
        const parrafo = divHola.querySelector('p');
        const img = divHola.querySelector('img');
        if(titulo) titulo.textContent='RAAAAAHR';
        if(parrafo) parrafo.textContent=`Has seleccionado ${objetoHover.name}`;
        if(img) img.src='skeleton-sword.gif';
        setTimeout(()=>{divHola.style.display='none';},6000);
    }
});

// ===== ANIMACIÓN =====
function animate(){
    requestAnimationFrame(animate);
    if(moviendoCamara){
        progresoCamara+=1/(duracionCamara*60);
        const t=Math.min(progresoCamara,1);
        camera.position.lerpVectors(camaraInicio,camaraDestino,t);
        controls.target.lerpVectors(targetInicio,targetDestino,t);
        if(t>=1) moviendoCamara=false;
    }
    controls.update();
    renderer.render(scene,camera);
}
animate();

// ===== RESIZE =====
window.addEventListener('resize',()=>{
    camera.aspect=window.innerWidth/window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth,window.innerHeight);
});
