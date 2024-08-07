<div class="page-content">
  <div class="map-area" bind:this={mapArea}>
    <div class="map-frame" style="width: {mapFrameWidth}px;" bind:this={mapFrame}>
      <div class="marker-switch">
        <span style="margin-bottom: 0.5rem;">Toggle markers</span>
        <Toggler bind:showMarkers={showMarkers} />
      </div>
      <DraggableMap mapUrl="/images/map2.webp" bind:mapHeight={mapHeight} bind:realMapHeight={realMapHeight} bind:realMapWidth={realMapWidth}>
        <canvas class="mapCanvas" bind:this={mapCanvas} width={realMapWidth} height={realMapHeight} style="display: {showMarkers ? 'unset': 'none'};"></canvas>
        {#each visibleMarkers as marker}
        <div
          class="marker"
          data-clickable={marker.clickable}
          style="left: calc({marker.left * offset}px - 0.5rem); top: calc({marker.top * offset}px - 0.5rem); cursor: {marker.clickable ? 'pointer' : 'unset'}; display: {showMarkers ? 'unset' : 'none'};"
          on:click={() => handleMarker(marker.itemId || '')}
          aria-hidden="true">
        </div>
        {/each}
      </DraggableMap>
      
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
  import { onMount, afterUpdate } from 'svelte';
  import { getTimelines, type Timeline } from '$lib/api'
  import DraggableMap from '$components/DraggableMap.svelte';
  import { markers, type Marker } from '$lib/markers';
  import Toggler from '$components/Toggler.svelte';
  import Banner from '$components/Banner.svelte';

  let timeline: Timeline[] = [];
  let mapFrameWidth: number = 0;
  let mapArea: HTMLElement;
  let mapFrame: HTMLElement;
  let mapHeight: number;
  let realMapHeight: number
  let realMapWidth: number;
  let showMarkers: boolean = true;
  let visibleMarkers: Marker[] = [];
  let mapCanvas: HTMLCanvasElement;

  let offset: number = 1;

  onMount(async (): Promise<any> => {
    timeline = await getTimelines();
    timeline.sort((a, b) => b.id - a.id);
    
    const resizeObserver = new ResizeObserver(_ => {
      updateMapFrameWidth();
      offset = (realMapHeight || 1)/mapHeight;
      visibleMarkers = [...markers.sort((a, b) => a.id - b.id)];
      console.log(visibleMarkers);
      drawCanvasLines();
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

  function handleMarker(itemId: string) {
    const scrollHeight = document.getElementById(itemId)?.scrollHeight;
    if (scrollHeight) {
      window.scrollTo(0, scrollHeight);
    }
  }

  function drawCanvasLines() {
    const ctx = mapCanvas?.getContext('2d')!;
    if (!ctx) return;

    ctx.clearRect(0, 0, mapCanvas.width, mapCanvas.height);

    console.log(ctx);
    const lineSegmentLength = mapCanvas.width/400;

    ctx.moveTo(0, 0);
    for (let i = 0; i < markers.length-1; i++) {
      ctx.beginPath();
      ctx.lineWidth = 4;
      ctx.strokeStyle = '#ff8225';
      ctx.lineCap = 'round';
      ctx.setLineDash([lineSegmentLength, lineSegmentLength * 1.3]);
      ctx.moveTo(markers[i].left * offset, markers[i].top * offset);
      ctx.lineTo(markers[i+1].left * offset, markers[i+1].top * offset);
      ctx.stroke();
    }
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

  .mapCanvas {
    height: 100%;
    width: 100%;
    opacity: 0.75;
  }

  .marker {
    position: absolute;
    background-color: var(--orange);
    border-radius: 50%;
    height: 1rem;
    width: 1rem;
  }

  .marker:hover[data-clickable="true"] {
    background-color: var(--blue);
  }

  .space {
    margin-bottom: 2rem;
  }

  @media (max-width: 768px) {
    .page-content {
      display: block;
    }

    .map-area {
      display: none;
    }
  }

  .marker-switch {
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: var(--blue);
    position: absolute;
    padding: 0.5rem;
    top: 0;
    right: 5px;
    z-index: 2;
    border-radius: 0 0 1rem 1rem;
    box-shadow: rgba(0, 0, 0, 0.2) 0px 10px 13px -3px inset;
  }

  .marker-switch:hover {
    margin-top: 0;
  }

  .marker-switch span {
    color: white;
  }
</style>
