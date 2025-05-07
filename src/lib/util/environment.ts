import { page } from '$app/state'

export function isApp(): boolean {
	const pathname = page.url.pathname
	const isApp = pathname.startsWith('/app')
	return isApp
}
