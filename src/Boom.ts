import { Group, Points, ShaderMaterial } from "three";
import { GPUComputationRenderer } from "three/addons";
import * as utils from "./utils";
import boomVert from "./shaders/boomVert.glsl";
import boomFrag from "./shaders/boomFrag.glsl";

export default class Boom extends Group {
    constructor(gpgpu: GPUComputationRenderer) {
        super();

        this.gpgpu = gpgpu;

        this.points = new Points(
            utils.createGeometry(utils.param.trailCount * utils.param.count),
            new ShaderMaterial({
                glslVersion: "300 es",
                vertexShader: boomVert,
                fragmentShader: boomFrag,
            })
        );
    }
    private gpgpu: GPUComputationRenderer;

    private points: Points;

    update(delta: number) {}

    resize(width: number, height: number) {}
}
