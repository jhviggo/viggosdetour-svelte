<svelte:head>
  {#if $cookiesStore.status === COOKIE_ACCEPTED}
    <!-- Google tag (gtag.js) -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-1JXNZFG1DP"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());

      gtag('config', 'G-1JXNZFG1DP');
    </script>
  {/if}
</svelte:head>

<div class="main-layout">
  <div>
    <Header />
  </div>
  <div class="main-content">
    <slot />
  </div>
  <Footer />
</div>

{#if $cookiesStore.status === COOKIE_UNKNOWN && hasLoadedCookies}
  <Cookie />
{/if}

<script lang="ts">
  import Header from '$components/Header.svelte';
  import Footer from '$components/Footer.svelte';
  import Cookie from '$components/Cookie.svelte';
  import { checkCookie, cookiesStore, COOKIE_ACCEPTED, COOKIE_UNKNOWN } from '$lib/cookies';
  import { onMount } from 'svelte';

  let hasLoadedCookies: boolean = false;

  onMount(() => {
    checkCookie();
    hasLoadedCookies = true;
  })
</script>

<style>
  .main-layout {
    display: grid;
    grid-template-rows: var(--header-height) 1fr auto;
    min-height: 100%;
  }
</style>
