import { BufferGeometry, Color, Float32BufferAttribute, Group, Points, ShaderMaterial, Uniform, Vector3 } from "three";
import * as utils from "./utils";
import boomVert from "./shaders/boomVert.glsl";
import boomFrag from "./shaders/boomFrag.glsl";

export default class Boom extends Group {
    constructor() {
        super();
        const geometry = new BufferGeometry();
        const count = utils.icosahedron.attributes.position.count * utils.boomTrailCount;
        const position = new Float32Array(count * 3);
        const indices = new Float32Array(count);
        const velocity = new Float32Array(count * 3);
        const delay = new Float32Array(count); // 每个烟花给随机出现的时间
        const duration = new Float32Array(count); // 每个烟花给随机时长
        const speedRate = new Float32Array(count);
        const direction = new Float32Array(count * 3);

        console.log(count);

        let ranDelay = 0;
        let ranDuration = utils.boomDuration;
        let ranSpeedRate = 1;
        const ranDirection = new Vector3();
        for (let i = 0; i < count; i++) {
            position[i * 3 + 0] = utils.boomPosition.x;
            position[i * 3 + 1] = utils.boomPosition.y;
            position[i * 3 + 2] = utils.boomPosition.z;

            const groupIndex = Math.floor(i / utils.boomTrailCount); // 在第几组拖尾里
            const trailIndex = i % utils.boomTrailCount; // 在拖尾组内序列
            indices[i] = trailIndex;

            if (trailIndex == 0) {
                ranDelay = Math.random() * 0.3;
                ranDuration = utils.boomDuration;
                ranDuration += (Math.random() - 0.5) * 0.3;
                ranSpeedRate = 1 - Math.random() * 0.9;
                ranDirection.randomDirection();
            }
            delay[i] = ranDelay;
            duration[i] = ranDuration;
            speedRate[i] = ranSpeedRate;

            direction[i * 3 + 0] = ranDirection.x * 0.1;
            direction[i * 3 + 1] = ranDirection.y * 0.1;
            direction[i * 3 + 2] = ranDirection.z * 0.1;

            const ico = utils.icosahedron.attributes.position;

            velocity[i * 3 + 0] = ico.getX(groupIndex);
            velocity[i * 3 + 1] = ico.getY(groupIndex);
            velocity[i * 3 + 2] = ico.getZ(groupIndex);
        }

        geometry.setAttribute("position", new Float32BufferAttribute(position, 3));
        geometry.setAttribute("a_idx", new Float32BufferAttribute(indices, 1));
        geometry.setAttribute("a_velocity", new Float32BufferAttribute(velocity, 3));
        geometry.setAttribute("a_delay", new Float32BufferAttribute(delay, 1));
        geometry.setAttribute("a_duration", new Float32BufferAttribute(duration, 1));
        geometry.setAttribute("a_speedRate", new Float32BufferAttribute(speedRate, 1));
        geometry.setAttribute("a_direction", new Float32BufferAttribute(direction, 3));

        const material = new ShaderMaterial({
            transparent: true,
            depthTest: false,
            vertexShader: boomVert,
            fragmentShader: boomFrag,
            uniforms: {
                u_time: new Uniform(0),
                u_delay: new Uniform(utils.boomDelay + utils.shooDelay + utils.shooDuration),
                u_duration: new Uniform(utils.boomDuration),
                u_trailCount: new Uniform(utils.boomTrailCount),
                u_trailDelay: new Uniform(utils.boomTrailDelay),
                u_acceleration: new Uniform(utils.boomAcceleration),
                u_color: new Uniform(utils.boomColors[Math.floor(Math.random() * utils.boomColors.length)]),
            },
        });

        this.points = new Points(geometry, material);
        this.points.frustumCulled = false;
        this.add(this.points);
    }
    private points: Points<BufferGeometry, ShaderMaterial>;

    update(delta: number) {
        const { points } = this;
        points.material.uniforms.u_time.value += delta;
        if (points.material.uniforms.u_time.value > utils.loopDuration) {
            points.material.uniforms.u_time.value = 0;
            points.material.uniforms.u_color.value = utils.boomColors[Math.floor(Math.random() * utils.boomColors.length)];
        }
    }

    resize(width: number, height: number) {}
}
