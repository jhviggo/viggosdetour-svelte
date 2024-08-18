<div class="page-content">
  <div class="map-area" bind:clientWidth={mapWidth}>
    <div class="map-container" style="width: {mapWidth}px;">
      <DraggableMap on:point-click={(e) => scrollToTimeline(e)} />
    </div>
  </div>
  <div class="divider"></div>
  <div>
    <div class="space">
      <Banner image="/images/banner.webp" imageAlt="Banner showing my motorcycle">
        <div class="over-banner"></div>
      </Banner>
    </div>
  
    {#each timeline as item}
      <div class="space">
        <SideBySide image="{item.image}" content="{item.content}" itemId={item.itemId} flipped={item.id % 2 == 1}/>
      </div>
    {/each}
  </div>
</div>
  
<script lang="ts">
  import SideBySide from '$components/SideBySide.svelte';
  import { onMount } from 'svelte';
  import { getTimelines, type Timeline } from '$lib/api'
  import DraggableMap from '$components/DraggableMap.svelte';
  import Banner from '$components/Banner.svelte';

  let timeline: Timeline[] = [];
  let mapWidth: number = 0;

  onMount(async (): Promise<any> => {
    timeline = await getTimelines();
    timeline.sort((a, b) => b.id - a.id);
  });

  function scrollToTimeline(event: CustomEvent) {
    document.querySelector(`#${event.detail}`)?.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });
  }
</script>

<style>
  .page-content {
    display: grid;
    grid-template-columns: 1fr 4px 2fr;
  }

  .divider {
    background-color: var(--blue);
  }

  .over-banner {
    background: linear-gradient(0deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0.3) 40%, rgba(0,0,0,0) 100%);
    height: 100%;
    width: 100%;
  }

  .space {
    margin-bottom: 2rem;
  }

  .map-container {
    position: fixed;
  }

  @media (max-width: 768px) {
    .page-content {
      display: block;
    }

    .map-area {
      display: none;
    }
  }
</style>
