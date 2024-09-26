import {
    BufferAttribute,
    BufferGeometry,
    DataTexture,
    DoubleSide,
    Float32BufferAttribute,
    Group,
    Line,
    Mesh,
    MeshBasicMaterial,
    PlaneGeometry,
    Points,
    ShaderMaterial,
    Uint16BufferAttribute,
    Uniform,
    Vector2,
    Vector3,
} from "three";
import { GPUComputationRenderer, Variable } from "three/addons";
import shooVert from "./shaders/shooVert.glsl";
import shooFrag from "./shaders/shooFrag.glsl";
import shooPositionShader from "./shaders/shooPositionShader.glsl";
import shooVelocityShader from "./shaders/shooVelocityShader.glsl";
import * as utils from "./utils";

export default class Shoo extends Group {
    constructor(gpgpu: GPUComputationRenderer) {
        super();

        this.gpgpu = gpgpu;

        const positionTexture = gpgpu.createTexture();
        const positionVariable = gpgpu.addVariable("u_shooPosition", shooPositionShader, positionTexture);
        gpgpu.setVariableDependencies(positionVariable, [positionVariable]);

        // 只有纵向速度变化
        positionVariable.material.uniforms.u_time = new Uniform(0);
        // positionVariable.material.uniforms.u_deltaTime = new Uniform(0);
        positionVariable.material.uniforms.u_velocity = new Uniform(utils.param.shooVelocity);
        positionVariable.material.uniforms.u_duration = new Uniform(1);
        positionVariable.material.uniforms.u_durationAll = new Uniform(5);
        positionVariable.material.uniforms.u_size = new Uniform(utils.param.size);
        positionVariable.material.uniforms.u_acceleration = new Uniform(utils.param.acceleration);
        positionVariable.material.uniforms.u_basePosition = new Uniform(positionTexture);

        this.positionTexture = positionTexture;
        this.positionVariable = positionVariable;

        // const velocityTexture = gpgpu.createTexture();
        // const velocityVariable = gpgpu.addVariable("u_shooVelocity", shooVelocityShader, velocityTexture);

        // this.velocityTexture = velocityTexture;
        // this.velocityVariable = velocityVariable;

        const count = utils.param.trailCount;
        const positions = new Float32Array(count * 3);
        const particleUV = new Float32Array(count * 2);
        for (let i = 0; i < count; i++) {
            positions[i * 3 + 0] = 0;
            positions[i * 3 + 1] = 0;
            positions[i * 3 + 2] = 0;

            let x = ((i % utils.param.size) + 0.5) / utils.param.size;
            let y = (Math.floor(i / utils.param.size) + 0.5) / utils.param.size;

            particleUV[i * 2 + 0] = x;
            particleUV[i * 2 + 1] = y;
        }

        const geometry = new BufferGeometry();
        geometry.setDrawRange(0, count);
        geometry.setAttribute("position", new Float32BufferAttribute(positions, 3));
        geometry.setAttribute("a_particleUV", new BufferAttribute(particleUV, 2));
        geometry.computeVertexNormals();

        const points = new Points(
            geometry,
            new ShaderMaterial({
                vertexShader: shooVert,
                fragmentShader: shooFrag,
                transparent: true,
                uniforms: {
                    u_time: new Uniform(0),
                    u_resolution: new Uniform(new Vector2(innerWidth * devicePixelRatio, innerHeight * devicePixelRatio)),
                    u_shooPosition: new Uniform(null),
                },
            })
        );
        this.add((this.points = points));
    }

    private points: Points<BufferGeometry, ShaderMaterial>;

    private gpgpu: GPUComputationRenderer;

    private positionTexture: DataTexture;
    private positionVariable: Variable;

    // private velocityTexture: DataTexture;
    // private velocityVariable: Variable;

    debug() {
        const { gpgpu, positionVariable } = this;
        const debugPanel = new Mesh(
            new PlaneGeometry(2, 2),
            new MeshBasicMaterial({ map: gpgpu.getCurrentRenderTarget(positionVariable).texture, side: DoubleSide })
        );
        debugPanel.position.set(3, 0, -5);
        this.add(debugPanel);
    }

    update(delta: number) {
        const { points, positionVariable, gpgpu } = this;
        points.material.uniforms.u_time.value += delta;
        points.material.uniforms.u_shooPosition.value = gpgpu.getCurrentRenderTarget(positionVariable).texture;
        positionVariable.material.uniforms.u_time.value += delta;
    }

    resize(width: number, height: number) {
        const { points } = this;
        points.material.uniforms.u_resolution.value = new Vector2(width * devicePixelRatio, height * devicePixelRatio);
    }
}
