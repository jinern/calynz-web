<script lang="ts">
	import { browser } from '$app/environment'
	import { sendToApp } from '$lib/util/bridge/appBridge'
	import { AppBridge, FromApp } from '$lib/util/types/appBridge'
	import { onMount } from 'svelte'

	let isMounted = $state(false)
	let isReadyMessageSent = $state(false)
	let isAppReady = $state(false)

	onMount(() => {
		isMounted = true

		const listener = (event: MessageEvent) => {
			if (typeof event.data !== 'string') return
			try {
				const data = JSON.parse(event.data)
				if (data.type === FromApp.APP_READY) {
					isAppReady = true
				}
				if (data.type === FromApp.DEVICE_INFO) {
					console.log(JSON.stringify(data.data, null, 2))
				}
			} catch (e) {
				console.warn('메시지 파싱 실패', e)
			}
		}

		if (browser && typeof window !== 'undefined') {
			window.addEventListener('message', listener)
		}

		sendToApp(AppBridge.WEB_READY)
		isReadyMessageSent = true

		return () => {
			window.removeEventListener('message', listener)
		}
	})

	let userAgent = $derived(navigator.userAgent)
</script>

<div class="container">
	<div class="progress">
		<p>{isMounted ? '✅ mounted' : '❌ not mounted'}</p>
		<p>
			{isReadyMessageSent ? '✅ ready message sent' : '❌ ready message not sent'}
		</p>
		<p>{isAppReady ? '✅ app ready' : '❌ app not ready'}</p>
	</div>
	<p class="user-agent">{userAgent}</p>
	{#if isMounted && isReadyMessageSent && isAppReady}
		<button class="button" onclick={() => sendToApp(AppBridge.TEST_MESSAGE)}>
			테스트 메시지 전송
		</button>
		<button class="button" onclick={() => sendToApp(AppBridge.DEVICE_INFO)}>DEVICE_INFO</button>
		<button class="button" onclick={() => sendToApp(AppBridge.IMPACT_LIGHT)}>IMPACT_LIGHT</button>
		<button class="button" onclick={() => sendToApp(AppBridge.IMPACT_MEDIUM)}>IMPACT_MEDIUM</button>
		<button class="button" onclick={() => sendToApp(AppBridge.IMPACT_HEAVY)}>IMPACT_HEAVY</button>
		<button class="button" onclick={() => sendToApp(AppBridge.RIGID)}>RIGID</button>
		<button class="button" onclick={() => sendToApp(AppBridge.SOFT)}>SOFT</button>
		<button class="button" onclick={() => sendToApp(AppBridge.NOTIFICATION_SUCCESS)}>
			NOTIFICATION_SUCCESS
		</button>
		<button class="button" onclick={() => sendToApp(AppBridge.NOTIFICATION_WARNING)}>
			NOTIFICATION_WARNING
		</button>
		<button class="button" onclick={() => sendToApp(AppBridge.NOTIFICATION_ERROR)}>
			NOTIFICATION_ERROR
		</button>
		<button class="button" onclick={() => sendToApp(AppBridge.SELECTION)}>SELECTION</button>
	{/if}
</div>

<style lang="scss">
	.container {
		padding: 20px;
		gap: 12px;
		display: flex;
		flex-direction: column;
	}

	.progress {
		display: flex;
		gap: 16px;
		font-size: 13px;
	}

	.button {
		width: fit-content;
		padding: 8px 16px;
		border-radius: 8px;
		background: darkcyan;
		color: white;
		font-size: 14px;
		font-weight: 600;
	}

	.user-agent {
		font-size: 9px;
		color: #666;
	}
</style>
