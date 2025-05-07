export const handle = async ({ event, resolve }) => {
	if (event.url.pathname.startsWith('/.well-known/')) {
		return new Response(null, { status: 204 })
	}
	return resolve(event)
}
