<section class="drag-container" bind:this={container}>
	<div class="draggable" on:mousedown={onMouseDown} on:wheel={onScroll} bind:this={draggable} bind:clientHeight={realMapHeight} bind:clientWidth={realMapWidth} style="left: {left}px; top: {top/2}px; height: {mapSize}dvh;" aria-hidden="true">
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
	export let realMapWidth: number = 0;
	
	let moving = false;
	let container: HTMLElement;
	let map: HTMLImageElement;
	let mapMargin: number = 0;
	let draggable: HTMLElement;
	let mapSize: number = 100;

	const mapSizeModifier: number = 10;
	const maxZoom = 150;
	const minZoom = 50;

	$: if(realMapHeight) { preventMapOffScreen(); }
	
	onMount(() => {
		mapHeight = map.naturalHeight;
	});

	function onMouseDown(e: Event) {
		if (e.target !== draggable && (e.target as HTMLElement).tagName !== 'CANVAS' && (e.target as HTMLElement).getAttribute('data-clickable') === 'true') {
			return;
		}
		moving = true;
	}

	function onScroll(e: WheelEvent) {
		e.preventDefault();

		if (e.deltaY < 0 && mapSize + mapSizeModifier < maxZoom) {
			// zoom in
			mapSize += mapSizeModifier;
		} else if (e.deltaY > 0 && mapSize - mapSizeModifier > minZoom) {
			// zoom out
			mapSize -= mapSizeModifier;
		}
	}
	
	function onMouseMove(e: MouseEvent) {
		if (!moving) return;
	
		left += e.movementX;
		top += e.movementY;
		preventMapOffScreen();
	}

	function preventMapOffScreen() {
		if (!container) return;

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
	}

	img {
		display: grid;
		pointer-events: none;
		height: 100%;
	}

	.overlay {
		position: absolute;
		top: 0;
		left: 0;
		height: 100%;
		width: 100%;
	}
</style>
