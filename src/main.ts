import { Clock, Color, PerspectiveCamera, Scene, WebGLRenderer } from "three";
import "./style.css";
import Hanabi from "./Hanabi";
import { OrbitControls } from "three/addons";
import { BloomEffect, EffectComposer, EffectPass, RenderPass } from "postprocessing";

const gl = new WebGLRenderer({
    antialias: true,
    powerPreference: "high-performance",
});
document.querySelector("#app")?.appendChild(gl.domElement);

const scene = new Scene();
// scene.background = new Color("gray");
const camera = new PerspectiveCamera();
camera.position.set(0, 0, 10);

const orbitControl = new OrbitControls(camera, gl.domElement);

const composer = new EffectComposer(gl);
composer.addPass(new RenderPass(scene, camera));
composer.addPass(
    new EffectPass(
        camera,
        new BloomEffect({
            mipmapBlur: true,
            intensity: 0.8,
            levels: 5,
            luminanceThreshold: 0,
            radius: 1,
        })
    )
);

// 烟花
const hanabi = new Hanabi(gl);
scene.add(hanabi);

// 计时器
const clock = new Clock();
clock.getDelta();

const resizeF = () => {
    const { innerWidth: w, innerHeight: h } = window;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    gl.setSize(w, h);
    composer.setSize(w, h);
    hanabi.resize(w, h);
};
resizeF();

window.addEventListener("resize", resizeF);

const renderF = () => {
    const delta = clock.getDelta();

    orbitControl.update(delta);
    hanabi.update(delta);

    // gl.render(scene, camera);
    composer.render();
};

gl.setAnimationLoop(renderF);
