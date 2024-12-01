<script lang="ts">
  import { onMount } from "svelte";
  import { GfxContainer } from "$lib/components";
  import { Observatory } from "$lib/scenes";
  import ColorPicker, { type RgbaColor } from "svelte-awesome-color-picker";
  import { Color } from "three";
  import { writable } from "svelte/store";

  const observatory = writable(new Observatory());
  const devMode = import.meta.env.VITE_STATUS === "developing";

  onMount(() => {
    setTimeout(() => {
      const headers = window.document.querySelectorAll("h1.top-h1");

      for (const h1 of headers) {
        window.document.body.removeChild(h1);
      }
    }, 6000);
  });
</script>

<GfxContainer scene={observatory}>
  {#if devMode}
    <div>This site is under construction 🏗️</div>
  {/if}

  <div class="colors">
    This website is currently under development.

    <ColorPicker
      label="Surface Color1"
      hex="0#ed8e77"
      rgb={{
        r: 237,
        g: 142,
        b: 119,
        a: 255,
      }}
      isAlpha={false}
      on:input={(color1) => {
        if (color1.detail.rgb) {
          observatory.update((current) => {
            if (color1.detail.rgb) {
              current.surfaceColor1 = new Color(
                color1.detail.rgb.r * 0.0039063,
                color1.detail.rgb.g * 0.0039063,
                color1.detail.rgb.b * 0.0039063
              );
            }
            return current;
          });
        }
      }}
    />
    <ColorPicker
      label="Surface Color2"
      rgb={{
        r: 138,
        g: 45,
        b: 45,
        a: 255,
      }}
      on:input={(color2) => {
        if (color2.detail.rgb) {
          observatory.update((current) => {
            if (color2.detail.rgb) {
              current.surfaceColor2 = new Color(
                color2.detail.rgb.r * 0.0039063,
                color2.detail.rgb.g * 0.0039063,
                color2.detail.rgb.b * 0.0039063
              );
            }
            return current;
          });
        }
      }}
    />
  </div>
</GfxContainer>

<style>
  div {
    font-family: var(--sans-500);
    padding: 8px;
  }

  div.colors {
    display: flex;
    flex-direction: column;

    color: black;

    background-color: white;

    border-radius: 12px;
    max-width: 230px;
  }
</style>
