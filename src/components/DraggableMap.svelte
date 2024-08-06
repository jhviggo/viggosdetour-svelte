<section class="drag-container" bind:this={container}>
	<div on:mousedown={onMouseDown} bind:this={draggable} bind:clientHeight={realMapHeight} style="left: {left}px; top: {top}px;" class="draggable" aria-hidden="true">
		<img src={mapUrl} alt="Map Url" bind:this={map}>
		<div class="overlay">
			<slot />
		</div>
	</div>
</section>

<svelte:window on:mouseup={onMouseUp} on:mousemove={onMouseMove} />

<script lang="ts">
	import { onMount } from 'svelte';

	export let left = 0;
	export let top = 0;
	export let mapUrl: string = '';
	export let mapHeight: number = 0;
	export let realMapHeight: number = 0;
	
	let moving = false;
	let container: HTMLElement;
	let map: HTMLImageElement;
	let mapMargin: number = 0;
	let draggable: HTMLElement;
	
	onMount(() => {
		mapHeight = map.naturalHeight;
	});

	function onMouseDown(e: Event) {
		if (e.target !== draggable) {
			return;
		}
		moving = true;
	}
	
	function onMouseMove(e: MouseEvent) {
		if (moving) {
			left += e.movementX;
			top += e.movementY;
		}

		if (left > 0 + mapMargin) {
			left = 0 + mapMargin;
		}
		if (top > 0 + mapMargin) {
			top = 0 + mapMargin;
		}
		if (left < -map.clientWidth - mapMargin + container.clientWidth) {
			left = -map.clientWidth - mapMargin + container.clientWidth;
		}
		if (top < -map.clientHeight - mapMargin + container.clientHeight) {
			top = -map.clientHeight - mapMargin + container.clientHeight;
		}
	}
	
	function onMouseUp() {
		moving = false;
	}
</script>

<style>
	.drag-container {
		position: relative;
		background-color: var(--blue);
		overflow: hidden;
		height: 100%;
		width: 100%;
	}

	.draggable {
		user-select: none;
		cursor: move;
		border: solid 1px gray;
		position: absolute;
		height: 100dvh;
	}

	img {
		display: grid;
		pointer-events: none;
		height: 100dvh;
	}

	.overlay {
		position: absolute;
		top: 0;
		left: 0;
	}
</style>
