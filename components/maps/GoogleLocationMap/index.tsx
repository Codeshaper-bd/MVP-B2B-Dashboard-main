"use client";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { memo, useEffect, useState } from "react";

import { clientEnv } from "@/config/client-config";

import { customStyle } from "./constant";
import type { IGoogleLocationMapProps } from "./types";

interface IStyledGoogleLocationMapProps extends IGoogleLocationMapProps {}

function GoogleLocationMap({
  zoom = 18,
  lat = 23.8103,
  lng = 90.4125,
  mapStyle = customStyle,
  containerStyle = {
    width: "100%",
    height: "210px",
    borderRadius: 20,
    overflow: "hidden",
    background: "#181818",
    position: "relative",
  },
  markerIcon = "/assets/all/location-marker-logo.png",
}: IStyledGoogleLocationMapProps) {
  const [isClient, setIsClient] = useState(false); // State to track if it's client-side rendering
  const center = { lat, lng };

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: clientEnv.GOOGLE_MAP_API_KEY || "your-default-api-key",
  });

  useEffect(() => {
    setIsClient(true); // Set client-side after component mounts
  }, []);

  if (!isLoaded || !isClient) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-background text-center text-lg font-medium text-default-1000">
        Loading...
      </div>
    );
  }

  return (
    <div
      style={{
        borderRadius: 20,
        overflow: "hidden",
        background: "#181818",
        position: "relative",
        width: containerStyle.width,
        height: containerStyle.height,
        boxShadow: "0 2px 16px 0 #0006",
      }}
    >
      <GoogleMap
        mapContainerStyle={{ width: "100%", height: "100%" }}
        center={center}
        zoom={zoom}
        options={{
          styles: mapStyle,
          tilt: 0,
          disableDefaultUI: true,
          gestureHandling: "none",
          draggable: false,
          clickableIcons: false,
          keyboardShortcuts: false,
          mapTypeControl: false,
          streetViewControl: false,
          fullscreenControl: false,
          zoomControl: false,
          minZoom: zoom,
          maxZoom: zoom,
        }}
      >
        <Marker
          position={center}
          onLoad={(marker) => {
            if (typeof window !== "undefined" && window.google) {
              marker.setIcon({
                url: markerIcon,
                scaledSize: new window.google.maps.Size(56, 56), // Ensure it's only accessed on the client side
              });
            }
          }}
        />
      </GoogleMap>
    </div>
  );
}

export default memo(GoogleLocationMap);
