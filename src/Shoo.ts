import { BufferGeometry, Float32BufferAttribute, Group, Points, ShaderMaterial, Uniform } from "three";
import shooVert from "./shaders/shooVert.glsl";
import shooFrag from "./shaders/shooFrag.glsl";
import * as utils from "./utils";

export default class Shoo extends Group {
    constructor() {
        super();

        const geometry = new BufferGeometry();

        const position = new Float32Array(utils.shooTrailCount * 3);
        const indices = new Float32Array(utils.shooTrailCount);
        for (let i = 0; i < utils.shooTrailCount; i++) {
            position[i * 3 + 0] = 0;
            position[i * 3 + 1] = 0;
            position[i * 3 + 2] = 0;

            indices[i] = i;
        }

        geometry.setAttribute("position", new Float32BufferAttribute(position, 3));
        geometry.setAttribute("a_idx", new Float32BufferAttribute(indices, 1));

        const material = new ShaderMaterial({
            transparent: true,
            depthTest: false,
            vertexShader: shooVert,
            fragmentShader: shooFrag,
            uniforms: {
                u_time: new Uniform(0),
                u_delay: new Uniform(utils.shooDelay),
                u_velocity: new Uniform(utils.shooVelocity),
                u_duration: new Uniform(utils.shooDuration),
                u_trailCount: new Uniform(utils.shooTrailCount),
                u_trailDelay: new Uniform(utils.shooTrailDelay),
                u_acceleration: new Uniform(utils.shooAcceleration),
            },
        });

        const points = new Points(geometry, material);
        this.add((this.points = points));
        points.frustumCulled = false;
    }

    private points: Points<BufferGeometry, ShaderMaterial>;

    update(delta: number) {
        const { points } = this;
        points.material.uniforms.u_time.value += delta;

        if (points.material.uniforms.u_time.value > utils.loopDuration) {
            points.material.uniforms.u_time.value = 0;
        }
    }
}
