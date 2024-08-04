<div class="main-layout">
  <Header />
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
    grid-template-rows: auto 1fr auto;
    min-height: 100%;
  }
</style>
