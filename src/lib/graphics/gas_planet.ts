import { fs_gas_planet, vs_planet } from "$shaders";

import { Color, Mesh, Object3D, ShaderMaterial, SphereGeometry } from "three";

export class GasPlanet extends Object3D {
  constructor(
    radius: number,
    widthSegments: number,
    heightSegments: number,

    fresnelShade1?: Color,
    fresnelBias1?: number,
    fresnelScale1?: number,

    fresnelShade2?: Color,
    fresnelBias2?: number,
    fresnelScale2?: number,

    fresnelPower?: number
  ) {
    super();
    const geometry = new SphereGeometry(radius, widthSegments, heightSegments);

    const material = new ShaderMaterial({
      vertexShader: vs_planet,
      fragmentShader: fs_gas_planet,
      uniforms: {
        surfaceColor1: { value: new Color(0x5e4cef) },
        surfaceColor2: { value: new Color(0x9438ff) },

        // Fresnel options
        fresnelShade1: {
          value: fresnelShade1 ? fresnelShade1 : new Color(0xffffff),
        },
        fresnelBias1: { value: fresnelBias1 ? fresnelBias1 : 0.001 },
        fresnelScale1: { value: fresnelScale1 ? fresnelScale1 : 1.8 },
        fresnelShade2: {
          value: fresnelShade2 ? fresnelShade2 : new Color(0xff0000),
        },
        fresnelBias2: { value: fresnelBias2 ? fresnelBias2 : 0.1 },
        fresnelScale2: { value: fresnelScale2 ? fresnelScale2 : 1.5 },
        fresnelPower: { value: fresnelPower ? fresnelPower : 3.0 },
      },
    });

    const mesh = new Mesh(geometry, material);

    this.add(mesh);
  }
}
