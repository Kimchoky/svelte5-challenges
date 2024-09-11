export async function load({ cookies }) {
    return {
        temperatureUnit: cookies.get('app:temperatureUnit') ?? 'c',
        geoLocation: JSON.parse(cookies.get('app:geoLocation') ?? 'null'),
    }
}