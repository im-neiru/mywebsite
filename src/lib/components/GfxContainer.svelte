<script lang="ts">
  import { onMount } from "svelte";
  import { WebGLRenderer } from "three";
  import type { Writable } from "svelte/store";
  import type { Observatory } from "$lib/scenes";

  // svelte-ignore export_let_unused
  export let scene: Writable<Observatory>;

  $: sceneW = $scene;

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
      sceneW.resize(width, height);
    }
  }

  function handleMouseMove(ev: MouseEvent) {
    if (renderer) {
      const x = Math.min(Math.max(ev.x / window.innerWidth - 0.5, -0.5), 0.5);
      const y = Math.min(Math.max(0.5 - ev.y / window.innerHeight, -0.5), 0.5);

      sceneW.mouseMove(x, y);
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
      window.addEventListener("mousemove", handleMouseMove);

      sceneW.setup(renderer, width, height);

      renderer.setAnimationLoop((time) => {
        if (renderer) {
          sceneW.update(time);
          sceneW.render(renderer, time);
        }
      });
    }

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
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
