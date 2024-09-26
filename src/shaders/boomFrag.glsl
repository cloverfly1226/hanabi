varying float v_strength;
varying float v_time;
varying float v_duration;

uniform vec3 u_color;

void main () {
    if(v_time < 0.01) {
        discard;
    }

    float distanceToCenter = length (gl_PointCoord - 0.5);
    if(distanceToCenter > 0.5 * v_strength) {
        discard;
    }

    float alpha = v_strength * (1. - v_time / v_duration);

    gl_FragColor = vec4 (u_color * pow (v_strength * 10., 2.) / 10., alpha);

    #include <tonemapping_fragment>
    #include <colorspace_fragment>
}