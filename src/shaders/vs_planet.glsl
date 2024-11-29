varying vec2 vUv;
varying vec3 vPosition;
varying vec3 vNormal;
varying vec3 vViewDir;

void main() {
    vNormal = normalize(normalMatrix * normal);
    vec4 viewPosition = modelViewMatrix * vec4(position, 1.0);
    vViewDir = normalize(-viewPosition.xyz);

    vPosition = position;
    vUv = uv;

    gl_Position = projectionMatrix * viewPosition;
}
