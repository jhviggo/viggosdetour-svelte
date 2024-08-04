<div class="page">
  <img src="/images/bike-banner.png" alt="Collage of my motorcycle">
  <h1 class="orange">Meet the <span class="blue">bike</span>, the <span class="blue">bag</span> and the <span class="blue">plan</span></h1>
  Let's take a quick look at the bike, what I'm bringing and the intended route

  <div class="sections">
    <SideBySide image="/images/bike-image.png" content="page-bike-bike.md" />
    <SideBySide image="/images/bike-bag.png" content="page-bike-bag.md" flipped />
    <SideBySide image="/images/map.png" content="page-bike-map.md" />
  </div>
</div>

<script lang="ts">
  import SideBySide from '$components/SideBySide.svelte';
</script>

<style>
  :global(h2) {
    color: var(--blue);
  }

  .sections {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    margin-bottom: 3rem;
  }
</style>
