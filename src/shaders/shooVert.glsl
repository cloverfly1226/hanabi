uniform vec2 u_resolution;
uniform sampler2D u_shooPosition;

attribute vec2 a_particleUV;
varying vec2 v_particleUV;

void main () {
    // vec4 modelPosition = modelMatrix * vec4 (position, 1.0);
    v_particleUV = a_particleUV;
    vec4 particle = texture2D (u_shooPosition, a_particleUV);
    vec4 modelPosition = modelMatrix * vec4 (particle.xyz, 1.0);
    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;

    float size = 0.01 * u_resolution.y;
    gl_PointSize = size;
    gl_PointSize *= (size / -viewPosition.z);

    gl_Position = projectedPosition;
}