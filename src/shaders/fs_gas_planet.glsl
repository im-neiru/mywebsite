varying vec2 vUv;
varying vec3 vPosition;
varying vec3 vNormal;
varying vec3 vViewDir;

uniform vec3 surfaceColor1;
uniform vec3 surfaceColor2;
uniform vec3 fresnelShade1;
uniform vec3 fresnelShade2;
uniform float fresnelPower;
uniform float fresnelBias1;
uniform float fresnelScale1;
uniform float fresnelBias2;
uniform float fresnelScale2;

#define TAU 6.2831853076

void main() {
    vec3 normal = normalize(vNormal);
    vec3 viewDir = normalize(vViewDir);

    // Calculate surface pattern
    float vShift =  0.1 * sin(vUv.x * TAU * 8.0) +  0.8 * sin(vUv.x * TAU * 2.0);

    vec3 surfaceColor = mix(surfaceColor1, surfaceColor2, cos(vUv.y * TAU * 7.0 + vShift));

    // Calculate fresnel
    float fresnelPowerFx =  pow(1.0 - dot(normal, viewDir), fresnelPower);
    float fresnel1 = fresnelBias1 + fresnelScale1 * fresnelPowerFx;
    float fresnel2 = fresnelBias2 + fresnelScale2 * fresnelPowerFx;

    vec3 fresnelFxInner = mix(surfaceColor, fresnelShade2, fresnel2);
    vec3 fresnelFxOuter = mix(fresnelFxInner, fresnelShade1, fresnel1);

    vec3 color = fresnelFxOuter;

    gl_FragColor = vec4(color, 1.0);
}
