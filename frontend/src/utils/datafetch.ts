export interface ZoneData {
    name: string;
    country: string;
    country_code: string;
    latitude: number;
    longitude: number;
    zone: string;
    zone_description: string;
}

export async function fetchSpotCheck(location: string): Promise<ZoneData> {
    const response = await fetch(`/api/v1/zone?location=${encodeURIComponent(location)}`);

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.detail || `Kunde inte hämta zon (Status ${response.status})`);
    }

    return await response.json();
}