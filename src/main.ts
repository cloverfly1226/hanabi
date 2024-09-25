import { PerspectiveCamera, Scene, WebGLRenderer } from "three";
import "./style.css";

const renderer = new WebGLRenderer({
    antialias: true,
});
document.querySelector("#app")?.appendChild(renderer.domElement);

const scene = new Scene();
const camera = new PerspectiveCamera();

const resizeF = () => {
    const { innerWidth: w, innerHeight: h } = window;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h);
};
resizeF();

window.addEventListener("resize", resizeF);

const renderF = () => {
    renderer.render(scene, camera);
};

renderer.setAnimationLoop(renderF);
