varying vec3 vNormal;
varying vec3 vViewDir;

uniform vec3 surfaceColor;
uniform vec3 fresnelShade;
uniform float fresnelPower;
uniform float fresnelBias;
uniform float fresnelScale;

void main() {
    vec3 normal = normalize(vNormal);
    vec3 viewDir = normalize(vViewDir);

    float fresnel = fresnelBias + fresnelScale * pow(1.0 - dot(normal, viewDir), fresnelPower);

    vec3 color = mix(surfaceColor, fresnelShade, fresnel);

    gl_FragColor = vec4(color, 1.0);
}
