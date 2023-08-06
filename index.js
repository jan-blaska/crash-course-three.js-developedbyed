import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// Scene
const scene = new THREE.Scene();

// Create our 3D model
const geometry = new THREE.TorusKnotGeometry( 12, 3.4, 205, 20, 2, 3 ); 
const material = new THREE.MeshStandardMaterial({ 
    color: 0x00ff83,
    roughness: 0.5,
}); 
const torus = new THREE.Mesh( geometry, material ); 
scene.add( torus );

// Sizes
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

// Light
const light = new THREE.HemisphereLight(0xffffff, 1);
scene.add( light );

// Camera
const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height, 0.1, 100);
camera.position.z = 80;
scene.add( camera );

// Renderer
const canvas = document.querySelector('#webgl');
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(2);
renderer.render( scene, camera );

// Controls
const controls = new OrbitControls( camera, canvas );
controls.enableDamping = true;
controls.enablePan = false;
controls.enableZoom = false;
controls.autoRotate = true;
controls.autoRotateSpeed = 5;

// Resize
window.addEventListener('resize', function() {
    // Update Sizes
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;
    // Update Camera
    camera.updateProjectionMatrix();
    camera.aspect = sizes.width / sizes.height;
    renderer.setSize(sizes.width, sizes.height);
})

const loop = () => {
    controls.update();
    renderer.render(scene, camera);
    window.requestAnimationFrame(loop);

}
loop();

// Timeline magiccc
const tl = gsap.timeline({defaults: {duration: 2}})
tl.fromTo(torus.scale, {z:0, x:0, y:0}, {z:1, x:1, y:1})
tl.fromTo('nav', {y: '-100%'}, {y: '0%'});
tl.fromTo(".title", { opacity: 0}, {opacity: 1});

// Mouse Animation Colorrr
let mouseDown = false;
let rgb = [];
window.addEventListener('mousedown', () => mouseDown = true);
window.addEventListener('mouseup', () => mouseDown = false);

window.addEventListener('mousemove', (e) => {
    if(mouseDown){
        rgb = [
            Math.round((e.pageX / sizes.width) * 255),
            Math.round((e.pageY / sizes.height) * 255),
            150,
        ]
        // Let´s animate
        let newColor = new THREE.Color(`rgb(${rgb.join(",")})`);
       /* new THREE.Color(`rgb(0,100,150)`);*/
        gsap.to(torus.material.color, {
            r: newColor.r,
            g: newColor.g,
            b: newColor.b,
        });
    }
})