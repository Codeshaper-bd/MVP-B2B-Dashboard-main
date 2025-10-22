import type { IAddOrEditVenueFormData } from "./types";

export const initialState: IAddOrEditVenueFormData = {
  name: "",
  mainImage: null,
  galleryMultipleImages: null,
  address: "",
  capacity: 0,
  city: "",
  state: "",
  postalCode: "",
  latitude: undefined,
  longitude: undefined,
  email: "",
  phone: "",
  isPrimary: undefined,
  countryCode: "",
  status: undefined,
};
