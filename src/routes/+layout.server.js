export async function load({ cookies }) {

    const picoTheme = cookies.get('pico:theme') || 'dark';

    /** @type { {[key: string]: *} } */
    return {
        picoTheme
    }

}