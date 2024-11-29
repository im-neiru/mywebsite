<script lang="ts">
  import { onMount } from "svelte";

  import type { GfxScene } from "$lib/graphics";
  import { WebGLRenderer } from "three";

  // svelte-ignore export_let_unused
  export let scene: GfxScene;

  // biome-ignore lint/style/useConst: svelte binding
  let canvasEl: HTMLCanvasElement | null = null;
  let renderer: WebGLRenderer | undefined = undefined;

  function handleResize() {
    if (renderer === undefined) return;

    if (canvasEl) {
      const width = window.innerWidth;
      const height = window.innerHeight;

      canvasEl.width = width;
      canvasEl.height = height;

      renderer.setSize(width, height);
      scene.resize(width, height);
    }
  }

  onMount(() => {
    if (canvasEl) {
      const width = canvasEl.clientWidth;
      const height = canvasEl.clientHeight;

      renderer = new WebGLRenderer({
        antialias: true,
        canvas: canvasEl,
      });

      renderer.setSize(width, height);

      window.addEventListener("resize", handleResize);

      scene.setup(renderer, width, height);

      renderer.setAnimationLoop((time) => {
        if (renderer) {
          scene.update(time);
          scene.render(renderer, time);
        }
      });
    }

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  });
</script>

<canvas
  bind:this={canvasEl}
  on:contextmenu={(ev) => {
    ev.preventDefault();
    ev.stopPropagation();
    return false;
  }}
></canvas>
<div class="overlay">
  <slot></slot>
</div>

<style>
  canvas {
    position: fixed;

    left: 0px;
    top: 0px;
    right: 0px;
    bottom: 0px;

    width: 100vw;
    height: 100vh;
  }

  div.overlay {
    z-index: 1;
    position: absolute;

    left: 0px;
    top: 0px;
    right: 0px;
    bottom: 0px;

    width: 100%;
    height: 100%;
  }
</style>
