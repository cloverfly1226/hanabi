attribute float a_idx;
attribute vec3 a_velocity;
attribute float a_delay;
attribute float a_duration;
attribute float a_speedRate;
attribute vec3 a_direction;

uniform float u_time;
uniform float u_delay;
uniform float u_duration;

uniform float u_trailCount;
uniform float u_trailDelay;

uniform vec3 u_acceleration;

varying float v_strength;
varying float v_time;
varying float v_duration;

void main() {
    float delay = a_idx / u_trailCount * u_trailDelay;
    float time = clamp(u_time - delay - u_delay - a_delay, 0., a_duration);

    v_strength = (1. - a_idx / u_trailCount);
    v_time = time;
    v_duration = a_duration;

    vec3 velocity = a_velocity * a_speedRate + a_direction;
    vec3 p = position + (velocity + u_acceleration * time / 2.) * time;
    vec4 modelPosition = modelMatrix * vec4(p, 1.0);
    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;

    gl_PointSize = 3.;
    gl_Position = projectedPosition;
}