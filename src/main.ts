import { Clock, PerspectiveCamera, Scene, WebGLRenderer } from "three";
import "./style.css";
import Hanabi from "./Hanabi";
import { OrbitControls } from "three/addons";
import { BloomEffect, EffectComposer, EffectPass, RenderPass } from "postprocessing";
import Stats from "stats.js";

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
            radius: 0.5,
        })
    )
);

// 烟花
const hanabiGroup = new Array<Hanabi>();
for (let i = 0; i < 10; i++) {
    setTimeout(() => {
        const hanabi = new Hanabi();
        hanabi.position.randomDirection().multiplyScalar(Math.random() * 3);
        scene.add(hanabi);
        hanabiGroup.push(hanabi);
    }, Math.random() * 2000);
}

const stats = new Stats();
document.body.appendChild(stats.dom);
stats.showPanel(0);

// 计时器
const clock = new Clock();
clock.getDelta();

const resizeF = () => {
    const { innerWidth: w, innerHeight: h } = window;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    gl.setSize(w, h);
    composer.setSize(w, h);
};
resizeF();

window.addEventListener("resize", resizeF);

const renderF = () => {
    const delta = clock.getDelta();

    orbitControl.update(delta);

    hanabiGroup.forEach(hanabi => {
        hanabi.update(delta);
    });

    composer.render();

    stats.update();
};

gl.setAnimationLoop(renderF);
