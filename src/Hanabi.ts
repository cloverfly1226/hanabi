import { Group, IcosahedronGeometry, WebGLRenderer } from "three";
import { GPUComputationRenderer } from "three/examples/jsm/Addons.js";
// import shooVert from "./shaders/shooVert.glsl";
// import shooFrag from "./shaders/shooFrag.glsl";
// import boomVert from "./shaders/boomVert.glsl";
// import boomFrag from "./shaders/boomFrag.glsl";
import Shoo from "./Shoo";
import Boom from "./Boom";
import * as utils from "./utils";
// trail-length = 30;
//

export default class Hanabi extends Group {
    constructor(gl: WebGLRenderer) {
        super();

        const geometry = new IcosahedronGeometry(1, utils.param.sparkDetail);
        // 球顶点数
        const vertexCount = geometry.getAttribute("position").count;
        // 粒子顶点数
        const count = vertexCount * utils.param.trailCount;
        // gpgpu图片尺寸
        const size = Math.ceil(Math.sqrt(count));

        utils.param.count = count;
        utils.param.size = size;

        const gpgpu = new GPUComputationRenderer(size, size, gl);

        const baseVelocityTexture = gpgpu.createTexture();
        for (let i = 0; i < count; i++) {}

        gpgpu.init();
        this.gpgpu = gpgpu;

        this.shoo = new Shoo(this.gpgpu);
        this.boom = new Boom(this.gpgpu);
    }

    private shoo: Shoo;
    private boom: Boom;

    private gpgpu: GPUComputationRenderer;
}
