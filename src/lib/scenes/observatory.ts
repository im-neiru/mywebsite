import type { GfxScene } from "$lib/graphics";
import {
  BoxGeometry,
  Mesh,
  MeshNormalMaterial,
  PerspectiveCamera,
  Scene,
  type WebGLRenderer,
  type Object3DEventMap,
} from "three";

export class Observatory implements GfxScene {
  private camera?: PerspectiveCamera;
  private scene?: Scene;
  private geometry?: BoxGeometry;
  private material?: MeshNormalMaterial;
  private mesh?: Mesh<BoxGeometry, MeshNormalMaterial, Object3DEventMap>;

  setup(width: number, height: number): void {
    this.camera = new PerspectiveCamera(70, width / height, 0.01, 10);
    this.camera.position.z = 1;

    this.scene = new Scene();

    this.geometry = new BoxGeometry(0.2, 0.2, 0.2);
    this.material = new MeshNormalMaterial();

    this.mesh = new Mesh(this.geometry, this.material);
    this.scene.add(this.mesh);
  }

  update(renderer: WebGLRenderer, time: number): void {
    if (
      this.scene === undefined ||
      this.camera === undefined ||
      this.mesh === undefined
    ) {
      return;
    }

    this.mesh.rotation.x = time / 2000;
    this.mesh.rotation.y = time / 1000;

    renderer.render(this.scene, this.camera);
  }

  resize(width: number, height: number): void {
    this.camera = new PerspectiveCamera(70, width / height, 0.01, 10);
    this.camera.position.z = 1;
  }
}
