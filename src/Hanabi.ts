import { DoubleSide, Group, IcosahedronGeometry, Mesh, MeshBasicMaterial, PlaneGeometry, WebGLRenderer } from "three";
import { GPUComputationRenderer } from "three/addons";
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

        const positions = geometry.getAttribute("position");
        // 球顶点数
        const vertexCount = positions.count;
        // 粒子顶点数
        const count = vertexCount * utils.param.trailCount;

        // gpgpu图片尺寸
        const size = Math.ceil(Math.sqrt(count));

        utils.param.count = count;
        utils.param.size = size;

        const gpgpu = new GPUComputationRenderer(size, size, gl);

        console.log(count, size);

        const baseVelocityTexture = gpgpu.createTexture();
        const imageData = baseVelocityTexture.image.data;

        // 绘制爆炸初始速度图像
        for (let i = 0; i < positions.count; i++) {
            const i3 = i * 3;
            for (let j = 0; j < utils.param.trailCount; j++) {
                const index = (i * utils.param.trailCount + j) * 4;
                imageData[index + 0] = positions.array[i3 + 0];
                imageData[index + 1] = positions.array[i3 + 1];
                imageData[index + 2] = positions.array[i3 + 2];
                imageData[index + 3] = 0;
            }
        }

        console.log(positions.array);
        console.log(imageData);

        gpgpu.init();
        this.gpgpu = gpgpu;

        // this.shoo = new Shoo(this.gpgpu);
        // this.boom = new Boom(this.gpgpu);

        // velocity debug
        const debugPanel = new Mesh(new PlaneGeometry(2, 2), new MeshBasicMaterial({ map: baseVelocityTexture, side: DoubleSide }));
        this.add(debugPanel);
    }

    // private shoo: Shoo;
    // private boom: Boom;

    private gpgpu: GPUComputationRenderer;
}
