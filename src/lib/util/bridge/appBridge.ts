import { browser } from '$app/environment'
import type { AppBridge } from '../types/appBridge'

export const isClientReady = browser && typeof window !== 'undefined' && !!window.ReactNativeWebView

export function sendToApp(type: AppBridge) {
	if (!isClientReady) return
	try {
		window.ReactNativeWebView?.postMessage(
			JSON.stringify({
				type: type
			})
		)
	} catch (e) {
		console.error(`${e}`)
	}
}
