import { Color, PerspectiveCamera, Scene, WebGLRenderer } from "three";
import "./style.css";
import Hanabi from "./Hanabi";
import { OrbitControls } from "three/addons";

const gl = new WebGLRenderer({
    antialias: true,
});
document.querySelector("#app")?.appendChild(gl.domElement);

const scene = new Scene();
scene.background = new Color("gray");
const camera = new PerspectiveCamera();
camera.position.set(0, 0, 10);

const orbitControl = new OrbitControls(camera, gl.domElement);

const resizeF = () => {
    const { innerWidth: w, innerHeight: h } = window;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    gl.setSize(w, h);
};
resizeF();

window.addEventListener("resize", resizeF);

const renderF = () => {
    gl.render(scene, camera);
};

gl.setAnimationLoop(renderF);

const hanabi = new Hanabi(gl);
scene.add(hanabi);
