uniform float u_time;
// uniform float u_deltaTime;
uniform float u_duration;
uniform float u_durationAll;
uniform vec3 u_velocity;
uniform float u_size;
uniform vec3 u_acceleration;
uniform sampler2D u_basePosition;

void main () {
    float time = mod (u_time, u_durationAll);
    float txl = resolution.x / u_size;

    if(gl_FragCoord.x < txl && gl_FragCoord.y < txl) {
        // 第一个点，使用速度
        vec3 p = (u_velocity + u_velocity + u_acceleration * time) * time / 2.;

        p.y = max (p.y, 0.);

        gl_FragColor = vec4 (p, clamp (u_duration - time, 0., 1.));

    } else {
        // 后面的点，读上一个点
        vec2 uv = vec2 (0., 0.);
        float index = floor (gl_FragCoord.y / txl) * u_size + floor (gl_FragCoord.x / txl);

        if(gl_FragCoord.x < txl) {
            uv = vec2 (resolution.x - txl, gl_FragCoord.y - txl) / resolution.xy;
            gl_FragColor = texture (u_shooPosition, uv);
        } else {
            uv = vec2 (gl_FragCoord.x - txl, gl_FragCoord.y) / resolution.xy;
            gl_FragColor = texture (u_shooPosition, uv);
        }
        gl_FragColor.a *= 0.90;

    }
}