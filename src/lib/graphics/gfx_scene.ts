// biome-ignore lint/style/useImportType: <explanation>
import { WebGLRenderer } from "three";

export interface GfxScene {
  setup(width: number, height: number): void;
  resize(width: number, height: number): void;
  update(renderer: WebGLRenderer, time: number): void;
}
