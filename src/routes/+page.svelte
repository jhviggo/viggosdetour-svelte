<TimelineBox header="Timeline">
  <SideBySide image="/images/banner.jpg">
    <div class="over-banner" slot="hover"></div>
  </SideBySide>
</TimelineBox>

{#each timeline as item}
  <TimelineBox city="{item.city}" location="{item.location}" spaced>
    <SideBySide image="{item.image}" content="{item.content}" />
  </TimelineBox>
{/each}

<script lang="ts">
  import TimelineBox from '$components/TimelineBox.svelte';
  import SideBySide from '$components/SideBySide.svelte';
  import { onMount } from 'svelte';
  import { getTimelines, type Timeline } from '$lib/api'

  let timeline: Timeline[] = [];

  onMount(async () => {
    timeline = await getTimelines();
  });
</script>

<style>
  .over-banner {
    background: linear-gradient(0deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0.3) 40%, rgba(0,0,0,0) 100%);
    height: 100%;
    width: 100%;
  }
</style>
