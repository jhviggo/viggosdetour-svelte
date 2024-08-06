  <div class="page-content">
    <div class="map-area" bind:this={mapArea}>
      <div class="map-frame" style="width: {mapFrameWidth}px;" bind:this={mapFrame}>
        <DraggableMap mapUrl="/images/map.png">
          <div class="dot" on:click={() => handleDot("t1")} style="left: {160*offset}px; top: {99*offset}px;" aria-hidden="true">
            <span class="material-symbols-outlined">
              pin_drop
            </span>
          </div>
        </DraggableMap>
      </div>
    </div>
    <div class="divider"></div>
    <div>
      <SideBySide image="/images/banner.jpg">
        <div class="over-banner" slot="hover"></div>
      </SideBySide>
    
      {#each timeline as item}
          <SideBySide image="{item.image}" content="{item.content}" itemId={item.itemId} />
      {/each}

    </div>
  </div>
  

<script lang="ts">
  import SideBySide from '$components/SideBySide.svelte';
  import { onMount, afterUpdate } from 'svelte';
  import { getTimelines, type Timeline } from '$lib/api'
  import DraggableMap from '$components/DraggableMap.svelte';

  let timeline: Timeline[] = [];
  let mapFrameWidth: number = 0;
  let mapArea: HTMLElement;
  let mapFrame: HTMLElement;

  let offset: number = 1;

  onMount(async (): Promise<any> => {
    timeline = await getTimelines();

    const resizeObserver = new ResizeObserver(_ => {
      updateMapFrameWidth();
      offset = mapFrame.clientHeight/848;
    });
    resizeObserver.observe(mapArea);
    return () => resizeObserver.unobserve(mapArea);
  });


  afterUpdate(() => {
    updateMapFrameWidth();
  });

  function updateMapFrameWidth() {
    mapFrameWidth = mapArea?.clientWidth;
  }

  function handleDot(itemId: string) {
    document.getElementById(itemId)?.scrollIntoView({ behavior: "smooth" });
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
  
  .map-frame {
    height: calc(100dvh - var(--header-height));
    position: fixed;
  }

  .over-banner {
    background: linear-gradient(0deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0.3) 40%, rgba(0,0,0,0) 100%);
    height: 100%;
    width: 100%;
  }

  .dot:hover {
    cursor: pointer;
  }

  .dot {
    position: absolute;
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
