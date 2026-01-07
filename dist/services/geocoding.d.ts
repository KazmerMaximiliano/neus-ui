interface LocationData {
    address: string;
    country: string;
    state: string;
    city: string;
}
export declare function reverseGeocode(lat: number, lng: number): Promise<LocationData>;
export {};
