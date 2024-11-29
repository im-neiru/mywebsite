varying vec2 vUv;
varying vec4 vPosition;

uniform vec3 ringColor;
uniform vec2 planetPosition;
uniform float planetRadius;
uniform vec3 lightDirection;

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
    vec2 vCoords = vPosition.xy;
		vCoords /= vPosition.w;
		vCoords = -vCoords * 0.5 + 0.5;

    vec2 uv = normalize(vCoords);

    float vShift = clamp(noise(vUv) * 0.5 + noise(vUv * 0.5) * 0.25, 0.8, 1.0);
    float shade =  clamp(pow(uv.x + uv.y * 0.3 - 0.2, 16.0) * 12.0, 0.0, 1.0);

    gl_FragColor = vec4(ringColor * shade * vShift, 1.0);
}
