<script lang="ts">
  import { onMount } from "svelte";
  import { GfxContainer } from "$lib/components";
  import { Observatory } from "$lib/scenes";

  const devMode = import.meta.env.VITE_STATUS === "developing";

  onMount(() => {
    setTimeout(() => {
      const headers = window.document.querySelectorAll("h1.top-h1");

      for (const h1 of headers) {
        window.document.body.removeChild(h1);
      }
    }, 6000);
  });

  const observatory = new Observatory();
</script>

<GfxContainer scene={observatory}>
  {#if devMode}
    <div>This webiste is under construction 🏗️</div>
  {/if}
</GfxContainer>

<style>
  div {
    font-family: var(--sans-500);
    padding: 8px;
  }
</style>
