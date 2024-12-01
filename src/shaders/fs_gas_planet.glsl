varying vec2 vUv;
varying vec3 vPosition;
varying vec3 vNormal;
varying vec3 vViewDir;

uniform float bands;
uniform vec3 surfaceColor1;
uniform vec3 surfaceColor2;
uniform vec3 fresnelShade1;
uniform vec3 fresnelShade2;
uniform float fresnelPower;
uniform float fresnelBias1;
uniform float fresnelScale1;
uniform float fresnelBias2;
uniform float fresnelScale2;

uniform vec3 lightDirection;

#define TAU 6.28318530718
#define PI 3.141592653589793
#define MAX_TILT 0.698132;

vec3 grain_noise(vec2 uv) {
    vec2 st = ceil(uv * 600.0);
    float r = fract(sin(dot(st, vec2(12.9898, 78.233))) * 43758.5453123);
    float g = fract(sin(dot(st, vec2(93.9898, 67.345))) * 43758.5453123);
    float b = fract(sin(dot(st, vec2(25.4321, 49.123))) * 43758.5453123);
    return vec3(r, g, b) * 0.8 + 0.2;
}

vec3 tiltNormal(vec3 v, vec2 factor) {
    float tiltX = clamp(factor.x, 0.0, 1.0) * MAX_TILT;
    float tiltY = clamp(factor.y, 0.0, 1.0) * MAX_TILT;

    mat3 rotX = mat3(1.0, 0.0, 0.0, 0.0, cos(tiltX), -sin(tiltX), 0.0, sin(tiltX), cos(tiltX));

    mat3 rotY = mat3(cos(tiltY), 0.0, sin(tiltY), 0.0, 1.0, 0.0, -sin(tiltY), 0.0, cos(tiltY));

    return rotY * rotX * v;
}

vec3 sampleSurface(vec2 uv, vec3 normal, vec3 lightDirection) {
    float xShift = sin(uv.y * TAU * 7.0 + cos(uv.y * TAU * 42.0)) * 0.05 + cos(uv.y * TAU * 12.0) * 0.01;

    uv.x = uv.x + xShift;

    float wave = 0.0;
    float artic = ceil(bands * 0.06) / bands;

    if(uv.y > artic && uv.y < (1.0 - artic)) {
        wave = sin(uv.x * TAU * 24.0) + cos(uv.x * TAU * 8.0);
        float d = (uv.y - 0.5);
        wave *= pow(max(0.0, 0.25 - d * d), 4.0) * 200.0;
    }

        normal = tiltNormal(normal, vec2(xShift, wave));

    float mixFactor = (sin(uv.y * TAU * bands + wave) + 1.0) * 0.5;

    vec3 baseColor = mix(surfaceColor1, surfaceColor2, mixFactor) * grain_noise(uv);

    float darkShade = pow(1.0 - clamp(dot(normal, lightDirection), -0.1, 1.0), 2.0);

    return mix(baseColor, vec3(0.0, 0.0, 0.0), darkShade);
}

void main() {
    vec3 normal = normalize(vNormal);
    vec3 viewDir = normalize(vViewDir);

    vec3 surfaceColor = sampleSurface(vUv, normal, lightDirection);

    // Calculate fresnel
    float fresnelPowerFx = pow(1.0 - dot(normal, viewDir), fresnelPower);
    float fresnel1 = fresnelBias1 + fresnelScale1 * fresnelPowerFx;
    float fresnel2 = fresnelBias2 + fresnelScale2 * fresnelPowerFx;

    vec3 fresnelFxInner = mix(surfaceColor, fresnelShade2, fresnel2);
    vec3 fresnelFxOuter = mix(fresnelFxInner, fresnelShade1, fresnel1);

    float darkShade = pow(1.0 - clamp(dot(normal, lightDirection), -0.1, 1.0), 2.0);

    vec3 color = mix(fresnelFxOuter, vec3(0.0, 0.0, 0.01), darkShade);

    gl_FragColor = vec4(color, 1.0);
}
