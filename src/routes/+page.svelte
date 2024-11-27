<script>
  import { GfxContrainer } from "$lib";
  import { onMount } from "svelte";

  onMount(() => {
    setTimeout(() => {
      const headers = window.document.querySelectorAll("h1.top-h1");

      for (const h1 of headers) {
        window.document.body.removeChild(h1);
      }
    }, 6000);
  });
</script>

<GfxContrainer>
  <div class="message">This website is under renovation 🏗️</div>
</GfxContrainer>

<style>
  div.message {
    font-family: var(--sans-600);
    font-size: larger;

    color: black;
    background-color: #fffc;
    padding: 4px 8px;

    border-radius: 8px;
  }
</style>
