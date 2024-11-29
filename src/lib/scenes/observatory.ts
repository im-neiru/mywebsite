import { GasPlanet, type GfxScene } from "$lib/graphics";
import {
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
    this.planet = new GasPlanet(0.2, 48, 24);
  }

  setup(renderer: WebGLRenderer, width: number, height: number): void {
    this.camera = new PerspectiveCamera(70, width / height, 0.01, 10);

    this.camera.position.z = 0.6;
    this.camera.position.y = 0.4;
    this.camera.lookAt(new Vector3(0, 0, 0));

    this.scene.add(this.planet);

    this.bloomPass = new UnrealBloomPass(
      new Vector2(width * 2, height * 2),
      1.3,
      0.4,
      0.1
    );

    this.renderPass = new RenderPass(this.scene, this.camera);
    this.effectComposer = new EffectComposer(renderer);

    this.effectComposer.addPass(this.renderPass);
    this.effectComposer.addPass(this.bloomPass);
  }

  update(time: number): void {
    if (this.camera === undefined) {
      return;
    }

    this.planet.rotation.y = time / 3000;
  }

  render(_: WebGLRenderer, time: number): void {
    this.effectComposer?.render(time);
  }

  resize(width: number, height: number): void {
    this.camera = new PerspectiveCamera(70, width / height, 0.01, 10);

    this.camera.position.z = 0.6;
    this.camera.position.y = 0.4;
    this.camera.lookAt(new Vector3(0, 0, 0));
  }
}
