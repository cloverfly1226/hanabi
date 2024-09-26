uniform float u_time;
uniform float u_duration;
uniform float u_delay;

uniform float u_trailCount;
uniform float u_trailDelay;

uniform vec3 u_velocity;
uniform vec3 u_acceleration;

attribute float a_idx;

varying float v_strength;

void main () {
    // 根据序列来延迟，首个不延迟，最后一个延迟最大，中间计算
    float delay = a_idx / u_trailCount * u_trailDelay;
    float time = clamp (u_time - delay - u_delay, 0., u_duration);

    v_strength = (1. - a_idx / u_trailCount);

    vec3 p = (u_velocity + u_acceleration * time / 2.) * time;
    vec4 modelPosition = modelMatrix * vec4 (p, 1.0);
    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;

    gl_PointSize = 5.;

    gl_Position = projectedPosition;

}