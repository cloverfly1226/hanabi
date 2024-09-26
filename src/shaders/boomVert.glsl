attribute float a_idx;
attribute vec3 a_velocity;

uniform float u_time;
uniform float u_delay;
uniform float u_duration;

uniform float u_trailCount;
uniform float u_trailDelay;

uniform vec3 u_acceleration;

varying float v_strength;

void main () {
    float delay = a_idx / u_trailCount * u_trailDelay;
    float time = clamp (u_time - delay - u_delay, 0., u_duration);

    v_strength = (1. - a_idx / u_trailCount);

    vec3 p = position + (a_velocity + u_acceleration * time / 2.) * time;
    vec4 modelPosition = modelMatrix * vec4 (p, 1.0);
    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;

    gl_PointSize = 5.;
    gl_Position = projectedPosition;
}