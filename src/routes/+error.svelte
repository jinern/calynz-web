<script lang="ts">
	import { page } from '$app/state'
</script>

<div class="page">
	<p>{page.status}</p>
	<p>{page.error?.message}</p>
	<br />
	<p>{JSON.stringify(page, null, 2)}</p>
</div>

<style lang="scss">
	.page {
		padding: 20px;
	}
</style>
