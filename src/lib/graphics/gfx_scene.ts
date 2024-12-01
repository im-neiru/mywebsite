// biome-ignore lint/style/useImportType: <explanation>
import { Scene, WebGLRenderer } from "three";

export interface GfxScene {
  setup(renderer: WebGLRenderer, width: number, height: number): void;
  resize(width: number, height: number): void;
  render(renderer: WebGLRenderer, time: number): void;
  update(time: number): void;
  mouseMove(x: number, y: number): void;
}
