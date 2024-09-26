uniform float u_time;
uniform float u_duration;
uniform float u_delay;

uniform float u_trailDelay;

varying float v_strength;
void main () {
    float delay = (1.0 - v_strength) * u_trailDelay;
    float time = clamp (u_time - delay - u_delay, 0., u_duration);

    if(time < 0.01) {
        discard;
    }

    float distanceToCenter = length (gl_PointCoord - 0.5);
    if(distanceToCenter > 0.5 * v_strength) {
        discard;
    }

    gl_FragColor = vec4 (1.0, 1.0, 1.0, v_strength * (1.0 - time / u_duration));

    #include <tonemapping_fragment>
    #include <colorspace_fragment>
}