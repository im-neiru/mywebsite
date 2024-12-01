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
  <div class="options">
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
    <ColorPicker
      label="Fresnel Shade"
      rgb={{
        r: 204,
        g: 255,
        b: 255,
        a: 255,
      }}
      on:input={(fresnel) => {
        if (fresnel.detail.rgb) {
          observatory.update((current) => {
            if (fresnel.detail.rgb) {
              current.fresnelShade = new Color(
                fresnel.detail.rgb.r * 0.0039063,
                fresnel.detail.rgb.g * 0.0039063,
                fresnel.detail.rgb.b * 0.0039063
              );
            }
            return current;
          });
        }
      }}
    />

    <div class="bands">
      <span>Bands: </span>
      <button
        on:click={() => {
          observatory.update((current) => {
            current.bands = 5;
            return current;
          });
        }}>5</button
      >
      <button
        on:click={() => {
          observatory.update((current) => {
            current.bands = 8;
            return current;
          });
        }}>8</button
      >
      <button
        on:click={() => {
          observatory.update((current) => {
            current.bands = 12;
            return current;
          });
        }}>12</button
      >
      <button
        on:click={() => {
          observatory.update((current) => {
            current.bands = 16;
            return current;
          });
        }}>16</button
      >
    </div>
  </div>
</GfxContainer>

<style>
  div {
    font-family: var(--sans-500);
    padding: 8px;
  }

  div.options {
    display: flex;
    flex-direction: column;

    color: black;

    background-color: white;

    border-radius: 12px;
    max-width: 230px;
  }

  div.bands {
    display: flex;
    flex-direction: row;
    column-gap: 3px;

    color: black;

    background-color: white;

    border-radius: 12px;
    max-width: 230px;
  }

  div.bands > button {
    border: none;
    outline: none;

    font-size: var(--mono-400);

    background-color: black;
    color: white;

    border-radius: 8px;
  }
</style>
