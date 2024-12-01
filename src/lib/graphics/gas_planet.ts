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
  planetMaterial: ShaderMaterial;

  constructor(
    radius: number,
    widthSegments: number,
    heightSegments: number,

    fresnelShade?: Color,
    fresnelBias?: number,
    fresnelScale?: number,

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

    this.planetMaterial = new ShaderMaterial({
      vertexShader: vs_planet,
      fragmentShader: fs_gas_planet,
      uniforms: {
        phase: { value: 0.0 },
        bands: { value: 8 },
        surfaceColor1: { value: new Color(0xed8e77) },
        surfaceColor2: { value: new Color(0x8a2d2d) },

        // Fresnel options
        fresnelShade: {
          value: fresnelShade ? fresnelShade : new Color(0xccffff),
        },
        fresnelBias: { value: fresnelBias ? fresnelBias : 0.01 },
        fresnelScale: { value: fresnelScale ? fresnelScale : 0.4 },
        fresnelPower: { value: fresnelPower ? fresnelPower : 2.0 },
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

  set fresnelShade(value: Color) {
    if (value) {
      this.planetMaterial.uniforms.fresnelShade.value = value;
    }
  }

  set bands(value: number) {
    if (value) {
      this.planetMaterial.uniforms.bands.value = value;
    }
  }

  set phase(value: number) {
    if (value) {
      this.planetMaterial.uniforms.phase.value = value;
    }
  }
}
