import { GasPlanet, type GfxScene } from "$lib/graphics";
import {
  type Color,
  PerspectiveCamera,
  Scene,
  Vector2,
  Vector3,
  type WebGLRenderer,
} from "three";

import {
  EffectComposer,
  RenderPass,
  UnrealBloomPass,
} from "three/examples/jsm/Addons.js";

export class Observatory implements GfxScene {
  private scene: Scene;
  private planet: GasPlanet;
  private camera?: PerspectiveCamera;
  private bloomPass?: UnrealBloomPass;
  private renderPass?: RenderPass;
  private effectComposer?: EffectComposer;

  constructor() {
    this.scene = new Scene();
    this.planet = new GasPlanet(0.3, 48, 32);
  }

  setup(renderer: WebGLRenderer, width: number, height: number): void {
    this.camera = new PerspectiveCamera(70, width / height, 0.01, 10);

    this.camera.position.z = 0.6;
    this.camera.position.y = 0.5;
    this.camera.up = new Vector3(1, 1, 0);
    this.camera.lookAt(new Vector3(0, 0, 0));

    this.scene.add(this.planet);

    this.bloomPass = new UnrealBloomPass(
      new Vector2(width * 2, height * 2),
      0.4,
      0.4,
      0.1
    );

    this.renderPass = new RenderPass(this.scene, this.camera);
    this.effectComposer = new EffectComposer(renderer);
    this.effectComposer.setSize(width * 4, height * 4);

    this.effectComposer.addPass(this.renderPass);
    this.effectComposer.addPass(this.bloomPass);
  }

  update(time: number): void {
    if (this.camera === undefined) {
      return;
    }

    if (this.planet) {
      this.planet.rotation.y = time / 8000;
      this.planet.phase = time / 6000;
    }
  }

  render(_: WebGLRenderer, time: number): void {
    this.effectComposer?.render(time);
  }

  resize(width: number, height: number): void {
    this.camera = new PerspectiveCamera(70, width / height, 0.01, 10);
    this.effectComposer?.setSize(width * 2, height * 2);
    this.bloomPass?.setSize(width * 2, height * 2);

    this.camera.position.z = 0.6;
    this.camera.position.y = 0.5;
    this.camera.lookAt(new Vector3(0, 0, 0));
  }

  mouseMove(x: number, y: number): void {
    if (this.camera) {
      this.camera.position.z = Math.cos(x * 1.047198);
      this.camera.position.y = Math.sin(y * 1.047198);
      this.camera.lookAt(new Vector3(0, 0, 0));
    }
  }

  set surfaceColor1(value: Color) {
    this.planet.surfaceColor1 = value;
  }

  set surfaceColor2(value: Color) {
    this.planet.surfaceColor2 = value;
  }
}
