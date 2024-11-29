import { fs_gas_planet, fs_ring, vs_planet, vs_ring } from "$shaders";

import {
  Color,
  Mesh,
  Object3D,
  RingGeometry,
  ShaderMaterial,
  SphereGeometry,
} from "three";

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
    const planetGeometry = new SphereGeometry(
      radius,
      widthSegments,
      heightSegments
    );
    const ringGeometry = new RingGeometry(0.46, 0.45, 48);

    ringGeometry.rotateX(Math.PI / 2);

    const planetMaterial = new ShaderMaterial({
      vertexShader: vs_planet,
      fragmentShader: fs_gas_planet,
      uniforms: {
        surfaceColor1: { value: new Color(0x0060a1) },
        surfaceColor2: { value: new Color(0x0026a1) },

        // Fresnel options
        fresnelShade1: {
          value: fresnelShade1 ? fresnelShade1 : new Color(0x88ffff),
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

    const ringMaterial = new ShaderMaterial({
      vertexShader: vs_ring,
      fragmentShader: fs_ring,
      uniforms: {
        ringColor: { value: new Color(0xffffff) },
      },
      transparent: true,
    });

    const planet = new Mesh(planetGeometry, planetMaterial);
    const ring = new Mesh(ringGeometry, ringMaterial);

    this.add(planet);
    // this.add(ring);
  }
}
