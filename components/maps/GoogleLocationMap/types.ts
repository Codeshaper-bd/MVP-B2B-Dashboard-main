export interface IGoogleLocationMapProps {
  lat?: number;
  lng?: number;
  zoom?: number;
  mapStyle?: google.maps.MapTypeStyle[];
  containerStyle?: React.CSSProperties;
  markerIcon?: string;
}
