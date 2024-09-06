/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {

    const picoTheme = event.cookies.get('pico:theme') || 'dark';

    // HTML replacing
	const response = await resolve(event, {
        transformPageChunk: ({ html, done }) => {
            if (done) {
                return html.replace('%pico:theme%', picoTheme);
            }
        }
    });

    // Custom Headers
    response.headers.set('x-author', 'kimchoky');

    
	return response;
}