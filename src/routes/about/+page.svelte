<div class="page">
  <img src="/images/countries-banner.webp" class="banner" alt="collage showing differnet countries I've been to">
  <div class="text">
    {@html text}
  </div>
</div>

<script lang="ts">
  import { onMount } from 'svelte';
  import { marked } from 'marked';
  import { getContentFile } from '$lib/api';

  let text: string = '';

  onMount(async () => {
    const data = await getContentFile('page-about.md');
    text = await marked.parse(data);
  });
</script>

<style>
  .banner {
    width: 100%;
  }

  .text {
    text-align: left;
  }

  :global(h1, h2, h3, h4, h5, h6) {
    color: var(--orange);
  }
</style>