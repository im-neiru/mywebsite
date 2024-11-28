<script lang="ts">
  import { onMount } from "svelte";
  import { GfxContainer } from "$lib/components";
  import { Observatory } from "$lib/scenes";

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

<GfxContainer scene={observatory} />
