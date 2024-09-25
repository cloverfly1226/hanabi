import { DataTexture, Group, Points, ShaderMaterial } from "three";
import { GPUComputationRenderer } from "three/addons";
import shooVert from "./shaders/shooVert.glsl";
import shooFrag from "./shaders/shooFrag.glsl";
import * as utils from "./utils";

export default class Shoo extends Group {
    constructor(gpgpu: GPUComputationRenderer) {
        super();

        this.gpgpu = gpgpu;

        this.points = new Points(
            utils.createGeometry(utils.param.trailCount),
            new ShaderMaterial({
                glslVersion: "300 es",
                vertexShader: shooVert,
                fragmentShader: shooFrag,
            })
        );

        this.positionTexture = gpgpu.createTexture();
        this.velocityTexture = gpgpu.createTexture();
    }

    private points: Points;

    private gpgpu: GPUComputationRenderer;

    private positionTexture: DataTexture;
    private velocityTexture: DataTexture;
}
