import { describe, expect, it, vi, beforeEach } from "vitest";
import { reverseGeocode } from "./geocoding";

const mockGeocodeResponse = {
  status: "OK",
  results: [
    {
      formatted_address: "Calle Falsa 123, Buenos Aires, Argentina",
      address_components: [
        {
          long_name: "Argentina",
          short_name: "AR",
          types: ["country"],
        },
        {
          long_name: "Buenos Aires",
          short_name: "BA",
          types: ["administrative_area_level_1"],
        },
        {
          long_name: "Ciudad Autónoma de Buenos Aires",
          short_name: "CABA",
          types: ["locality"],
        },
      ],
    },
  ],
};

describe("reverseGeocode", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("throws an error when no API key is provided", async () => {
    await expect(reverseGeocode(-34.6, -58.4)).rejects.toThrow(
      "VITE_GOOGLE_MAPS_API_KEY no está configurada",
    );
  });

  it("returns location data for valid coordinates", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockGeocodeResponse),
    } as Response);

    const result = await reverseGeocode(-34.6, -58.4, "test-api-key");

    expect(result).toEqual({
      address: "Calle Falsa 123, Buenos Aires, Argentina",
      country: "Argentina",
      state: "Buenos Aires",
      city: "Ciudad Autónoma de Buenos Aires",
    });
  });

  it("calls the Google Geocoding API with correct parameters", async () => {
    const fetchSpy = vi.spyOn(globalThis, "fetch").mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockGeocodeResponse),
    } as Response);

    await reverseGeocode(-34.6, -58.4, "my-key");

    expect(fetchSpy).toHaveBeenCalledWith(
      "https://maps.googleapis.com/maps/api/geocode/json?latlng=-34.6,-58.4&key=my-key&language=es",
    );
  });

  it("throws when fetch response is not ok", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue({
      ok: false,
      statusText: "Forbidden",
    } as Response);

    await expect(
      reverseGeocode(-34.6, -58.4, "test-api-key"),
    ).rejects.toThrow("Error en geocoding: Forbidden");
  });

  it("throws when geocoding status is not OK", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue({
      ok: true,
      json: () =>
        Promise.resolve({ status: "ZERO_RESULTS", results: [] }),
    } as Response);

    await expect(
      reverseGeocode(-34.6, -58.4, "test-api-key"),
    ).rejects.toThrow("No se encontraron resultados de geocoding");
  });

  it("throws when results array is empty", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ status: "OK", results: [] }),
    } as Response);

    await expect(
      reverseGeocode(-34.6, -58.4, "test-api-key"),
    ).rejects.toThrow("No se encontraron resultados de geocoding");
  });

  it("throws when fetch rejects", async () => {
    vi.spyOn(globalThis, "fetch").mockRejectedValue(
      new Error("Network error"),
    );

    await expect(
      reverseGeocode(-34.6, -58.4, "test-api-key"),
    ).rejects.toThrow("Network error");
  });

  it("extracts city from administrative_area_level_3 when locality is missing", async () => {
    const responseWithoutLocality = {
      status: "OK",
      results: [
        {
          formatted_address: "Zona Rural, Córdoba, Argentina",
          address_components: [
            {
              long_name: "Argentina",
              short_name: "AR",
              types: ["country"],
            },
            {
              long_name: "Córdoba",
              short_name: "CBA",
              types: ["administrative_area_level_1"],
            },
            {
              long_name: "Villa General Belgrano",
              short_name: "VGB",
              types: ["administrative_area_level_3"],
            },
          ],
        },
      ],
    };

    vi.spyOn(globalThis, "fetch").mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(responseWithoutLocality),
    } as Response);

    const result = await reverseGeocode(-31.9, -64.5, "test-api-key");

    expect(result.city).toBe("Villa General Belgrano");
  });

  it("returns empty strings for missing address components", async () => {
    const minimalResponse = {
      status: "OK",
      results: [
        {
          formatted_address: "Unknown location",
          address_components: [],
        },
      ],
    };

    vi.spyOn(globalThis, "fetch").mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(minimalResponse),
    } as Response);

    const result = await reverseGeocode(0, 0, "test-api-key");

    expect(result).toEqual({
      address: "Unknown location",
      country: "",
      state: "",
      city: "",
    });
  });

  it("uses the first administrative_area for state and ignores subsequent ones", async () => {
    const responseWithMultipleAdmin = {
      status: "OK",
      results: [
        {
          formatted_address: "Somewhere, Argentina",
          address_components: [
            {
              long_name: "Buenos Aires",
              short_name: "BA",
              types: ["administrative_area_level_1"],
            },
            {
              long_name: "La Matanza",
              short_name: "LM",
              types: ["administrative_area_level_2"],
            },
          ],
        },
      ],
    };

    vi.spyOn(globalThis, "fetch").mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(responseWithMultipleAdmin),
    } as Response);

    const result = await reverseGeocode(-34.7, -58.6, "test-api-key");

    expect(result.state).toBe("Buenos Aires");
  });
});
