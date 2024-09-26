import { BufferGeometry, Float32BufferAttribute, Group, Points, ShaderMaterial } from "three";
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

        for (let i = 0; i < count; i++) {
            position[i * 3 + 0] = utils.boomPosition.x;
            position[i * 3 + 1] = utils.boomPosition.y;
            position[i * 3 + 2] = utils.boomPosition.z;

            const groupIndex = Math.floor(i / utils.boomTrailCount); // 在第几组拖尾里
            const trailIndex = i % utils.boomTrailCount; // 在拖尾组内序列
            indices[i] = trailIndex;

            const ico = utils.icosahedron.attributes.position;
            velocity[i * 3 + 0] = ico.getX(groupIndex);
            velocity[i * 3 + 1] = ico.getY(groupIndex);
            velocity[i * 3 + 2] = ico.getZ(groupIndex);
        }

        geometry.setAttribute("position", new Float32BufferAttribute(position, 3));
        geometry.setAttribute("a_idx", new Float32BufferAttribute(indices, 1));
        geometry.setAttribute("a_velocity", new Float32BufferAttribute(velocity, 3));

        const material = new ShaderMaterial({
            transparent: true,
            depthTest: false,
            vertexShader: boomVert,
            fragmentShader: boomFrag,
            uniforms: {
                u_time: { value: 0 },
                u_delay: { value: utils.boomDelay + utils.shooDelay + utils.shooDuration },
                u_duration: { value: utils.boomDuration },
                u_trailCount: { value: utils.boomTrailCount },
                u_trailDelay: { value: utils.boomTrailDelay },
                u_acceleration: { value: utils.boomAcceleration },
            },
        });

        this.points = new Points(geometry, material);
        this.add(this.points);
    }
    private points: Points<BufferGeometry, ShaderMaterial>;

    update(delta: number) {
        const { points } = this;
        points.material.uniforms.u_time.value += delta;
        if (points.material.uniforms.u_time.value > utils.loopDuration) {
            points.material.uniforms.u_time.value = 0;
        }
    }

    resize(width: number, height: number) {}
}
