varying vec2 vUv;

uniform vec3 ringColor;

#define TAU 6.2831853076

float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
}

float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);

    float a = hash(i);
    float b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0));
    float d = hash(i + vec2(1.0, 1.0));

    vec2 u = f * f * (3.0 - 2.0 * f);

    return mix(a, b, u.x) +
           (c - a) * u.y * (1.0 - u.x) +
           (d - b) * u.x * u.y;
}

void main() {
    vec2 scaledUv = vUv * 256.0;
    float vShift = noise(scaledUv) * 0.5 + noise(scaledUv * 0.5) * 0.25;

    float alpha = smoothstep(0.2, 1.1, vShift) * 2.0 - 0.3;

    gl_FragColor = vec4(ringColor, alpha);
}
