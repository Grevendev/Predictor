export interface ZoneData {
    name: string;
    country: string;
    country_code: string;
    latitude: number;
    longitude: number;
    zone: string;
    zone_description: string;
}

export async function fetchSpotCheck(city: string) {
    const response = await fetch(`/api/v1/spot-check?location=${encodeURIComponent(city)}`);

    if (!response.ok) {
        let errorMessage = "Ett fel uppstod vid hämtning av ortsdata.";
        try {
            const errorJson = await response.json();
            if (errorJson.detail) {
                errorMessage = errorJson.detail;
            }
        } catch {
            // Om svaret inte var giltig JSON
        }

        // Kasta ett Error med backendens exakta meddelande och bifoga status
        const error = new Error(errorMessage) as Error & { status?: number };
        error.status = response.status;
        throw error;
    }

    return await response.json();
}