interface DevelopProgressItem {
    done: boolean,
    content: string,
}

interface DevelopProgress {
    features: Array<DevelopProgressItem>,
    optionals?: Array<DevelopProgressItem>,
    otherHtml?: string,
}

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
    weather_code: number,
    interval?: number,
}

interface Forecast {
    current: CurrentInfo|null,
    daily?: {
        temperature_2m_min: Array<number>,
        temperature_2m_max: Array<number>,
        time: Array<string>,
        weather_code: Array<number>,
    },
}