import * as THREE from 'three'
//-----ESTO NO CARGA------
//import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js' 
//------------------------
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import Stats from 'three/examples/jsm/libs/stats.module'
import { GUI } from 'three/examples/jsm/libs/dat.gui.module'

const scene = new THREE.Scene()


//-----ESTO NO CARGA------
//const loader = new GLTFLoader()
//loader.load('/static/scene.gltf', function (gltf) {
//    console.log(gltf)
//}, function (xhr) {
//    console.log((xhr.loaded / xhr.total * 100) + "% loaded")
//}, function (error) {
//    console.log('an error ocurred')
//})
//------------------------

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 3000)
camera.position.set(0, 0, 1000);

scene.background = new THREE.Color(0x19d7f8);
const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

const controls = new OrbitControls(camera, renderer.domElement)
controls.enableDamping = true;
controls.screenSpacePanning = false;
controls.minDistance = 100;
controls.maxDistance = 650;
controls.maxPolarAngle = Math.PI * 2;
controls.update();


const geometry = new THREE.PlaneBufferGeometry(1000, 1000);
const texture1 = new THREE.TextureLoader().load('/static/beach.jpg');
const material = new THREE.MeshBasicMaterial({ map: texture1, flatShading: true });
const cube = new THREE.Mesh(geometry, material);
cube.position.set(0, -30, 0);
scene.add(cube);


const geometry2 = new THREE.BoxGeometry(200, 200, 50, 100, 100, 100);
const texture2 = new THREE.TextureLoader().load('/static/beach2.jpg');
const material2 = new THREE.MeshBasicMaterial({ map: texture2 });
for (var i = 0; i < 10; i++) {
    const cube2 = new THREE.Mesh(geometry2, material2);
    cube2.position.x = Math.random() * 800 - 400;
    cube2.position.y = 0;
    cube2.position.z = Math.random() * 800 - 400;
    scene.add(cube);
}


//const geometry = new THREE.BoxGeometry()
//const material = new THREE.MeshBasicMaterial({
//    color: 0x00ff00,
//   wireframe: true,
//})
//const cube = new THREE.Mesh(geometry, material)
//scene.add(cube)

window.addEventListener(
    'resize',
    () => {
        camera.aspect = window.innerWidth / window.innerHeight
        camera.updateProjectionMatrix()
        renderer.setSize(window.innerWidth, window.innerHeight)
        render()
    },
    false
)

const stats = Stats()
document.body.appendChild(stats.dom)

const gui = new GUI()
const cubeFolder = gui.addFolder('Cube')
cubeFolder.add(cube.scale, 'x', -5, 5)
cubeFolder.add(cube.scale, 'y', -5, 5)
cubeFolder.add(cube.scale, 'z', -5, 5)
cubeFolder.open()
const cameraFolder = gui.addFolder('Camera')
cameraFolder.add(camera.position, 'z', 0, 10)
cameraFolder.open()

function animate() {
    requestAnimationFrame(animate)
    //cube.rotation.x += 0.01
    //cube.rotation.y += 0.01
    controls.update()
    render()
    stats.update()
}

function render() {
    renderer.render(scene, camera)
}

animate()
