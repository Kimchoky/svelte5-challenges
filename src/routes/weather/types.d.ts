interface GeoLocation {
    id?: number;
    name?: string;
    latitude?: number;
    longitude?: number;
    contry_id?: number;
    country_code?: string;
    country?: string;
    timezone?: string;
}


interface CurrentInfo {
    time: string,
    temperature_2m: number | null,
    weather_code: number | null,
    interval?: number,
}

interface Forecast {
    current: CurrentInfo|null,
    hourly: {
        temperature_2m?: Array<number>,
        time?: Array<string>,
    },
}