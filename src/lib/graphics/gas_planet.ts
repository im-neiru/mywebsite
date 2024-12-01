import { fs_gas_planet, fs_ring, vs_planet, vs_ring } from "$shaders";

import {
  Color,
  Mesh,
  Object3D,
  RingGeometry,
  ShaderMaterial,
  SphereGeometry,
  Vector3,
} from "three";

export class GasPlanet extends Object3D {
  private uniforms: {
    bands: { value: number };
    surfaceColor1: { value: Color };
    surfaceColor2: { value: Color };
    // Fresnel options
    fresnelShade1: { value: Color };
    fresnelBias1: { value: number };
    fresnelScale1: { value: number };
    fresnelShade2: { value: Color };
    fresnelBias2: { value: number };
    fresnelScale2: { value: number };
    fresnelPower: { value: number };
    lightDirection: { value: Vector3 };
  };
  planetMaterial: ShaderMaterial;

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
    // const ringGeometry = new RingGeometry(0.38, 0.37, 48);
    const lightDirection = new Vector3(-0.4, 0.0, 0.2).normalize();

    // ringGeometry.rotateX(Math.PI / 2);

    this.uniforms = {
      bands: { value: 8 },
      surfaceColor1: { value: new Color(0xed8e77) },
      surfaceColor2: { value: new Color(0x8a2d2d) },

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
      lightDirection: { value: lightDirection },
    };

    this.planetMaterial = new ShaderMaterial({
      vertexShader: vs_planet,
      fragmentShader: fs_gas_planet,
      uniforms: {
        bands: { value: 8 },
        surfaceColor1: { value: new Color(0xed8e77) },
        surfaceColor2: { value: new Color(0x8a2d2d) },

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
        lightDirection: { value: lightDirection },
      },
    });

    // const ringMaterial = new ShaderMaterial({
    //   vertexShader: vs_ring,
    //   fragmentShader: fs_ring,
    //   uniforms: {
    //     ringColor: { value: new Color(0xffffff) },
    //     planetPosition: { value: new Vector3(0, 0, 0) },
    //     planetRadius: { value: radius },
    //     lightDirection: { value: lightDirection },
    //   },
    // });

    const planet = new Mesh(planetGeometry, this.planetMaterial);
    // const ring = new Mesh(ringGeometry, ringMaterial);

    this.add(planet);
    // this.add(ring);
  }

  set surfaceColor1(value: Color) {
    this.planetMaterial.uniforms.surfaceColor1.value = value;
  }

  set surfaceColor2(value: Color) {
    this.planetMaterial.uniforms.surfaceColor2.value = value;
  }
}
