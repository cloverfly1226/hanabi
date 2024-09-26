uniform sampler2D u_shooPosition;
varying vec2 v_particleUV;
void main () {

    vec4 particle = texture2D (u_shooPosition, v_particleUV);

    float distanceToCenter = length (gl_PointCoord - 0.5);
    if(distanceToCenter > 0.5 * sqrt (particle.a))
        discard;

    gl_FragColor = vec4 (1.0, 1.0, 1.0, particle.a);

    #include <tonemapping_fragment>
    #include <colorspace_fragment>
}