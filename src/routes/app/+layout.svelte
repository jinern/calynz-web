<script lang="ts">
	let { children } = $props()
</script>

<main class="main">
	{@render children()}
</main>

<style lang="scss">
	.main {
		touch-action: pan-x pan-y;
	}
</style>
