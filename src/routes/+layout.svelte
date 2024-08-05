<div class="main-layout">
  <div>
    <Header />
  </div>
  <div class="main-content">
    <slot />
  </div>

  <Footer />
</div>

<script lang="ts">
  import Header from '$components/Header.svelte';
  import Footer from '$components/Footer.svelte';

  export const prerender = true
</script>

<style>
  .main-layout {
    display: grid;
    grid-template-rows: var(--header-height) 1fr auto;
    min-height: 100%;
  }
</style>
