<script lang="ts">
	import { isApp } from '$lib/util/environment'
	import { page } from '$app/state'
	import { dev } from '$app/environment'

	import '$lib/styles/reset.scss'

	let { children, data } = $props()
</script>

{#if dev}
	<div class="dev">
		<p>{page.url.href} | {data.version}</p>
	</div>
{/if}
{#if isApp()}
	{@render children()}
{:else}
	<div class="web">
		{@render children()}
	</div>
{/if}

<style lang="scss">
	.dev {
		position: fixed;
		top: 0;
		right: 0;
		background-color: darkcyan;
		color: white;
		width: fit-content;
		font-size: 8px;
		padding: 2px 4px;
	}
</style>
