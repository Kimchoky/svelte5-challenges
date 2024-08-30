export async function load({ cookies }) {

    const picoTheme = cookies.get('pico:theme') || 'dark';

    return {
        picoTheme
    }

}