import { GasPlanet, type GfxScene } from "$lib/graphics";
import { PerspectiveCamera, Scene, type WebGLRenderer } from "three";

export class Observatory implements GfxScene {
  private camera?: PerspectiveCamera;
  private scene: Scene;
  private planet: GasPlanet;

  constructor() {
    this.scene = new Scene();
    this.planet = new GasPlanet(0.2, 48, 24);
  }

  setup(width: number, height: number): void {
    this.camera = new PerspectiveCamera(70, width / height, 0.01, 10);
    this.camera.position.z = 1;

    this.scene.add(this.planet);
  }

  update(renderer: WebGLRenderer, time: number): void {
    if (this.camera === undefined) {
      return;
    }

    this.planet.rotation.y = time / 1000;

    renderer.render(this.scene, this.camera);
  }

  resize(width: number, height: number): void {
    this.camera = new PerspectiveCamera(70, width / height, 0.01, 10);
    this.camera.position.z = 1;
  }
}
