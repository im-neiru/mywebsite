import { fs_gas_planet, vs_planet } from "$shaders";

import { Color, Mesh, Object3D, ShaderMaterial, SphereGeometry } from "three";

export class GasPlanet extends Object3D {
  constructor(radius: number, widthSegments: number, heightSegments: number) {
    super();
    const geometry = new SphereGeometry(radius, widthSegments, heightSegments);

    const material = new ShaderMaterial({
      vertexShader: vs_planet,
      fragmentShader: fs_gas_planet,
      uniforms: {
        surfaceColor: { value: new Color(0x1166ff) },
        fresnelShade: { value: new Color(0xffffff) },
        fresnelPower: { value: 3.0 },
        fresnelBias: { value: 0.2 },
        fresnelScale: { value: 1.5 },
      },
    });

    const mesh = new Mesh(geometry, material);

    this.add(mesh);
  }
}
