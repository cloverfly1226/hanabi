import { BufferGeometry, DataTexture, Float32BufferAttribute, Uint16BufferAttribute, Vector3 } from "three";

const createGeometry = (vertexCount: number) => {
    const positions = new Float32Array(vertexCount * 3);
    // const colors = new Float32Array(vertexCount * 3);
    const indices = new Uint16Array(vertexCount);
    for (let i = 0; i < vertexCount; i++) {
        positions[i * 3] = 0;
        positions[i * 3 + 1] = 0;
        positions[i * 3 + 2] = 0;

        // colors[i * 3] = 0;
        // colors[i * 3 + 1] = 0;
        // colors[i * 3 + 2] = 0;

        indices[i] = i;
    }

    const geometry = new BufferGeometry();
    geometry.setAttribute("position", new Float32BufferAttribute(positions, 3));
    // geometry.setAttribute("color", new Float32BufferAttribute(colors, 3));
    geometry.setAttribute("index", new Uint16BufferAttribute(indices, 1));

    return geometry;
};

const param = {
    // trailCount: 10, //30,
    // sparkDetail: 1, //5,
    trailCount: 50,
    sparkDetail: 5,
    count: 0,
    size: 0,
    baseVelocityTexture: <DataTexture | null>null,
    velocityTexture: <DataTexture | null>null,
    positionTexture: <DataTexture | null>null,
    shooVelocity: new Vector3(0, 5, 0),
    acceleration: new Vector3(0, -5, 0),
};

export { createGeometry, param };
