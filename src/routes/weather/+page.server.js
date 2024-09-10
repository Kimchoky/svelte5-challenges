export async function load({ cookies }) {
    return {
        temperatureUnit: cookies.get('app:temperatureUnit') ?? 'c',
    }
}