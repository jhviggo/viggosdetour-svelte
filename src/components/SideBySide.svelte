<div class="side-by-side {!image || !content ? 'single-grid' : 'double-grid'}">
  {#if image && !flipped}
    <div class="picture">
      <img src={image} alt="">
      <div class="image-hover">
        <slot name="hover" />
      </div>
    </div>
  {/if}
  {#if content}
    <div class="content">
      {#if content}
        {@html parsedContent}
      {:else}
        <slot />
      {/if}
    </div>
  {/if}
  {#if image && flipped}
    <div class="picture">
      <img src={image} alt="">
      <div class="image-hover">
        <slot name="hover" />
      </div>
    </div>
  {/if}
</div>

<script lang="ts">
  import { getContentFile } from '$lib/api';
  import { marked } from 'marked';
  import { onMount } from 'svelte';

  export let image: string = '';
  export let content: string = '';
  export let flipped: boolean = false;

  let parsedContent: string;

  onMount(async () => {
    if (content !== '') {
      const data = await getContentFile(content);
      parsedContent = await marked.parse(data);
    }
  });
</script>

<style>
  .side-by-side {
    display: grid;
    background-color: white;
  }
  
  .single-grid { grid-template-columns: 1fr; }
  .double-grid { grid-template-columns: repeat(2, 1fr); }
  
  @media (max-width: 768px) {
    .double-grid {
      grid-template-rows: repeat(2, auto);
      grid-template-columns: 1fr;
    }
  }
  
  img {
    width: 100%;
  }
  
  .picture {
    background-color: var(--blue);
    position: relative;
    display: grid;
    align-items: center;
  }
  
  .image-hover {
    position: absolute;
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;
    overflow: hidden;
  }
  
  .content {
    background-color: white;
    padding: 0.5rem;
    overflow-y: auto;
  }
</style>
