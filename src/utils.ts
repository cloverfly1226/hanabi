import { BufferGeometry, Float32BufferAttribute, Uint16BufferAttribute } from "three";

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
    trailCount: 30,
    sparkDetail: 5,
    count: 0,
    size: 0,
};

export { createGeometry, param };
