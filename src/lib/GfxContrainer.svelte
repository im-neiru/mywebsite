<script lang="ts">
  import * as THREE from "three";
  import { onMount } from "svelte";

  let canvasEl: HTMLCanvasElement | null = null;

  onMount(() => {
    if (canvasEl) {
      const width = canvasEl.clientWidth;
      const height = canvasEl.clientHeight;

      const camera = new THREE.PerspectiveCamera(70, width / height, 0.01, 10);
      camera.position.z = 1;

      const scene = new THREE.Scene();

      const geometry = new THREE.BoxGeometry(0.2, 0.2, 0.2);
      const material = new THREE.MeshNormalMaterial();

      const mesh = new THREE.Mesh(geometry, material);
      scene.add(mesh);

      let renderer = new THREE.WebGLRenderer({
        antialias: true,
        canvas: canvasEl,
      });

      renderer.setSize(width, height);

      renderer.setAnimationLoop((time) => {
        mesh.rotation.x = time / 2000;
        mesh.rotation.y = time / 1000;

        renderer.render(scene, camera);
      });
    }
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
    position: absolute;

    left: 0px;
    top: 0px;
    right: 0px;
    bottom: 0px;

    width: 100%;
    height: 100%;
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

    display: flexbox;

    flex-direction: column;

    align-content: center;
    justify-items: center;
  }
</style>
