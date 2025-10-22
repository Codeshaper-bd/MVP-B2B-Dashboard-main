type TAddressReturnType =
  | {
      city?: string;
      state?: string;
      country?: string;
      postalCode?: string;
      formattedAddress?: string;
      latitude?: number;
      longitude?: number;
    }
  | undefined;
export function getAddressParts(
  place: google.maps.places.PlaceResult,
): TAddressReturnType {
  if (!place || !place?.geometry || !place?.geometry?.location) {
    console.warn("No geometry returned for selected place.");
    return;
  }
  const components = place.address_components ?? [];

  const get = (type: string) =>
    components.find((c) => c.types.includes(type))?.long_name || "";

  return {
    city: get("locality"),
    state: get("administrative_area_level_1"),
    country: get("country"),
    postalCode: get("postal_code"),
    formattedAddress: place.formatted_address || "",
    latitude: place.geometry.location.lat(),
    longitude: place.geometry.location.lng(),
  };
}
